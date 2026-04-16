---
id: egg-item
title: DragonEggItem
sidebar_label: DragonEggItem
---

# DragonEggItem

**Файл:** `src/main/java/com/spa/dragons/item/DragonEggItem.java`
**Наследует:** `Item`

Предмет яйца дракона. Размещает DragonEggEntity перед игроком.

---

## Константы

```java
public static final String DRAGON_TYPE_KEY = "DragonType";
```

---

## use(Level, Player, InteractionHand)

```java
@Override
public InteractionResult use(Level world, Player player, InteractionHand hand)
```

Логика только на сервере:

```java
if (\!world.isClientSide() && world instanceof ServerLevel serverLevel) {
    Vec3 pos = player.position().add(player.getLookAngle().scale(2.0));
    DragonEggEntity egg = new DragonEggEntity(ModEntities.DRAGON_EGG_ENTITY, serverLevel);
    egg.setPos(pos.x, pos.y, pos.z);
    // читаем тип из CustomData
    serverLevel.addFreshEntity(egg);
    if (\!player.getAbilities().instabuild) stack.shrink(1);
}
return InteractionResult.SUCCESS;
```

Позиция: 2 блока перед игроком.

---

## getName(ItemStack)

Возвращает название в зависимости от типа:

| Тип | Ключ | Название (en) |
|-----|-----|------------------|
| fire | item.dragons-mod.dragon_egg.fire | Fire Dragon Egg |
| ice | item.dragons-mod.dragon_egg.ice | Ice Dragon Egg |
| shadow | item.dragons-mod.dragon_egg.shadow | Shadow Dragon Egg |
| storm | item.dragons-mod.dragon_egg.storm | Storm Dragon Egg |
| (нет) | item.dragons-mod.dragon_egg | Dragon Egg |

---

## Как задать тип яйцу

```
/give @p dragons-mod:dragon_egg[custom_data={DragonType:"fire"}]
```
