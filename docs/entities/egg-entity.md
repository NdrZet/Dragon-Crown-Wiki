---
id: egg-entity
title: DragonEggEntity
sidebar_label: DragonEggEntity
---

# DragonEggEntity

**Файл:** `src/main/java/com/spa/dragons/entity/DragonEggEntity.java`
**Наследует:** `Entity` (напрямую)

Сущность яйца дракона. Через **100 тиков (5 секунд)** вылупляется в TamableDragon.

---

## Константы

```java
private static final int HATCH_TICKS = 100; // 5 секунд (20 тиков/с)
```

---

## SynchedEntityData

| Ключ | Тип | Нач. значение | Описание |
|------|-----|-------------------|----------|
| DRAGON_TYPE | String | "fire" | Тип дракона |

---

## Физика

```java
public DragonEggEntity(EntityType<?> type, Level world) {
    super(type, world);
    this.noPhysics = false;
}
```

Гравитация в tick():

```java
if (\!this.onGround() && this.level() \!= null) {
    this.setDeltaMovement(this.getDeltaMovement().add(0, -0.04, 0));
}
```

---

## Метод tick()

1. super.tick()
2. Гравитация
3. Инкремент hatchTimer
4. hatchTimer >= 100 → hatch()
5. Каждые 40 тиков → частицы дыма

---

## Метод hatch()

```java
private void hatch() {
    if (this.level().isClientSide()) return;
    TamableDragon baby = ModEntities.TAMABLE_DRAGON.create(
        this.level(), EntitySpawnReason.MOB_SUMMONED);
    if (baby \!= null) {
        baby.setDragonType(this.getDragonType());
        baby.setPos(this.getX(), this.getY(), this.getZ());
        this.level().addFreshEntity(baby);
    }
    this.discard();
}
```

---

## Переопределения Entity

| Метод | Значение | Причина |
|-------|----------|--------|
| isPickable() | true | Можно подобрать |
| isPushable() | false | Не движется |
| hurtServer(...) | false | Неуязвимо |

---

## Сохранение

```java
// Сохранение
tag.putString("DragonType", getDragonType());
tag.putInt("HatchTimer", hatchTimer);
// Чтение
tag.getString("DragonType").ifPresent(this::setDragonType);
hatchTimer = tag.getIntOr("HatchTimer", 0);
```

Таймер сохраняется и продолжает отсчёт при загрузке.

---

## Параметры спавна

| Параметр | Значение |
|----------|----------|
| Hitbox | 0.6 x 0.6 блока |
| noSummon | true |
| MobCategory | MISC |
