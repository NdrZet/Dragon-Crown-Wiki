---
id: mod-entities
title: ModEntities
sidebar_label: ModEntities
---

# ModEntities

**Файл:** `src/main/java/com/spa/dragons/entity/ModEntities.java`

Класс-реестр всех типов сущностей мода.

---

## Зарегистрированные типы

| Поле | EntityType ID | Класс | Категория | Размер |
|------|--------------|-------|-----------|--------|
| WILD_FIRE_DRAGON | dragons-mod:wild_fire_dragon | WildFireDragon | MONSTER | 2.0x2.0 |
| WILD_ICE_DRAGON | dragons-mod:wild_ice_dragon | WildIceDragon | MONSTER | 2.0x2.0 |
| WILD_SHADOW_DRAGON | dragons-mod:wild_shadow_dragon | WildShadowDragon | MONSTER | 2.0x2.0 |
| WILD_STORM_DRAGON | dragons-mod:wild_storm_dragon | WildStormDragon | MONSTER | 2.0x2.0 |
| TAMABLE_DRAGON | dragons-mod:tamable_dragon | TamableDragon | CREATURE | 1.2x1.2 |
| DRAGON_EGG_ENTITY | dragons-mod:dragon_egg_entity | DragonEggEntity | MISC | 0.6x0.6 |

---

## Метод register()

```java
private static EntityType register(String name, EntityType.Builder builder) {
    ResourceKey key = ResourceKey.create(
        Registries.ENTITY_TYPE,
        Identifier.fromNamespaceAndPath(DragonMod.MOD_ID, name));
    return Registry.register(BuiltInRegistries.ENTITY_TYPE, key, builder.build(key));
}
```

---

## FabricEntityType.Builder для диких драконов

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

createMob() - современный API Fabric.

---

## FabricEntityType.Builder для TamableDragon

```java
FabricEntityType.Builder.createLiving(
    TamableDragon::new,
    MobCategory.CREATURE,
    living -> living.defaultAttributes(TamableDragon::createAttributes)
).sized(1.2f, 1.2f)
```

---

## EntityType.Builder для DragonEggEntity

```java
EntityType.Builder.of(DragonEggEntity::new, MobCategory.MISC)
    .sized(0.6f, 0.6f)
    .noSummon()
```

---

## public static void register()

```java
public static void register() {
    DragonMod.LOGGER.info("Registering entities for " + DragonMod.MOD_ID);
}
```

Тело пустое — регистрация через static initializer.
