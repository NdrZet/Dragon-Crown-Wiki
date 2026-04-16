---
id: armor-material
title: DragonArmorMaterial
sidebar_label: DragonArmorMaterial
---

# DragonArmorMaterial

**Файл:** `src/main/java/com/spa/dragons/item/DragonArmorMaterial.java`

Четыре константы ArmorMaterial. В 1.21.11 ArmorMaterial — record.

---

## Конструктор ArmorMaterial

```java
new ArmorMaterial(
    int durabilityMultiplier,
    Map<ArmorType, Integer> defense,
    int enchantability,
    SoundEvent equipSound,
    float toughness,
    float knockbackResistance,
    TagKey<Item> repairIngredient,
    ResourceKey<EquipmentAsset> assetId
)
```

---

## FIRE

```java
public static final ArmorMaterial FIRE = new ArmorMaterial(
    25,
    buildDefenceMap(5, 8, 10, 5),
    20,
    SoundEvents.ARMOR_EQUIP_NETHERITE,
    2.5f,
    0.15f,
    ItemTags.REPAIRS_NETHERITE_ARMOR,
    FIRE_ASSET
);
```

| Слот | Защита |
|------|--------|
| Шлем | 5 |
| Нагрудник | 8 |
| Поножи | 10 |
| Сапоги | 5 |
| **Итого** | **28** |

---

## ICE

```java
public static final ArmorMaterial ICE = new ArmorMaterial(
    22,
    buildDefenceMap(4, 7, 9, 4),
    18,
    SoundEvents.ARMOR_EQUIP_DIAMOND,
    2.0f, 0.10f,
    ItemTags.REPAIRS_DIAMOND_ARMOR,
    ICE_ASSET
);
```

| Слот | Защита |
|------|--------|
| Шлем | 4 |
| Нагрудник | 7 |
| Поножи | 9 |
| Сапоги | 4 |
| **Итого** | **24** |

---

## SHADOW

```java
public static final ArmorMaterial SHADOW = new ArmorMaterial(
    20,
    buildDefenceMap(3, 6, 8, 3),
    22,
    SoundEvents.ARMOR_EQUIP_LEATHER,
    1.5f, 0.05f,
    ItemTags.REPAIRS_LEATHER_ARMOR,
    SHADOW_ASSET
);
```

| Слот | Защита |
|------|--------|
| Шлем | 3 |
| Нагрудник | 6 |
| Поножи | 8 |
| Сапоги | 3 |
| **Итого** | **20** |

---

## STORM

```java
public static final ArmorMaterial STORM = new ArmorMaterial(
    22,
    buildDefenceMap(4, 8, 10, 4),
    24,
    SoundEvents.ARMOR_EQUIP_CHAIN,
    2.0f, 0.10f,
    ItemTags.REPAIRS_CHAIN_ARMOR,
    STORM_ASSET
);
```

| Слот | Защита |
|------|--------|
| Шлем | 4 |
| Нагрудник | 8 |
| Поножи | 10 |
| Сапоги | 4 |
| **Итого** | **26** |

---

## Сравнительная таблица

| Материал | Прочность | Зачар. | Стойкость | KnockRes | Ремонт | Защита |
|----------|-----------|--------|-----------|---------|--------|--------|
| FIRE | 25 | 20 | 2.5 | 0.15 | Незерит | 28 |
| ICE | 22 | 18 | 2.0 | 0.10 | Алмаз | 24 |
| SHADOW | 20 | 22 | 1.5 | 0.05 | Кожа | 20 |
| STORM | 22 | 24 | 2.0 | 0.10 | Цепочка | 26 |
| Незерит (ван.) | 37 | 15 | 3.0 | 0.10 | Незерит | 20 |
| Алмаз (ван.) | 33 | 10 | 2.0 | 0.00 | Алмаз | 20 |

---

## EquipmentAsset

```java
private static final ResourceKey<EquipmentAsset> FIRE_ASSET =
    ResourceKey.create(EquipmentAssets.ROOT_ID,
        Identifier.fromNamespaceAndPath(DragonMod.MOD_ID, "fire_dragon"));
```

ID: dragons-mod:fire_dragon, dragons-mod:ice_dragon, dragons-mod:shadow_dragon, dragons-mod:storm_dragon

---

## buildDefenceMap

```java
private static Map<ArmorType, Integer> buildDefenceMap(int head, int chest, int legs, int feet)
```

Создаёт EnumMap с четырьмя значениями защиты.
