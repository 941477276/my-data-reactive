import { observe } from './observe';
import Dep from './Dep';

/**
 * 给对象定义响应式的属性
 * 原理：Object.defineProperty给对象定义属性时虽然可以为这个属性设置set、get函数，但这两个函数并不能通过this去访问定义的属性（访问了会被无限调用），
 *      因此在set函数中就无法直接给这个属性设置值，也无法读取到这个值。此时我们可以使用一个变量来保存这个属性的值（闭包原理），读取对象属性的
 *      时候直接返回变量的值即可，修改值时将新值与旧值对比，如果一致则不做修改，不一致才做修改
 * @param obj 对象
 * @param key 需被定义的为响应式属性的名称
 * @param val 属性值
 * @param enumerable 属性是否可被枚举
 * @param configurable 属性是否可被改变或删除
 */
export function defineReactive (obj, key, val, enumerable = true, configurable = true) {
  if (typeof val === 'undefined') {
    val = obj[key];
  }
  // 这个dep是给对象的属性使用的，因为属性值改变后我们可能需要做某些事情（如更新界面），如果没有这个dep那么，属性值改变后我们就无法处理某些事情（如更新界面）
  let dep = new Dep();
  // 子元素也要进行响应式处理（这里有点像递归处理了，但这不是递归，而是循环调用）
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    configurable, // 可被改变或删除
    enumerable, // 可被枚举
    get () {
      console.log(`读取了${key}属性！`);
      // 如果全局范围内有依赖，则将其添加进当前的依赖中
      if(Dep.target){
        console.log('有依赖', Dep.target, dep);
        dep.depend();
        if(childOb){
          childOb.dep.depend();
        }
      }
      // 在get函数里不能通过 this[key] 的形式去访问这个属性，一旦访问则会无限触发get函数
      return val;
    },
    set (newVal) {
      if (newVal === val) {
        return;
      }
      console.log(`设置了${key}属性，值为：${newVal}！`);
      val = newVal;
      // 设置完值后需要通知依赖进行更新。如果不通知更新依赖，这个值改变后vue是不知道的，vue不知道这个值改变了那怎么更新界面呢？
      // 这里可以想象成在vue中我们修改了data中的某个属性值的时候，模板会立即更新，模板之所以能更新就依靠这里dep.notify
      dep.notify();
    }
  });
}
