const path = require('path');

module.exports = {
  title: 'Vue 2 Services',
  description: 'Интеграция классов с Vue 2',
  themeConfig: {
    repo: 'https://github.com/Marcelinka/vue2-services',
    displayAllHeaders: true,
    searchPlaceholder: 'Найти...',
    lastUpdated: 'Обновлено',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Класс', link: '/class/object/static-fields' },
      { text: 'Использование', link: '/usage/' }
    ],
    sidebar: [
      {
        title: 'Класс',
        collapsable: false,
        children: [
          {
            title: 'Объект',
            children: [
              '/class/object/static-fields',
              '/class/object/new-field'
            ],
          },
          {
            title: 'Примитив',
            children: [
              '/class/primitive/property',
              '/class/primitive/private',
              '/class/primitive/validated'
            ],
          },
        ]
      },
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@example-services': path.resolve(__dirname, '../../src/services/examples'),
      }
    }
  }
}