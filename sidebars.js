/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '📋 Обзор проекта',
    },
    {
      type: 'doc',
      id: 'architecture',
      label: '🏗️ Архитектура',
    },
    {
      type: 'category',
      label: '🐲 Сущности',
      collapsed: false,
      items: [
        'entities/base-dragon',
        'entities/wild-dragons',
        'entities/tamable-dragon',
        'entities/egg-entity',
        'entities/mod-entities',
      ],
    },
    {
      type: 'category',
      label: '🤖 AI (Goals)',
      collapsed: false,
      items: ['ai/goals'],
    },
    {
      type: 'category',
      label: '🛡️ Предметы',
      collapsed: false,
      items: [
        'items/mod-items',
        'items/armor-material',
        'items/egg-item',
        'items/horn-item',
      ],
    },
    {
      type: 'category',
      label: '📦 Ресурсы и данные',
      collapsed: false,
      items: [
        'data/recipes',
        'data/loot-tables',
        'data/biome-spawning',
        'data/localization',
      ],
    },
    {
      type: 'doc',
      id: 'api-changes',
      label: '⚠️ API 1.21.11',
    },
    {
      type: 'doc',
      id: 'building',
      label: '🔨 Сборка',
    },
    {
      type: 'doc',
      id: 'extending',
      label: '➕ Расширение мода',
    },
  ],
};

module.exports = sidebars;
