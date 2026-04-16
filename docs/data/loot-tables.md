---
id: loot-tables
title: Лут-таблицы
sidebar_label: Лут-таблицы
---

# Лут-таблицы

**Путь:** `src/main/resources/data/dragons-mod/loot_table/entities/`

---

## Файлы

| Файл | Сущность |
|------|----------|
| wild_fire_dragon.json | dragons-mod:wild_fire_dragon |
| wild_ice_dragon.json | dragons-mod:wild_ice_dragon |
| wild_shadow_dragon.json | dragons-mod:wild_shadow_dragon |
| wild_storm_dragon.json | dragons-mod:wild_storm_dragon |

---

## Структура (пример: wild_fire_dragon.json)

```json
{
  "type": "minecraft:entity",
  "pools": [
    {
      "rolls": {"type": "minecraft:uniform", "min": 2, "max": 5},
      "entries": [{"type": "minecraft:item", "name": "dragons-mod:fire_dragon_scale"}],
      "conditions": [{"condition": "minecraft:killed_by_player"}]
    },
    {
      "rolls": 1,
      "entries": [
        {"type": "minecraft:item", "name": "dragons-mod:dragon_egg", "weight": 1},
        {"type": "minecraft:empty", "weight": 1}
      ],
      "conditions": [{"condition": "minecraft:killed_by_player"}]
    }
  ]
}
```

---

## Пул 1: Чешуя

| Параметр | Значение |
|----------|----------|
| Кол-во бросков | 2–5 |
| Условие | Убит игроком |

---

## Пул 2: Яйцо

| Параметр | Значение |
|----------|----------|
| Бросков | 1 |
| Шанс яйца | 50% |
| Условие | Убит игроком |

---

## Соответствие чешуи

| Дракон | Дроп |
|--------|------|
| WildFireDragon | fire_dragon_scale |
| WildIceDragon | ice_dragon_scale |
| WildShadowDragon | shadow_dragon_scale |
| WildStormDragon | storm_dragon_scale |

---

## Looting энчант (opaque)

```json
"functions": [
  {
    "function": "minecraft:looting_enchant",
    "count": {"min": 0, "max": 1}
  }
]
```
