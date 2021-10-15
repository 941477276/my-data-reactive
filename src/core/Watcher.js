import Dep from './Dep';
let uid = 0;
/**
 * 监听对象的某个属性类
 */
export default class Watcher{
  /**
   * Watcher构造函数
   * 用法： new Watcher({a: {b: 123}}, 'a', (newVal, oldVal) => {console.log(newVal)})
   * 用法： new Watcher({a: {b: 123}}, 'a.b', (newVal, oldVal) => {console.log(newVal)})
   * @param target 要监听的对象
   * @param expression 要监听对象的属性的名称或者表达式
   * @param callback 回调函数
   */
  constructor (target, expression, callback) {
    this.uid = uid++;
    this.target = target;
    this.callback = callback;
    // 从target中获取expression属性值的一个函数
    this.getter = parsePath(expression);
    // 获取最新值
    this.value = this.get();
  }

  get(){
    // 进入依赖收集阶段
    Dep.target = this;
    console.log('进入依赖收集阶段', this);
    let value;
    try {
      value = this.getter(this.target);
    } finally {
      // 获取完值后就取消进入依赖收集阶段
      Dep.target = null;
      console.log('离开依赖收集阶段', this);
    }
    return value;
  }

  update(){
    this.run();
  }

  run(){
    this.getAndInvoke(this.callback);
  }

  // 获取最新值，并且执行回调函数
  getAndInvoke(cb){
    let value = this.get();
    // 如果值变化了，则执行回调
    if(value !== this.value || typeof value === 'object'){
      let oldVal = this.value;
      this.value = value;
      cb.call(this.target, value, oldVal);
    }
  }
}

/**
 * 解析访问对象属性的表达式，并返回一个获取该属性的函数
 * @param expression 访问对象属性的表达式，如：'a'、'a.b'、'a.b.c'
 * @returns {function(*=): *}
 */
function parsePath (expression) {
  let segments = expression.split('.');
  return (obj) => {
    for(let i = 0, len = segments.length; i < len; i++){
      if(!obj){
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  }
}
