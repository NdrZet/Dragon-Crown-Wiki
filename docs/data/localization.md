---
id: localization
title: Локализация
sidebar_label: Локализация
---

# Локализация

**Путь:** `src/main/resources/assets/dragons-mod/lang/`

Два файла: en_us.json и ru_ru.json.

---

## Вкладка Creative

| Ключ | en_us | ru_ru |
|------|-------|-------|
| itemGroup.dragons-mod.dragon_tab | Dragons | Драконы |

---

## Чешуя

| Ключ | en_us |
|------|-------|
| item.dragons-mod.fire_dragon_scale | Fire Dragon Scale |
| item.dragons-mod.ice_dragon_scale | Ice Dragon Scale |
| item.dragons-mod.shadow_dragon_scale | Shadow Dragon Scale |
| item.dragons-mod.storm_dragon_scale | Storm Dragon Scale |

---

## Яйцо

| Ключ | en_us |
|------|-------|
| item.dragons-mod.dragon_egg | Dragon Egg |
| item.dragons-mod.dragon_egg.fire | Fire Dragon Egg |
| item.dragons-mod.dragon_egg.ice | Ice Dragon Egg |
| item.dragons-mod.dragon_egg.shadow | Shadow Dragon Egg |
| item.dragons-mod.dragon_egg.storm | Storm Dragon Egg |

---

## Рог

| Ключ | en_us |
|------|-------|
| item.dragons-mod.dragon_horn | Dragon Horn |

---

## Броня

| Ключ | en_us |
|------|-------|
| item.dragons-mod.fire_dragon_helmet | Fire Dragon Helmet |
| item.dragons-mod.fire_dragon_chestplate | Fire Dragon Chestplate |
| item.dragons-mod.fire_dragon_leggings | Fire Dragon Leggings |
| item.dragons-mod.fire_dragon_boots | Fire Dragon Boots |
| item.dragons-mod.ice_dragon_helmet | Ice Dragon Helmet |
| (аналогично для ice, shadow, storm) | |

---

## Сущности

| Ключ | en_us |
|------|-------|
| entity.dragons-mod.wild_fire_dragon | Fire Dragon |
| entity.dragons-mod.wild_ice_dragon | Ice Dragon |
| entity.dragons-mod.wild_shadow_dragon | Shadow Dragon |
| entity.dragons-mod.wild_storm_dragon | Storm Dragon |
| entity.dragons-mod.tamable_dragon | Young Dragon |
| entity.dragons-mod.dragon_egg_entity | Dragon Egg |

---

## Добавление языка

1. Создай `assets/dragons-mod/lang/<locale>.json`
2. Скопируй ключи из en_us.json
3. Переведи

---

## Динамические имена (getName)

```java
return Component.translatable("item.dragons-mod.dragon_egg." + type);
```
