# Мутируемый массив

Под мутируемым массивом имеется в виду массив, для которого не требуется перезаписывание, т.е. методы а-ля `map`, `filter` и т.д.

С такими массивами достаточно просто работать. Их нужно просто передать, реактивность организует Vue.

### Класс

<<< @/src/services/examples/MutatedArray.js{2,6,10}

### Компонент

<<< @/docs/.vuepress/components/MutatedArrayOne.vue{5-7,17-19}

### Результат

<mutated-array-one />
<mutated-array-two />