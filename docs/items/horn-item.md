---
id: horn-item
title: DragonHornItem
sidebar_label: DragonHornItem
---

# DragonHornItem

**Файл:** `src/main/java/com/spa/dragons/item/DragonHornItem.java`
**Наследует:** `Item`

Рог дракона. Телепортирует прирученных драконов в радиусе 256 блоков. Кулдаун 5 сек.

---

## Константы

```java
private static final double SEARCH_RADIUS = 256.0;
```

---

## use(Level, Player, InteractionHand)

```java
List<TamableDragon> dragons = serverLevel.getEntitiesOfClass(
    TamableDragon.class,
    new AABB(...),
    dragon -> dragon.isTamed() && player.getUUID().equals(dragon.getOwnerUUID())
);

if (!dragons.isEmpty()) {
    for (TamableDragon dragon : dragons) {
        dragon.setOrderedToSit(false);
        dragon.teleportToOwner(player);
    }
    // Звук: громкий (volume=1.0, pitch=1.0)
} else {
    // Звук: тихий и низкий (volume=0.4, pitch=0.7)
}
```

---

## Кулдаун

```java
player.getCooldowns().addCooldown(
    Identifier.fromNamespaceAndPath("dragons-mod", "dragon_horn"), 100);
```

100 тиков = 5 секунд.

---

## Крафт

```
[ ][G][S]
[G][S][ ]
[S][ ][ ]
```

G = minecraft:gold_ingot, S = dragons-mod:fire_dragon_scale

```json
{
  "type": "minecraft:crafting_shaped",
  "pattern": [" GS", "GS ", "S  "],
  "key": {
    "G": {"item": "minecraft:gold_ingot"},
    "S": {"item": "dragons-mod:fire_dragon_scale"}
  },
  "result": {"id": "dragons-mod:dragon_horn", "count": 1}
}
```
