---
id: wild-dragons
title: Дикие драконы
sidebar_label: Дикие драконы
---

# Дикие драконы

Четыре вида: Fire, Ice, Shadow, Storm.

---

## WildFireDragon

**Файл:** `WildFireDragon.java`

### Атрибуты

| Атрибут | Значение |
|---------|----------|
| MAX_HEALTH | **140** |
| ATTACK_DAMAGE | **20** |
| Hitbox | 2.0x2.0 |
| MobCategory | MONSTER |

### Особая атака

```java
@Override
public boolean doHurtTarget(ServerLevel level, Entity target) {
    boolean result = super.doHurtTarget(level, target);
    if (result) { target.igniteForSeconds(5); }
    return result;
}
```

Поджигает цель на **5 секунд**.

### Спавн

| Параметр | Значение |
|----------|----------|
| Биомы | `#minecraft:is_nether` |
| Вес | 8 |
| Группа | 1-2 |
| Категория | MONSTER |

### Дроп

- **2-5** `fire_dragon_scale`
- **50%** `dragon_egg`

### Goals

```java
goalSelector.addGoal(1, new FloatGoal(this));
goalSelector.addGoal(2, new DragonAttackGoal(this, 1.0, true));
goalSelector.addGoal(3, new DragonMeleeGoal(this, 1.2, false));
targetSelector.addGoal(1, new HurtByTargetGoal(this));
targetSelector.addGoal(2, new NearestAttackableTargetGoal(this, Player.class, true));
```

---

## WildIceDragon

**Файл:** `WildIceDragon.java`

### Атрибуты

| Атрибут | Значение |
|---------|----------|
| MAX_HEALTH | **130** |
| ARMOR | **16** |
| Hitbox | 2.0x2.0 |
| MobCategory | MONSTER |

### Особая атака

```java
@Override
public boolean doHurtTarget(ServerLevel level, Entity target) {
    boolean result = super.doHurtTarget(level, target);
    if (result && target instanceof LivingEntity living) {
        living.addEffect(new MobEffectInstance(MobEffects.SLOWNESS, 100, 2));
    }
    return result;
}
```

Замедление III на 5 сек. (100 т., amplifier=2).

### Спавн

| Биомы | `#minecraft:is_snowy` | Вес 8 | 1-2 |

### Дроп: 2-5 ice_dragon_scale + 50% dragon_egg

---

## WildShadowDragon

**Файл:** `WildShadowDragon.java`

### Атрибуты

| MAX_HEALTH | 120 | ATTACK_DAMAGE | **22** | MOVEMENT_SPEED | **0.30** |

### Особая атака

```java
@Override
public boolean doHurtTarget(ServerLevel level, Entity target) {
    boolean result = super.doHurtTarget(level, target);
    if (result && target instanceof LivingEntity living) {
        living.addEffect(new MobEffectInstance(MobEffects.BLINDNESS, 60, 0));
        living.addEffect(new MobEffectInstance(MobEffects.WEAKNESS, 80, 1));
    }
    return result;
}
```

Слепота I (60т.) + Слабость II (80т.).

### Спавн

| Биомы | `minecraft:dark_forest` | Вес 6 | 1 |

### Дроп: 2-5 shadow_dragon_scale + 50% dragon_egg

---

## WildStormDragon

**Файл:** `WildStormDragon.java`

### Атрибуты

| Атрибут | Значение |
|---------|----------|
| MAX_HEALTH | **150** |
| ATTACK_DAMAGE | **24** |
| KNOCKBACK_RESISTANCE | **1.0** |
| Hitbox | 2.0x2.0 |
| MobCategory | MONSTER |

Полная сопротивляемость (1.0=100%).

### Особая атака

```java
@Override
public boolean doHurtTarget(ServerLevel level, Entity target) {
    boolean result = super.doHurtTarget(level, target);
    if (result && target instanceof LivingEntity living) {
        living.addEffect(new MobEffectInstance(MobEffects.LEVITATION, 20, 2));
    }
    return result;
}
```

Левитация III на 1 сек. (20т., amplifier=2).

### Спавн

| Биомы | `#minecraft:is_mountain` | Вес 6 | 1-2 |

### Дроп: 2-5 storm_dragon_scale + 50% dragon_egg

---

## Сравнительная таблица

| Дракон | HP | Урон | Броня | Скор. | Эффект | Вес |
|--------|-----|------|-------|------|--------|-----|
| Fire | 140 | 20 | 12 | 0.25 | Поджог 5с | 8 |
| Ice | 130 | 18 | 16 | 0.25 | Замедл. III | 8 |
| Shadow | 120 | 22 | 12 | 0.30 | Слеп+Слаб | 6 |
| Storm | 150 | 24 | 12 | 0.25 | Левит. III | 6 |
