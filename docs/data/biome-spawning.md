---
id: biome-spawning
title: Спавн в биомах
sidebar_label: Спавн в биомах
---

# Спавн в биомах

**Путь:** `src/main/resources/data/dragons-mod/fabric/biome/modification/`

Мод использует Fabric Biome Modification API.

---

## Файлы модификаций

| Файл | Дракон |
|------|--------|
| spawn_wild_fire_dragon.json | WildFireDragon |
| spawn_wild_ice_dragon.json | WildIceDragon |
| spawn_wild_shadow_dragon.json | WildShadowDragon |
| spawn_wild_storm_dragon.json | WildStormDragon |

---

## Формат (пример: огненный)

```json
{
  "type": "fabric:add_spawn_entries",
  "biomes": "#minecraft:is_nether",
  "mob_category": "MONSTER",
  "spawners": [
    {
      "type": "dragons-mod:wild_fire_dragon",
      "weight": 8,
      "minCount": 1,
      "maxCount": 2
    }
  ],
  "spawn_costs": {}
}
```

---

## Параметры спавна

| Дракон | Биомы | Вес | Min | Max |
|--------|-------|-----|-----|-----|
| Fire | #minecraft:is_nether | 8 | 1 | 2 |
| Ice | #minecraft:is_snowy | 8 | 1 | 2 |
| Shadow | minecraft:dark_forest, minecraft:deep_dark | 6 | 1 | 1 |
| Storm | #minecraft:is_mountain | 6 | 1 | 2 |

---

## Поле biomes

- **Один биом:** "minecraft:nether_wastes"
- **Тег:** "#minecraft:is_nether"
- **Массив:** ["minecraft:dark_forest", "#minecraft:is_deep_ocean"]

---

## Поле weight

Относительный вес (драконы 6-8 = реже зомби).

---

## Как изменить биомы

1. Отредактируй JSON-файл
2. Замени biomes на нужный тег/ID
3. Пересобери: ./gradlew build

```json
{"biomes": "minecraft:frozen_peaks"}
```
