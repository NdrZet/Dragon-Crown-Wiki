---
id: extending
title: Расширение мода
sidebar_label: Расширение
---

# Расширение мода

Руководство по добавлению новых типов драконов.

---

## Добавить новый дикий дракон

### Шаг 1: Класс

```java
public class WildPoisonDragon extends BaseDragon {

    public WildPoisonDragon(EntityType<? extends WildPoisonDragon> type, Level world) {
        super(type, world);
    }

    public static AttributeSupplier.Builder createAttributes() {
        return BaseDragon.createAttributes()
            .add(Attributes.MAX_HEALTH, 110.0)
            .add(Attributes.ATTACK_DAMAGE, 16.0);
    }

    @Override
    protected void registerGoals() {
        this.goalSelector.addGoal(1, new FloatGoal(this));
        this.goalSelector.addGoal(2, new DragonAttackGoal(this, 1.0, true));
        this.goalSelector.addGoal(3, new DragonMeleeGoal(this, 1.1, false));
        this.targetSelector.addGoal(1, new HurtByTargetGoal(this));
        this.targetSelector.addGoal(2, new NearestAttackableTargetGoal(this, Player.class, true));
    }

    @Override
    protected String getDragonType() { return "poison"; }

    @Override
    public boolean doHurtTarget(ServerLevel level, Entity target) {
        boolean result = super.doHurtTarget(level, target);
        if (result && target instanceof LivingEntity living) {
            living.addEffect(new MobEffectInstance(MobEffects.POISON, 200, 1));
        }
        return result;
    }
}
```

### Шаг 2: ModEntities

```java
public static final EntityType<WildPoisonDragon> WILD_POISON_DRAGON = register(
    "wild_poison_dragon",
    FabricEntityType.Builder.createMob(
        WildPoisonDragon::new, MobCategory.MONSTER,
        mob -> mob
            .defaultAttributes(WildPoisonDragon::createAttributes)
            .spawnRestriction(SpawnPlacementTypes.ON_GROUND,
                Heightmap.Types.MOTION_BLOCKING_NO_LEAVES,
                Monster::checkMonsterSpawnRules)
    ).sized(2.0f, 2.0f)
);
```

### Шаг 3: Лут-таблица

Создай `data/dragons-mod/loot_table/entities/wild_poison_dragon.json`.

### Шаг 4: Биом-модификация

```json
{
  "type": "fabric:add_spawn_entries",
  "biomes": "minecraft:swamp",
  "mob_category": "MONSTER",
  "spawners": [{"type": "dragons-mod:wild_poison_dragon", "weight": 6, "minCount": 1, "maxCount": 2}],
  "spawn_costs": {}
}
```

### Шаг 5: Локализация

```json
"entity.dragons-mod.wild_poison_dragon": "Poison Dragon"
```

### Шаг 6: Рендерер

```java
EntityRendererRegistry.register(ModEntities.WILD_POISON_DRAGON, NoopRenderer::new);
```

---

## Добавить предмет

```java
public static final Item POISON_DRAGON_SCALE = register(
    "poison_dragon_scale", new Item(new Item.Properties()));
```

---

## Чеклист

- [ ] Класс наследует BaseDragon
- [ ] createAttributes()
- [ ] registerGoals()
- [ ] getDragonType() уникальная строка
- [ ] doHurtTarget() спецатака
- [ ] ModEntities EntityType
- [ ] Лут-таблица
- [ ] Биом-модификация
- [ ] Локализация
- [ ] Рендерер в DragonModClient
- [ ] ./gradlew build без ошибок
