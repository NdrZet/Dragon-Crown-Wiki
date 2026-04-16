---
id: index
title: Обзор проекта
sidebar_label: Обзор проекта
slug: /
---

# Dragons Mod — Обзор проекта

**Dragons Mod** — мод для Minecraft **1.21.11** на платформе **Fabric**, добавляющий четыре вида диких драконов, систему приручения, яйца дракона, четыре полных набора брони и рог дракона.

| Параметр | Значение |
|----------|----------|
| Версия мода | 1.0.0 |
| Minecraft | 1.21.11 |
| Fabric Loader | >= 0.18.4 |
| Java | 21 |
| Маппинги | Official Mojang Mappings |
| Лицензия | CC0-1.0 |
| Автор | SPA |

---

## Что добавляет мод

### Существа

| Класс | ID | Особая атака | Биом |
|-------|----|--------------|------|
| WildFireDragon | dragons-mod:wild_fire_dragon | Поджигает на 5 сек | Нижний мир |
| WildIceDragon | dragons-mod:wild_ice_dragon | Замедление III | Снежные биомы |
| WildShadowDragon | dragons-mod:wild_shadow_dragon | Слепота + слабость II | Тёмные биомы |
| WildStormDragon | dragons-mod:wild_storm_dragon | Левитация III | Горы/ветер |
| TamableDragon | dragons-mod:tamable_dragon | — | Из яйца |
| DragonEggEntity | dragons-mod:dragon_egg_entity | — | Из предмета |

### Предметы

| ID | Назначение |
|----|------------|
| dragons-mod:fire_dragon_scale | Чешуя огненного дракона |
| dragons-mod:ice_dragon_scale | Чешуя ледяного дракона |
| dragons-mod:shadow_dragon_scale | Чешуя теневого дракона |
| dragons-mod:storm_dragon_scale | Чешуя грозового дракона |
| dragons-mod:dragon_egg | Яйцо дракона (предмет) |
| dragons-mod:dragon_horn | Рог дракона — телепортирует драконов |
| dragons-mod:fire_dragon_helmet … storm_dragon_boots | 16 предметов брони |

### Дата-файлы

| Тип | Количество | Путь |
|-----|-----------|------|
| Лут-таблицы | 4 | data/dragons-mod/loot_table/entities/ |
| Биом-модификации | 4 | data/dragons-mod/fabric/biome/modification/ |
| Рецепты | 17 | data/dragons-mod/recipe/ |
| Локализация | 2 (en/ru) | assets/dragons-mod/lang/ |

---

## Точки входа

**Серверная точка входа:** `DragonMod.onInitialize()`

```java
// fabric.mod.json → "main": ["com.spa.dragons.DragonMod"]
```

При старте `DragonMod.onInitialize()` вызывает:

1. `ModEntities.register()` — регистрация 6 типов сущностей
2. `ModItems.register()` — регистрация 22 предметов + вкладка

**Клиентская точка входа:** `DragonModClient.onInitializeClient()`

Регистрирует рендереры: `DragonGeoRenderer` для 5 драконов + `ThrownItemRenderer` для яйца.

---

## Структура пакетов

```
com.spa.dragons
├── DragonMod.java              ← серверная точка входа
├── client/
│   ├── DragonModClient.java    ← клиентская точка входа
│   ├── model/
│   │   ├── DragonGeoModel.java
│   │   └── TamableDragonModel.java
│   └── renderer/
│       └── DragonGeoRenderer.java
└── entity/
    ├── BaseDragon.java         ← абстрактный базовый класс
    ├── WildFireDragon.java
    ├── WildIceDragon.java
    ├── WildShadowDragon.java
    ├── WildStormDragon.java
    ├── TamableDragon.java      ← прирученный (рост, полёт, езда)
    ├── DragonEggEntity.java    ← физическое яйцо (100 тиков)
    ├── ModEntities.java
    ├── ai/
    │   ├── DragonAttackGoal.java
    │   ├── DragonMeleeGoal.java
    │   └── DragonFollowOwnerGoal.java
    └── item/
        ├── ModItems.java
        ├── DragonArmorMaterial.java
        ├── DragonEggItem.java
        └── DragonHornItem.java
```

---

## Быстрый старт

```bash
# Клонировать репозиторий
git clone <url> Dragons_mod
cd Dragons_mod

# Собрать
./gradlew build

# JAR находится в: build/libs/dragons-mod-1.0.0.jar
```

Подробнее — в разделе [Сборка](./building).
