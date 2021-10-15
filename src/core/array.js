import { def } from './def';

const arrayPrototype = Array.prototype;
// 以数组的原型为基础创建一个对象，该对象将会被需要设置为响应式的数组使用
export const arrayMethodsObj = Object.create(arrayPrototype);


// 数组需要被改写的方法，由于Object.defineProperty无法为数组设置set、get，因此数组想要实现响应式的话就必须改下它们的方法
const needReplaceMethods = [
  'shift',
  'unshift',
  'pop',
  'push',
  'splice',
  'sort',
  'reverse'
];

// 修改数组的7个方法
needReplaceMethods.forEach((methodName) => {
  // 获取数组原来的方法
  let originMethod = arrayPrototype[methodName];
  def(arrayMethodsObj, methodName, function () {
    // 恢复这些方法原来的功能
    let result = originMethod.apply.call(this, arguments);

    // 获取存储在数组中的Observe对象，由于在使用Observe的时候数组不会在最顶层，所以这里一定会有__ob__属性
    let ob = this.__ob__;

    let args = [...arguments];

    // push、unshift、splice这3个方法都可以给数组插入新元素，这些插入的新元素也需要转换成响应式的
    let inserted = [];
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if(inserted){
      ob.observeArray(inserted);
    }

    ob.dep.notify();

    return result;
  }, false);
});
