---
id: recipes
title: Рецепты крафта
sidebar_label: Рецепты
---

# Рецепты крафта

**Путь:** `src/main/resources/data/dragons-mod/recipe/`

17 рецептов: 4 набора брони (4 рец. каждый) + рог.

---

## Шлем

```
[S][S][S]
[S][ ][S]
[ ][ ][ ]
```

## Нагрудник

```json
{
  "type": "minecraft:crafting_shaped",
  "pattern": ["S S", "SSS", "SSS"],
  "key": {"S": {"item": "dragons-mod:fire_dragon_scale"}},
  "result": {"id": "dragons-mod:fire_dragon_chestplate", "count": 1}
}
```

## Поножи

```
[S][S][S]
[S][ ][S]
[S][ ][S]
```

## Сапоги

```
[S][ ][S]
[S][ ][S]
```

---

## Таблица рецептов брони

| Предмет | Ингредиент | Ячеек |
|---------|----------|--------|
| fire_dragon_helmet | fire_dragon_scale | 5 |
| fire_dragon_chestplate | fire_dragon_scale | 8 |
| fire_dragon_leggings | fire_dragon_scale | 7 |
| fire_dragon_boots | fire_dragon_scale | 4 |
| ice_dragon_helmet | ice_dragon_scale | 5 |
| ice_dragon_chestplate | ice_dragon_scale | 8 |
| ice_dragon_leggings | ice_dragon_scale | 7 |
| ice_dragon_boots | ice_dragon_scale | 4 |
| shadow_dragon_helmet | shadow_dragon_scale | 5 |
| shadow_dragon_chestplate | shadow_dragon_scale | 8 |
| shadow_dragon_leggings | shadow_dragon_scale | 7 |
| shadow_dragon_boots | shadow_dragon_scale | 4 |
| storm_dragon_helmet | storm_dragon_scale | 5 |
| storm_dragon_chestplate | storm_dragon_scale | 8 |
| storm_dragon_leggings | storm_dragon_scale | 7 |
| storm_dragon_boots | storm_dragon_scale | 4 |

---

## Рог дракона

```
[ ][G][S]
[G][S][ ]
[S][ ][ ]
```

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

Для крафта рога: 3 огненных чешуи + 2 золотых слитка.

---

## Как добавить новый рецепт

```json
{
  "type": "minecraft:crafting_shapeless",
  "ingredients": [
    {"item": "dragons-mod:fire_dragon_scale"},
    {"item": "minecraft:blaze_powder"}
  ],
  "result": {"id": "minecraft:fire_charge", "count": 4}
}
```
