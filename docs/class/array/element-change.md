# Изменение элемента напрямую

Изменение элемента напрямую, по типу

```js
this.arr[1] = 'something else';
```

изначально не реактивно. Vue предлагает использовать конструкцию

```js
Vue.set(<arr>, <index>, <value>);
```

для изменения элементов массива. В целом ситуация такая же как и в объекте при [добавлении нового поля](/class/object/new-field).

::: tip
Даже если вы **не** будете использовать свойство в компоненте, а будете просто использовать класс напрямую, то конструкция `Vue.set` все равно не повредит и ничего не поломает, и отработает корректно, заменив значение.
:::

### Класс

<<< @/src/services/examples/ChangeElementArray.js{7}

### Компонент

<<< @/docs/.vuepress/components/ChangeElemArrOne.vue{6,17}

### Результат

<change-elem-arr-one />
<change-elem-arr-two />