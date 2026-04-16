// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dragons Mod',
  tagline: 'Документация разработчика — Minecraft 1.21.11 Fabric',
  favicon: 'img/favicon.ico',

  url: 'http://localhost:4000',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  plugins: [
    function webpackHmrFix() {
      return {
        name: 'webpack-hmr-fix',
        configureWebpack(config, isServer) {
          if (isServer) return {};
          const webpack = require('webpack');
          return {
            plugins: [new webpack.HotModuleReplacementPlugin()],
            devServer: {
              client: {
                webSocketURL: {
                  hostname: 'localhost',
                  port: 4000,
                  protocol: 'ws',
                },
              },
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: ({
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Dragons Mod',
      logo: {
        alt: 'Dragons Mod',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Документация',
        },
        {
          href: 'https://docs.fabricmc.net/',
          label: 'Fabric Docs',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Документация',
          items: [
            { label: 'Архитектура', to: '/docs/architecture' },
            { label: 'Сущности', to: '/docs/entities/base-dragon' },
            { label: 'Предметы', to: '/docs/items/mod-items' },
            { label: 'API 1.21.11', to: '/docs/api-changes' },
          ],
        },
        {
          title: 'Ресурсы',
          items: [
            { label: 'Fabric Documentation', href: 'https://docs.fabricmc.net/' },
            { label: 'Fabric API GitHub', href: 'https://github.com/FabricMC/fabric-api' },
          ],
        },
      ],
      copyright: 'Copyright © 2025 SPA. Dragons Mod v1.0.0 — Minecraft 1.21.11',
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['java', 'gradle', 'json', 'bash'],
    },
  }),
};

module.exports = config;
