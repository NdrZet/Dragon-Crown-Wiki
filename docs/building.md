---
id: building
title: Сборка мода
sidebar_label: Сборка
---

# Сборка мода

## Требования

| Инструмент | Версия |
|-----------|--------|
| Java | 21 |
| Gradle | 8.x |
| Fabric Loader | >= 0.18.4 |
| Fabric API | Совместимая с MC 1.21.11 |

---

## Настройка окружения

### 1. Клонирование

```bash
git clone <url> Dragons_mod
cd Dragons_mod
```

### 2. Генерация исходников

```bash
./gradlew genSources
```

---

## Команды

```bash
./gradlew build       # сборка .jar
./gradlew runClient   # клиент
./gradlew runServer   # сервер
./gradlew clean       # очистка
```

Результат: `build/libs/dragons_mod-<version>.jar`

---

## build.gradle

```gradle
dependencies {
    minecraft "com.mojang:minecraft:1.21.11"
    mappings loom.officialMojangMappings()
    modImplementation "net.fabricmc:fabric-loader:${project.loader_version}"
    modImplementation "net.fabricmc.fabric-api:fabric-api:${project.fabric_version}"
}
```

---

## fabric.mod.json

```json
{
  "schemaVersion": 1,
  "id": "dragons-mod",
  "version": "${version}",
  "name": "Dragons Mod",
  "authors": ["SPA"],
  "license": "CC0-1.0",
  "environment": "*",
  "entrypoints": {
    "main": ["com.spa.dragons.DragonMod"],
    "client": ["com.spa.dragons.DragonModClient"]
  },
  "depends": {
    "fabricloader": ">=0.18.4",
    "minecraft": "~1.21.11",
    "java": ">=21",
    "fabric-api": "*"
  }
}
```

---

## Установка

1. ./gradlew build
2. Копируй .jar в mods/
3. Fabric Loader >= 0.18.4 + Fabric API

---

## Ошибки сборки

| Ошибка | Причина | Решение |
|--------|---------|----------|
| MobEffects.MOVEMENT_SLOWDOWN | Переименован | MobEffects.SLOWNESS |
| does not override method | Сигнатура | Проверить исходники |
| FabricEntityTypeBuilder deprecated | Устарел | FabricEntityType.Builder |
| hurtServer() weaker access | public | Убрать protected |

Подробнее: [Изменения API](./api-changes).
