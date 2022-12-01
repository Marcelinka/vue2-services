# Запрет на изменение

Общий принцип такой же, запретить изменения можно с помощью Proxy, как мы делали с [примитивом](/class/primitive/private). Но с небольшим отличием, Vue должен иметь возможность установить свойство `__proto__`.

### Класс

<<< @/src/services/examples/ReadonlyArray.js{8-12,15,21}

### Компонент

<<< @/docs/.vuepress/components/ReadonlyArrayOne.vue{26}

### Результат

<readonly-array-one />
<readonly-array-two />