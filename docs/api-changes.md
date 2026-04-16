---
id: api-changes
title: Изменения API 1.21.11
sidebar_label: API 1.21.11
---

# Изменения API в 1.21.11

---

## 1. FabricEntityTypeBuilder → FabricEntityType.Builder

### Было (устаревший)

```java
// УСТАРЕЛО
FabricEntityTypeBuilder.createMob()
    .entityFactory(WildFireDragon::new)
    .spawnGroup(SpawnGroup.MONSTER)
    .defaultAttributes(WildFireDragon::createAttributes)
    .dimensions(EntityDimensions.fixed(2.0f, 2.0f))
    .build();
```

### Стало

```java
FabricEntityType.Builder.createMob(
    WildFireDragon::new,
    MobCategory.MONSTER,
    mob -> mob
        .defaultAttributes(WildFireDragon::createAttributes)
        .spawnRestriction(
            SpawnPlacementTypes.ON_GROUND,
            Heightmap.Types.MOTION_BLOCKING_NO_LEAVES,
            Monster::checkMonsterSpawnRules)
).sized(2.0f, 2.0f)
```

- SpawnGroup -> MobCategory
- Атрибуты инлайн
- EntityDimensions.fixed() -> .sized()

---

## 2. hurtServer() вместо hurt()

```java
@Override
public boolean hurtServer(ServerLevel level, DamageSource source, float amount) {
    return false;
}
```

**Внимание:** модификатор `public`, не `protected`.

---

## 3. MOVEMENT_SLOWDOWN -> SLOWNESS

```java
// Было
MobEffects.MOVEMENT_SLOWDOWN
// Стало
MobEffects.SLOWNESS
```

---

## 4. DRAGON_BREATH -> SMOKE

```java
// Было
ParticleTypes.DRAGON_BREATH
// Стало
ParticleTypes.SMOKE
```

---

## 5. getAttackReachSqr() удалён

```java
// Вызывало ошибку:
// error: method does not override method from supertype
// Решение: удалить @Override и метод
public class DragonMeleeGoal extends MeleeAttackGoal {
    public DragonMeleeGoal(BaseDragon dragon, double speedModifier, boolean f) {
        super(dragon, speedModifier, f);
    }
}
```

---

## 6. CompoundTag -> ValueInput/ValueOutput

```java
// Стало
@Override
public void addAdditionalSaveData(ValueOutput tag) {
    tag.putBoolean("Tamed", isTamed());
}
@Override
public void readAdditionalSaveData(ValueInput tag) {
    setTamed(tag.getBooleanOr("Tamed", false));
    tag.getString("DragonType").ifPresent(this::setDragonType);
}
```

---

## 7. doHurtTarget принимает ServerLevel

```java
// Было
@Override
public boolean doHurtTarget(Entity target) { ... }
// Стало
@Override
public boolean doHurtTarget(ServerLevel level, Entity target) { ... }
```

---

## Официальные маппинги (Mojang)

```gradle
mappings loom.officialMojangMappings()
```
