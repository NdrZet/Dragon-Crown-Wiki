---
id: architecture
title: Архитектура мода
sidebar_label: Архитектура
---

# Архитектура мода

## Иерархия классов сущностей

```
Entity (Minecraft)
└── LivingEntity
    ├── Mob
    │   └── PathfinderMob
    │       ├── Monster
    │       │   └── BaseDragon          ← абстрактный базовый класс диких
    │       │       ├── WildFireDragon
    │       │       ├── WildIceDragon
    │       │       ├── WildShadowDragon
    │       │       └── WildStormDragon
    │       └── Animal
    │           └── TamableDragon       ← прирученный дракон
    └── Entity (без LivingEntity)
        └── DragonEggEntity             ← яйцо дракона
```

Дикие драконы наследуют Monster и получают враждебную логику спавна (checkMonsterSpawnRules) автоматически.

TamableDragon наследует Animal — нейтральное существо, которое не атакует игроков самостоятельно.

DragonEggEntity наследует напрямую Entity — не имеет здоровья, инвентаря, эффектов.

---

## Система регистрации

Вся регистрация сущностей происходит в ModEntities через статические поля, инициализируемые при загрузке класса. Метод register() нужен только для того, чтобы спровоцировать загрузку класса (static initializer).

```java
// Паттерн регистрации
public static final EntityType<WildFireDragon> WILD_FIRE_DRAGON = register(
    "wild_fire_dragon",
    FabricEntityType.Builder.createMob(
        WildFireDragon::new, MobCategory.MONSTER,
        mob -> mob
            .defaultAttributes(WildFireDragon::createAttributes)
            .spawnRestriction(SpawnPlacementTypes.ON_GROUND,
                Heightmap.Types.MOTION_BLOCKING_NO_LEAVES,
                Monster::checkMonsterSpawnRules)
    ).sized(2.0f, 2.0f)
);
```

FabricEntityType.Builder.createMob() — современный API Fabric (не устаревший). Он принимает:
1. Конструктор сущности (method reference)
2. Категорию спавна (MobCategory)
3. Лямбду-конфигуратор, где задаются атрибуты и правила спавна

---

## Паттерн атрибутов

Каждый класс дракона переопределяет базовые атрибуты через createAttributes():

```java
// BaseDragon — базовые значения
public static AttributeSupplier.Builder createAttributes() {
    return Monster.createMonsterAttributes()
        .add(Attributes.MAX_HEALTH,          120.0)
        .add(Attributes.ATTACK_DAMAGE,        18.0)
        .add(Attributes.ARMOR,                12.0)
        .add(Attributes.MOVEMENT_SPEED,       0.25)
        .add(Attributes.FOLLOW_RANGE,         40.0)
        .add(Attributes.KNOCKBACK_RESISTANCE, 0.8);
}

// WildFireDragon — переопределяет часть значений
public static AttributeSupplier.Builder createAttributes() {
    return BaseDragon.createAttributes()
        .add(Attributes.MAX_HEALTH,    140.0)  // было 120
        .add(Attributes.ATTACK_DAMAGE,  20.0); // было 18
}
```

Метод add() на билдере перезаписывает значение, если атрибут уже добавлен.

---

## Паттерн AI Goals

Все дикие драконы используют одинаковый набор целей, зарегистрированных в registerGoals():

```java
@Override
protected void registerGoals() {
    // goalSelector — цели поведения (что делать)
    this.goalSelector.addGoal(1, new FloatGoal(this));
    this.goalSelector.addGoal(2, new DragonAttackGoal(this, 1.0, true));
    this.goalSelector.addGoal(3, new DragonMeleeGoal(this, 1.2, false));
    this.goalSelector.addGoal(7, new WaterAvoidingRandomStrollGoal(this, 1.0));
    this.goalSelector.addGoal(8, new LookAtPlayerGoal(this, Player.class, 8f));
    this.goalSelector.addGoal(9, new RandomLookAroundGoal(this));

    // targetSelector — кого атаковать
    this.targetSelector.addGoal(1, new HurtByTargetGoal(this));
    this.targetSelector.addGoal(2, new NearestAttackableTargetGoal<>(this, Player.class, true));
}
```

Меньший номер = выше приоритет. FloatGoal (1) всегда активен в воде.

---

## Система данных (SynchedEntityData)

TamableDragon и DragonEggEntity синхронизируют данные клиент-сервер через SynchedEntityData:

```java
// Определение ключа
private static final EntityDataAccessor<Boolean> TAMED =
    SynchedEntityData.defineId(TamableDragon.class, EntityDataSerializers.BOOLEAN);

// Регистрация в defineSynchedData()
@Override
protected void defineSynchedData(SynchedEntityData.Builder builder) {
    super.defineSynchedData(builder);
    builder.define(TAMED, false);  // начальное значение
}

// Чтение/запись
public boolean isTamed() { return this.entityData.get(TAMED); }
public void setTamed(boolean v) { this.entityData.set(TAMED, v); }
```

Данные автоматически синхронизируются с клиентом при изменении.

---

## Сохранение данных (NBT → ValueInput/ValueOutput)

В 1.21.11 устаревший CompoundTag заменён на ValueInput/ValueOutput:

```java
@Override
public void addAdditionalSaveData(ValueOutput tag) {
    super.addAdditionalSaveData(tag);
    tag.putBoolean("Tamed", isTamed());
    tag.putString("DragonType", getDragonType());
}

@Override
public void readAdditionalSaveData(ValueInput tag) {
    super.readAdditionalSaveData(tag);
    setTamed(tag.getBooleanOr("Tamed", false));
    tag.getString("DragonType").ifPresent(this::setDragonType);
}
```

---

## Поток спавна и вылупления

```
Нижний мир/снежный биом/тёмный биом/горы
    ↓  (JSON biome modification → fabric:add_spawn_entries)
WildFireDragon / WildIceDragon / WildShadowDragon / WildStormDragon спавнится
    ↓  (убит игроком)
Лут-таблица: 2-5 чешуй + 50% шанс dragon_egg (предмет)
    ↓  (использование предмета dragon_egg)
DragonEggEntity размещается в мире
    ↓  (72 000 тиков = 1 час реального времени при нормальной скорости)
TamableDragon вылупляется (тип наследуется от яйца)
```
