# Примитивное свойство

Если передать примитивное свойство в виде примитива, то реактивность у нас не получится обеспечить. Я решила воспользоваться тем, что объекты - это ссылки, и попробовала обернуть примитив в объект, и это сработало.

Я вдохновлялась функцией `ref`, предоставляемой во Vue 2. [Docs](https://vuejs.org/api/reactivity-core.html#ref)

## Изменение через компонент

### Класс

<<< @/src/services/examples/PrimitiveProperty.js{2-4}

### Компоненты

**PrimitivePropertyOne**

<<< @/docs/.vuepress/components/PrimitivePropertyOne.vue{4,15,20}

**PrimitivePropertyTwo**

<<< @/docs/.vuepress/components/PrimitivePropertyTwo.vue{4}

### Результат

<primitive-property-one />
<primitive-property-two />

## Изменение через метод

Чтобы сохранился контекст класса, при передаче метода его нужно забиндить на класс

### Класс

<<< @/src/services/examples/PrimitivePropertyWithMethod.js{6-8}

### Компонент

::: warning
Обратите внимание на то, что метод встраивается в секцию `data`, это связано с уничтожением инстансов (об этом подробнее в секции [Использование](/usage/))
:::

<<< @/docs/.vuepress/components/PrimitivePropertyThree.vue{5,16}

### Результат

<primitive-property-three />
<primitive-property-four />