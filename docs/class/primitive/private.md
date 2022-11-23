# Свойство только для чтения

Сделаем запрет на изменение в компоненте, разрешим менять свойство только через метод. Это можно реализовать, получая из компонента не само свойство напрямую, а его геттер, обернутый в `Proxy`, [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Класс

<<< @/src/services/examples/PrivatePrimitiveProperty.js{6-12}

::: tip
Необязательно выкидывать exception в `set`, достаточно просто вернуть `false`. В таком случае тоже будет ошибка, но без нормального описания.

```js
set() {
  return false;
}
```
:::

### Компоненты

**PrivatePrimitiveOne**

Попытка изменения напрямую через компонент вызовет ошибку

<<< @/docs/.vuepress/components/PrivatePrimitiveOne.vue{25}

**PrivatePrimitiveTwo**

Попытка изменения, вызванная через метод, отработает корректно

<<< @/docs/.vuepress/components/PrivatePrimitiveTwo.vue{6,17}

### Результат

<private-primitive-one />
<private-primitive-two />
