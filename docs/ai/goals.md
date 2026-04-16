---
id: goals
title: AI Goals
sidebar_label: AI Goals
---

# AI Goals

Пакет: `com.spa.dragons.entity.ai`

Три кастомных класса целей.

---

## DragonAttackGoal

**Наследует:** `Goal`

Цель преследования: дракон движется к цели.

### Конструктор

```java
public DragonAttackGoal(BaseDragon dragon, double speedModifier,
                        boolean followingTargetEvenIfNotSeen)
```

| Параметр | Описание |
|----------|----------|
| dragon | Ссылка на дракона |
| speedModifier | Множитель скорости |
| followingTargetEvenIfNotSeen | Преследование без видимости |

### Логика

```java
@Override
public boolean canUse() {
    LivingEntity target = this.dragon.getTarget();
    return target != null && target.isAlive();
}

@Override
public void tick() {
    dragon.getLookControl().setLookAt(target, 30f, 30f);
    if (--ticksUntilNextPathRecalculation <= 0) {
        ticksUntilNextPathRecalculation = 4 + dragon.getRandom().nextInt(7);
        dragon.getNavigation().moveTo(target, speedModifier);
    }
}
```

---

## DragonMeleeGoal

**Наследует:** `MeleeAttackGoal`

Обёртка над стандартной MeleeAttackGoal.

```java
public class DragonMeleeGoal extends MeleeAttackGoal {
    public DragonMeleeGoal(BaseDragon dragon, double speedModifier,
                           boolean followingTargetEvenIfNotSeen) {
        super(dragon, speedModifier, followingTargetEvenIfNotSeen);
    }
}
```

| Класс | Приоритет | speedModifier |
|-------|-----------|---------------|
| WildFireDragon | 3 | 1.2 |
| WildIceDragon | 3 | 1.1 |
| WildShadowDragon | 3 | 1.3 |
| WildStormDragon | 3 | 1.2 |

---

## DragonFollowOwnerGoal

**Наследует:** `Goal`

Цель следования за хозяином.

```java
public DragonFollowOwnerGoal(TamableDragon dragon, double speedModifier,
                             float minDist, float maxDist)
```

| Параметр | Значение | Описание |
|----------|---------|----------|
| speedModifier | 1.1 | Скорость |
| minDist | 5.0f | Мин расстояние |
| maxDist | 20.0f | Телепорт |

---

## Ванильные Goals

| Класс | Приоритет | Описание |
|-------|-----------|----------|
| FloatGoal | 1 | Плавание |
| WaterAvoidingRandomStrollGoal | 5/7 | Блуждание |
| LookAtPlayerGoal | 6/8 | Смотреть на игрока |
| RandomLookAroundGoal | 7/9 | Случайный взгляд |
| HurtByTargetGoal | 1 (target) | Ответная атака |
| NearestAttackableTargetGoal | 2 (target) | Атака игрока |
| DragonSitGoal | 2 | Сидеть |
