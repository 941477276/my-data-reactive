import { defineReactive } from './defineReactive';
import { observe } from './observe';
import { arrayMethodsObj } from './array';
import { def } from './def';
import Dep from './Dep';

/**
 * Observer类的作用：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object，并个该对象添加__ob__属性
 */
export default class Observer{
  constructor (value) {
    this.value = value;
    // 每一个Observer的实例身上，都有一个dep
    this.dep = new Dep();
    // 给对象添加 __ob__ 属性
    def(value, '__ob__', this, false);

    if (Array.isArray(value)) {
      // 修改数组的原型对象为arrayMethodsObj，arrayMethodsObj里面有7个数组的方法被改写过，因此这里相当于改写了数组的7个方法
      Object.setPrototypeOf(value, arrayMethodsObj);
      this.observeArray(value);
    }else{
      this.walk(value);
    }
  }

  // 处理对象，将对象中的每一个属性都转换成响应式的
  walk (obj) {
    for (let attr in obj) {
      defineReactive(obj, attr);
    }
  }

  // 处理数组，将数组中的每一项都转换成响应式的，如果数组中的项不是对象，observe函数里有处理
  observeArray (array) {
    array.forEach(item => {
      observe(item);
    });
  }
}
