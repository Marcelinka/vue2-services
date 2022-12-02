# Валидация изменений

Валидация работает также как и в [примитиве](/class/primitive/validated) с помощью Proxy. Единственная деталь, что проверку свойства `__proto__` не производим по причинам, которые мы обсуждали в теме [запрета изменений в массиве](/class/array/readonly).

### Класс

<<< @/src/services/examples/ValidatedArray.js{8,14}

### Компонент

<<< @/docs/.vuepress/components/ValidatedArrayOne.vue

### Результат

<validated-array-one />
<validated-array-two />