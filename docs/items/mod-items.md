---
id: mod-items
title: ModItems
sidebar_label: ModItems
---

# ModItems

**Файл:** `src/main/java/com/spa/dragons/item/ModItems.java`

Класс-реестр всех предметов мода.

---

## Предметы-ресурсы (чешуя)

```java
public static final Item FIRE_DRAGON_SCALE   = register("fire_dragon_scale",   new Item(new Item.Properties()));
public static final Item ICE_DRAGON_SCALE    = register("ice_dragon_scale",    new Item(new Item.Properties()));
public static final Item SHADOW_DRAGON_SCALE = register("shadow_dragon_scale", new Item(new Item.Properties()));
public static final Item STORM_DRAGON_SCALE  = register("storm_dragon_scale",  new Item(new Item.Properties()));
```

Стак до 64. Материал крафта.

---

## Яйцо дракона

```java
public static final Item DRAGON_EGG_ITEM = register("dragon_egg",
    new DragonEggItem(new Item.Properties().stacksTo(16)));
```

---

## Рог дракона

```java
public static final Item DRAGON_HORN = register("dragon_horn",
    new DragonHornItem(new Item.Properties().stacksTo(1).durability(64)));
```

---

## Броня (16 предметов)

| Поле | ID | Материал |
|------|-----|----------|
| FIRE_HELMET | fire_dragon_helmet | DragonArmorMaterial.FIRE |
| FIRE_CHESTPLATE | fire_dragon_chestplate | DragonArmorMaterial.FIRE |
| FIRE_LEGGINGS | fire_dragon_leggings | DragonArmorMaterial.FIRE |
| FIRE_BOOTS | fire_dragon_boots | DragonArmorMaterial.FIRE |
| ICE_HELMET | ice_dragon_helmet | DragonArmorMaterial.ICE |
| ICE_CHESTPLATE | ice_dragon_chestplate | DragonArmorMaterial.ICE |
| ICE_LEGGINGS | ice_dragon_leggings | DragonArmorMaterial.ICE |
| ICE_BOOTS | ice_dragon_boots | DragonArmorMaterial.ICE |
| SHADOW_HELMET | shadow_dragon_helmet | DragonArmorMaterial.SHADOW |
| SHADOW_CHESTPLATE | shadow_dragon_chestplate | DragonArmorMaterial.SHADOW |
| SHADOW_LEGGINGS | shadow_dragon_leggings | DragonArmorMaterial.SHADOW |
| SHADOW_BOOTS | shadow_dragon_boots | DragonArmorMaterial.SHADOW |
| STORM_HELMET | storm_dragon_helmet | DragonArmorMaterial.STORM |
| STORM_CHESTPLATE | storm_dragon_chestplate | DragonArmorMaterial.STORM |
| STORM_LEGGINGS | storm_dragon_leggings | DragonArmorMaterial.STORM |
| STORM_BOOTS | storm_dragon_boots | DragonArmorMaterial.STORM |

```java
private static Item registerArmor(String name, ArmorMaterial material, ArmorType type) {
    return register(name, new Item(new Item.Properties().humanoidArmor(material, type)));
}
```

---

## Вкладка Creative (DRAGON_TAB)

```java
public static final CreativeModeTab DRAGON_TAB = Registry.register(
    BuiltInRegistries.CREATIVE_MODE_TAB,
    Identifier.fromNamespaceAndPath(DragonMod.MOD_ID, "dragon_tab"),
    FabricItemGroup.builder()
        .title(Component.translatable("itemGroup.dragons-mod.dragon_tab"))
        .icon(() -> new ItemStack(DRAGON_HORN))
        .displayItems((params, output) -> { /* 22 предмета */ })
        .build()
);
```

Иконка: DRAGON_HORN. Ключ локализации: `itemGroup.dragons-mod.dragon_tab`.

---

## Вспомогательные методы

- `register(String, Item)` - регистрация
- `register()` - вызывается из DragonMod.onInitialize()
- `registerArmorMaterials()` - загружает DragonArmorMaterial
