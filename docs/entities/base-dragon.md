---
id: base-dragon
title: BaseDragon
sidebar_label: BaseDragon
---

# BaseDragon

**Файл:** `src/main/java/com/spa/dragons/entity/BaseDragon.java`
**Пакет:** `com.spa.dragons.entity`
**Наследует:** `Monster` → `PathfinderMob` → `Mob` → `LivingEntity` + `GeoEntity`

Абстрактный базовый класс для всех четырёх диких драконов. Содержит общие атрибуты, константы и переопределения поведения, которые наследуются каждым конкретным видом.

---

## Константы

```java
public static final String DRAGON_TYPE_KEY = "DragonType";
```

Ключ NBT для сохранения типа дракона. Используется в `DragonEggEntity` и `TamableDragon` при сериализации.

---

## Конструктор

```java
protected BaseDragon(EntityType<? extends BaseDragon> type, Level world) {
    super(type, world);
}
```

Передаёт тип и мир в конструктор `Monster`. Вызывается только подклассами.

| Параметр | Тип | Описание |
|----------|-----|----------|
| `type` | `EntityType<?>` | Зарегистрированный тип сущности |
| `world` | `Level` | Уровень, в котором создаётся сущность |

---

## Методы

### maxUpStep()

```java
@Override
public float maxUpStep() { return 1.5f; }
```

**Возвращает:** `1.5f`

Максимальная высота подъёма за один тик движения. Стандартное значение для большинства мобов — 0.6 (один блок). Значение 1.5 позволяет дракону подниматься на 1.5 блока без прыжка, что соответствует крупному телу.

---

### createAttributes()

```java
public static AttributeSupplier.Builder createAttributes() {
    return Monster.createMonsterAttributes()
        .add(Attributes.MAX_HEALTH,          120.0)
        .add(Attributes.ATTACK_DAMAGE,        18.0)
        .add(Attributes.ARMOR,                12.0)
        .add(Attributes.MOVEMENT_SPEED,        0.25)
        .add(Attributes.FOLLOW_RANGE,         40.0)
        .add(Attributes.KNOCKBACK_RESISTANCE,  0.8);
}
```

Базовые атрибуты всех диких драконов. Подклассы переопределяют часть значений через `FabricEntityType.Builder.createMob()`.

| Атрибут | Значение | Пояснение |
|---------|----------|-----------|
| `MAX_HEALTH` | 120.0 | 60 сердец |
| `ATTACK_DAMAGE` | 18.0 | 9 сердец за удар |
| `ARMOR` | 12.0 | Аналог алмазной брони |
| `MOVEMENT_SPEED` | 0.25 | Стандартная скорость моба |
| `FOLLOW_RANGE` | 40.0 | Радиус обнаружения цели (блоки) |
| `KNOCKBACK_RESISTANCE` | 0.8 | 80% сопротивление отбрасыванию |

---

### getDragonType()

```java
protected abstract String getDragonType();
```

Абстрактный метод. Каждый подкласс возвращает строку-идентификатор типа:

| Класс | Возвращает |
|-------|----------|
| `WildFireDragon` | `"fire"` |
| `WildIceDragon` | `"ice"` |
| `WildShadowDragon` | `"shadow"` |
| `WildStormDragon` | `"storm"` |

---

### finalizeSpawn()

```java
@Override
public SpawnGroupData finalizeSpawn(ServerLevelAccessor world,
                                    DifficultyInstance difficulty,
                                    EntitySpawnReason reason,
                                    SpawnGroupData spawnData) {
    return super.finalizeSpawn(world, difficulty, reason, spawnData);
}
```

Вызывается при финальной инициализации сущности в момент спавна. Делегирует вызов родительскому классу. Переопределён для возможности расширения в будущем (добавление снаряжения, вариантов и т.д.).

---

### GeckoLib (registerControllers)

```java
@Override
public void registerControllers(AnimatableManager.ControllerRegistrar controllers) {}
```

Дикие драконы не имеют GeckoLib-анимаций — контроллер пустой. Анимации реализованы только в `TamableDragon`.

---

## Переопределения в подклассах

Все дикие драконы переопределяют два метода:

### registerGoals()

Регистрирует AI-цели. Полный список целей смотри в разделе [AI Goals](../ai/goals).

### doHurtTarget(ServerLevel, Entity)

```java
@Override
public boolean doHurtTarget(ServerLevel level, Entity target) {
    boolean result = super.doHurtTarget(level, target);
    if (result) { /* применяет особый эффект */ }
    return result;
}
```

Вызывается при успешном попадании по цели. Каждый подкласс добавляет свой эффект после вызова `super`.

---

## Наследование атрибутов (сводная таблица)

| Атрибут | BaseDragon | FireDragon | IceDragon | ShadowDragon | StormDragon |
|---------|-----------|-----------|----------|-------------|------------|
| MAX_HEALTH | 120 | **140** | **130** | 120 | **150** |
| ATTACK_DAMAGE | 18 | **20** | 18 | **22** | **24** |
| ARMOR | 12 | 12 | **16** | 12 | 12 |
| MOVEMENT_SPEED | 0.25 | 0.25 | 0.25 | **0.30** | 0.25 |
| KNOCKBACK_RESISTANCE | 0.8 | 0.8 | 0.8 | 0.8 | **1.0** |
