import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'abd'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'd41'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'ccf'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'af3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai/goals',
                component: ComponentCreator('/docs/ai/goals', '4d1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/api-changes',
                component: ComponentCreator('/docs/api-changes', '965'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/architecture',
                component: ComponentCreator('/docs/architecture', '52f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/building',
                component: ComponentCreator('/docs/building', 'fb1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/data/biome-spawning',
                component: ComponentCreator('/docs/data/biome-spawning', '678'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/data/localization',
                component: ComponentCreator('/docs/data/localization', '8fa'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/data/loot-tables',
                component: ComponentCreator('/docs/data/loot-tables', '9a3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/data/recipes',
                component: ComponentCreator('/docs/data/recipes', 'cb3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/entities/base-dragon',
                component: ComponentCreator('/docs/entities/base-dragon', '3fe'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/entities/egg-entity',
                component: ComponentCreator('/docs/entities/egg-entity', '452'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/entities/mod-entities',
                component: ComponentCreator('/docs/entities/mod-entities', '197'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/entities/tamable-dragon',
                component: ComponentCreator('/docs/entities/tamable-dragon', 'c75'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/entities/wild-dragons',
                component: ComponentCreator('/docs/entities/wild-dragons', '7f5'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/extending',
                component: ComponentCreator('/docs/extending', 'c56'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/items/armor-material',
                component: ComponentCreator('/docs/items/armor-material', '5e2'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/items/egg-item',
                component: ComponentCreator('/docs/items/egg-item', '73b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/items/horn-item',
                component: ComponentCreator('/docs/items/horn-item', '46e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/items/mod-items',
                component: ComponentCreator('/docs/items/mod-items', 'ba4'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
