import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    emoji: '🏗️',
    title: 'Архитектура',
    description: 'Структура мода, пакеты, точки входа Fabric и система регистрации сущностей.',
    link: '/docs/architecture',
  },
  {
    emoji: '🐲',
    title: 'Сущности',
    description: 'BaseDragon, WildFireDragon, WildIceDragon, WildShadowDragon, WildStormDragon, TamableDragon, DragonEggEntity.',
    link: '/docs/entities/base-dragon',
  },
  {
    emoji: '🤖',
    title: 'AI Goals',
    description: 'DragonMeleeGoal, DragonFlyGoal, DragonFireballGoal, DragonFollowOwnerGoal и другие цели поведения.',
    link: '/docs/ai/goals',
  },
  {
    emoji: '🛡️',
    title: 'Предметы',
    description: 'Чешуя дракона, яйцо дракона, броня из чешуи, рог дракона и крафт.',
    link: '/docs/items/mod-items',
  },
  {
    emoji: '📦',
    title: 'Данные и ресурсы',
    description: 'Лут-таблицы, спавн в биомах, рецепты крафта, локализация.',
    link: '/docs/data/loot-tables',
  },
  {
    emoji: '⚠️',
    title: 'API 1.21.11',
    description: 'Изменения Fabric API: FabricEntityType.Builder, hurtServer(), официальные маппинги.',
    link: '/docs/api-changes',
  },
];

function FeatureCard({ emoji, title, description, link }) {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.cardEmoji}>{emoji}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.dragonIcon}>🐉</div>
          <h1 className={styles.heroTitle}>Dragons Mod</h1>
          <p className={styles.heroSub}>Документация разработчика — Minecraft 1.21.11 Fabric</p>
          <div className={styles.badges}>
            <span className={styles.badge}>Mod v1.0.0</span>
            <span className={styles.badge}>MC 1.21.11</span>
            <span className={styles.badge}>Fabric API</span>
            <span className={styles.badge}>Java 21</span>
          </div>
          <div className={styles.heroButtons}>
            <Link className={styles.btnPrimary} to="/docs">
              Открыть документацию
            </Link>
            <Link className={styles.btnSecondary} to="/docs/api-changes">
              API 1.21.11
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
