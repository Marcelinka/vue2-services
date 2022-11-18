import ServiceDi, { getInstanceFactory, destroyFactory } from '@/lib/ServiceDi';
import { dataFactory, methodsFactory } from '@/lib/serviceInComponent';

class Calculator extends ServiceDi {
  /**
   * Приватное свойство
   * Не подразумевается, что его нужно будет читать извне
   * 
   * Может храниться как примитив
   */
  _showedResult = false;

  /**
   * Приватное свойство, хранящее в себе примитив
   * Подразумевается, что мы будем его передавать в компонент
   * 
   * К сожалению, примитивы сами по себе не очень хорошо дружат с реактивностью,
   * но оборачивая его в объект и передавая ссылку мы можем добиться реактивности
   * 
   * Я вдохновлялась функцией `ref` из vue 3
   * 
   * @see https://vuejs.org/api/reactivity-core.html#ref
   * 
   * На практике я поняла, что хранить даже приватное свойства внутри класса в виде
   * примитива, а отдавать его в геттере уже в конструкции `{ value: this._operation }`
   * не получится, в следующий раз уже создадится новый объект, и реактивность не будет
   * работать
   */
  _operation = {
    value: '',
    /**
     * Это аналог `computed` для одного свойства, либо для нескольких,
     * если они объединены в один объект
     * 
     * Для него нельзя создавать алиас, по типу
     * this.someOtherProp = this.operation.withSpaces
     * иначе оно не будет работать
     * 
     * Если вы не понимаете, как это работает, то советую прочитать книгу про контекст
     * @see https://kbpsystem777.github.io/You-Dont-Know-JS/this&object-prototypes/ch1.html
     * 
     * @example
     * <template>
     *  <div>{{ operation.withSpaces }}</div>
     * </template>
     * <script>
     * import ..
     * export default {
     *  ..
     *  data() {
     *    ...calculatorData(['operation']),
     *    ..
     *  },
     *  ..
     * }
     * </script>
     */
    get withSpaces() {
      return String(this.value).replace(/\+/g, ' + ');
    }
  };

  /**
   * Алиас для приватного свойства
   * 
   * Мы можем спокойно передавать само свойство без алиаса, но тогда
   * любой компонент принимающий это свойство сможет изменить его собственноручно
   * 
   * Если вы хотите запретить изменение, или добавить валидатор, то необходимо сделать алиас
   */
  get operation() {
    /**
     * Вся магия происходит из-за оборачивания свойства в Proxy
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
     * 
     * Именно с помощью перехватывания `set`, можно либо запретить изменение, либо отвалидировать
     * В данном случае ф-я `set` выкидывает exception с описанием ошибки, но также можно
     * просто вернуть `false` из функции (также будет ошибка, просто без толкового описания)
     */
    return new Proxy(this._operation, {
      set() {
        throw new Error('This property is read-only')
      }
    });
  }

  /**
   * Публичный метод, здесь ничего необычного, реактивность сработает
   * засчет того, что мы отдаем в компонент ссылку на объект
   */
  addSymbolToOperation(s) {
    if (this._showedResult) {
      this._operation.value = '';
      this._showedResult = false;
    }

    this._operation.value += s;
  }

  calculateResult() {
    this._operation.value = eval(this.operation.value);
    this._showedResult = true;
  }

  /**
   * Приватное свойство-примитив
   * Подразумевается, что его будут изменять снаружи
   */
  _resultCounter = {
    value: 0,
  }

  // Алиас для приватного свойства, чтобы добавить валидатор
  get resultCounter() {
    return new Proxy(this._resultCounter, {
      set(obj, prop, value) {
        // Запрещаем добавление новых полей
        if (prop !== 'value') {
          throw new Error('Only accesible property is "value"');
        }

        // Запрещаем записывать НЕ число
        if (!Number.isInteger(value)) {
          throw new TypeError('Value must be integer');
        }

        // Проводим операцию присваивания
        obj[prop] = value;

        // Сигнализируем, что ошибки не возникло
        return true;
      }
    })
  }

  /**
   * Публичное свойство массив, реактивность работает безупречно сама по себе
   * Проверено в версии vue 2.7.14
   * Если вы не хотите запрещать изменение массива извне, достаточно просто создать массив
   * 
   * Важно отметить, что даже если вы разрешаете изменение извне, оно должно
   * работать по тем же правилам, что описаны в комментарии перед методом `setNewSymbols`,
   * т.е. использовать только мутирующие сам массив методы, без перезаписывания ссылки
   * Иначе связь с сервисом потеряется
   * 
   * Но проще просто все операции изменения проводить внутри сервиса, где и хранить
   * такую неприглядную логику
   * 
   * Если хочется пользоваться НЕмутирующими методами и перезаписывать массив,
   * то стоит обернуть его в объект с property value, как мы делали с примитивами
   */
  _symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-'];

  /**
   * С запретом изменения становится интересно, для того чтобы работала реактивность
   * vue должен иметь возможность установить свойство `__proto__`
   */
  get symbols() {
    return new Proxy(this._symbols, {
      set(obj, prop, value) {
        // Даем возможность vue установить `__proto__` для реактивности
        if (prop === '__proto__') {
          obj[prop] = value;

          return true;
        }

        // Запрещаем любые остальные изменения
        return false;
      },
    });
  }

  addSymbolToButtons(s) {
    this._symbols.push(s);
  }

  /**
   * Реактивность массивов работает засчет ссылки, если нам нужно полностью
   * пересоздать массив, мы не можем просто заменить его `this._symbols = []`
   * 
   * Чтобы реактивность продолжала работать, мы можем использовать только
   * методы, мутирующие сам массив. Если таких методов недостаточно, то
   * стоит создать объект-обертку для того чтобы ссылаться на ссылку-объект,
   * которая не меняется
   */
  setNewSymbols() {
    // Удаляем все элементы
    this._symbols.length = 0;
    // Добавляем новые
    for (const s of ['8', '5', '6', '+']) {
      this._symbols.push(s);
    }
  }

  /**
   * Аналог computed для нескольких свойств, фишка опять же в том, что мы возвращаем объект,
   * что позволяет ссылаться на ссылку и засчет этого работает реактивность
   * 
   * Переменные, которые вам необходимо отслеживать, нужно добавить в свойства объекта
   * Как вы видите я добавила сразу алиасы, что продолжает запрещать прямое изменение
   * наших ссылок
   * 
   * Само вычисляемое значение я положила в геттер `value`
   * 
   * Обращаю ваше внимание, что `this` при правильном использовании будет означать
   * объект, который мы возвращаем из геттера
   * 
   * О том, почему это так работает, можете прочитать в книге
   * @see https://kbpsystem777.github.io/You-Dont-Know-JS/this&object-prototypes/ch1.html
   * 
   * Мы не можем вернуть сразу наше значение, т.к. оно будет строкой и реактивность
   * тогда работать не будет
   */
  get symbolsWithOperation() {
    return {
      symbols: this.symbols,
      operation: this.operation,
      get value() {
        return this.symbols.join() + this.operation.value;
      }
    };
  }
};

/**
 * Это простенький DI, позволяющий получать один и тот же экземпляр,
 * но при этом создавать его только тогда, когда он действительно нужен
 */
const getInstance = getInstanceFactory(Calculator);

const PUBLIC_PROPERTY_NAMES = [
  'operation',
  'resultCounter',
  'symbols',
  'symbolsWithOperation',
];
const calculatorData = dataFactory(getInstance, PUBLIC_PROPERTY_NAMES);

const PUBLIC_METHODS_NAMES = [
  'addSymbolToOperation',
  'calculateResult',
  'addSymbolToButtons',
  'setNewSymbols',
];
/**
 * Методы надо встраивать тоже в секцию `data`, иначе при
 * уничтожении экземпляра и создании нового связь теряется
 * 
 * Практикой было установлено, что `data` пересоздается после unmount компонента,
 * а вот методы нет, и они продолжают указывать на старый экземпляр
 */
const calculatorMethods = methodsFactory(getInstance, PUBLIC_METHODS_NAMES);

const destroyCalculator = destroyFactory(Calculator);

export { calculatorData, calculatorMethods, destroyCalculator };