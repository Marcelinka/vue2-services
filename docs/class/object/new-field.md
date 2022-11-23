# Добавление поля в объект

Если мы создадим объект в секции `data` и попытаемся добавить новое поле к объекту, то это не сработает. В таком случае фреймворк предлагает использовать особую конструкцию [docs](https://v2.vuejs.org/v2/guide/reactivity.html#For-Objects)

```js
Vue.set(<object_link>, '<prop_name>', <prop_value>)
```

Она также хорошо работает и в классе. В дальнейшем после добавления поля можно изменять значение как обычно.

```js
this.someObject.someAddedProp = 'new value';
```

### Класс

<<< @/src/services/examples/ObjectWithNewField.js{9}

### Компонент

Из компонента можно использовать конструкцию `this.$set`

<<< @/docs/.vuepress/components/NewFieldObjectOne.vue{23}

### Результат

<new-field-object-one />
<new-field-object-two />