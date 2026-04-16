---
id: tamable-dragon
title: TamableDragon
sidebar_label: TamableDragon
---

# TamableDragon

**Файл:** `src/main/java/com/spa/dragons/entity/TamableDragon.java`
**Наследует:** `Animal` + `GeoEntity`

Прирученный дракон. Вылупляется из `DragonEggEntity` через **100 тиков (5 сек)**. Имеет систему роста (5 стадий за 125 игровых дней), полётную механику и езду верхом.

---

## SynchedEntityData

| Ключ | Тип | Начальное значение | Назначение |
|------|-----|--------------------|-----------|
| `TAMED` | Boolean | false | Приручён ли |
| `OWNER_UUID_STR` | String | `""` | UUID хозяина (строка) |
| `DRAGON_TYPE` | String | `"fire"` | Тип дракона |
| `SITTING` | Boolean | false | Команда «сидеть» |
| `AGE_TICKS` | Integer | 0 | Возраст в тиках (синхронизируется для масштаба) |
| `FLIGHT_STATE` | Integer | 0 (GROUND) | Состояние полёта |

---

## Базовые атрибуты (при рождении)

```java
public static AttributeSupplier.Builder createAttributes() {
    return Animal.createAnimalAttributes()
        .add(Attributes.MAX_HEALTH,    20.0)   // растёт до 200
        .add(Attributes.MOVEMENT_SPEED, 0.2)   // растёт до 0.35
        .add(Attributes.ATTACK_DAMAGE,  4.0)   // растёт до 20
        .add(Attributes.FOLLOW_RANGE,  32.0);
}
```

Атрибуты линейно масштабируются с возрастом — см. раздел «Система роста».

---

## Система роста (IAF-style)

### Константы

```java
public  static final int   TICKS_PER_DAY = 24_000; // тиков/день
private static final int   STAGE_DAYS    = 25;      // дней на стадию
private static final float SCALE_FACTOR  = 0.35f;
private static final float MAX_SCALE     = 7.0f;
private static final double MAX_AGE_DAYS = 125.0;   // 5 стадий × 25 дней
```

### Стадии роста

| Стадия | Дни | renderSize мин. | renderSize макс. |
|--------|-----|-----------------|------------------|
| 1 | 0–24 | 1.0 | 3.0 |
| 2 | 25–49 | 3.0 | 7.0 |
| 3 | 50–74 | 7.0 | 12.5 |
| 4 | 75–99 | 12.5 | 20.0 |
| 5 | 100–124+ | 20.0 | **30.0** (максимум) |

`entityScale = min(renderSize × 0.35, 7.0)`

### Масштабирование атрибутов

```java
// t = ageInDays / 125, клампируется до [0, 1]
health = 20.0  + 180.0 * t   // 20   → 200
attack = 4.0   +  16.0 * t   //  4   →  20
speed  = 0.2   +   0.15 * t  //  0.2 → 0.35
```

### Кормление хозяином

Правый клик с мясом у прирученного дракона:
- Лечит **10% от maxHealth** (минимум 1 HP)
- Вызывает `growDragon(1)` — добавляет 1 день роста, обновляет атрибуты и хитбокс

---

## Система полёта

### Состояния (FLIGHT_STATE)

| Константа | Значение | Описание |
|-----------|---------|----------|
| `STATE_GROUND` | 0 | На земле |
| `STATE_TAKEOFF` | 1 | Разгон взлёта (16 тиков = 0.8 с) |
| `STATE_FLYING` | 2 | Активный полёт |
| `STATE_LANDING` | 3 | Посадка (12 тиков = 0.6 с) |

### Переходы состояний

```
GROUND ──[прыжок игрока]──► TAKEOFF ──[16 тиков, оторвался от земли]──► FLYING
                                    └──[не взлетел]──► GROUND

FLYING ──[коснулся земли > 10т]──► LANDING ──[земля + 10т | 12 тиков]──► GROUND
FLYING ──[игрок слез]──► (gravity возобновляется)
```

### Управление во время полёта

| Действие игрока | Эффект |
|-----------------|--------|
| Взгляд вверх | Набор высоты |
| Взгляд вниз | Снижение |
| Пробел | Минимальный подъём `vY ≥ 0.3` |
| Ctrl (sprint) | Максимальное снижение `vY ≤ −0.3` |

**Скорость:** `baseSpped × 2.5` в полёте, `× 1.5` на земле.

Логика передвижения в `travel()` полностью заменяет стандартную при `STATE_FLYING`.

---

## Приручение (mobInteract)

Допустимое мясо (10 видов):

```java
BEEF | COOKED_BEEF | PORKCHOP | COOKED_PORKCHOP |
MUTTON | COOKED_MUTTON | CHICKEN | COOKED_CHICKEN |
RABBIT | COOKED_RABBIT
```

- Шанс приручения: **25%** за каждый предмет
- `broadcastEntityEvent(7)` — частицы сердец (успех)
- `broadcastEntityEvent(6)` — частицы дыма (провал)

---

## AI Goals

```java
goalSelector.addGoal(1, new FloatGoal(this));
goalSelector.addGoal(2, new DragonSitGoal(this));       // внутренний класс
goalSelector.addGoal(4, new DragonFollowOwnerGoal(this, 1.1, 5.0f, 20.0f));
goalSelector.addGoal(5, new WaterAvoidingRandomStrollGoal(this, 1.0));
goalSelector.addGoal(6, new LookAtPlayerGoal(this, Player.class, 8.0f));
goalSelector.addGoal(7, new RandomLookAroundGoal(this));
```

`DragonSitGoal` блокирует флаги `JUMP` и `MOVE` когда `isOrderedToSit() == true`.

---

## Езда верхом

| Метод | Поведение |
|-------|----------|
| `getControllingPassenger()` | Возвращает первого пассажира-игрока |
| `getRiddenInput()` | На земле: strafe × 0.5, forward. В полёте: ZERO |
| `tickRidden()` | Синхронизирует вращение, запускает STATE_TAKEOFF при прыжке |
| `getPassengerAttachmentPoint()` | Посадка на 85% высоты хитбокса |
| `canSimulateMovement()` | true — клиентская предикция включена |

---

## GeckoLib анимации

| Константа | Анимация | Триггер |
|-----------|----------|---------|
| `ANIM_IDLE` | `animation.dragon.idle` | Стоит без движения |
| `ANIM_WALK` | `animation.dragon.walk` | Горизонтальная скорость > 0.001 |
| `ANIM_SIT` | `animation.dragon.sit` | `isOrderedToSit()` |
| `ANIM_TAKEOFF` | `animation.dragon.takeoff` | STATE_TAKEOFF |
| `ANIM_FLY` | `animation.dragon.fly` | STATE_FLYING |
| `ANIM_LAND` | `animation.dragon.land` | STATE_LANDING |

Переходный период контроллера: **2 тика**.

---

## Entity Events (частицы)

| id | Событие | Частицы |
|----|---------|---------|
| 6 | Приручение провалилось | SMOKE × 7 |
| 7 | Приручение успешно | HEART × 7 |
| 8 | Рост дракона | HAPPY_VILLAGER × 12 |

---

## Сохранение данных

```java
// Сохраняется: Tamed, Sitting, DragonType, AgeTicks, FlightState, OwnerUUID
tag.putBoolean("Tamed", isTamed());
tag.putBoolean("Sitting", isOrderedToSit());
tag.putString("DragonType", getDragonType());
tag.putInt("AgeTicks", getAgeTicks());
tag.putInt("FlightState", getFlightState());
```

При загрузке немедленно вызывается `updateAttributes()` для восстановления корректного масштаба.

---

## Ключевые методы

| Метод | Описание |
|-------|----------|
| `getDragonStage()` | 1–5, по возрасту в днях |
| `getRenderSize()` | Интерполированный размер внутри стадии |
| `getDragonScale()` | `min(renderSize × 0.35, 7.0)` |
| `growDragon(int days)` | Добавляет дни роста + обновляет атрибуты и хитбокс |
| `getOwnerPlayer()` | Игрок-хозяин (null если оффлайн) |
| `teleportToOwner(Player)` | Телепорт в случайную точку ±2 блока от хозяина |
| `isFlying()` | true при STATE_FLYING или STATE_TAKEOFF |
| `getBreedOffspring()` | Всегда null — размножение не предусмотрено |
