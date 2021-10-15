import Observer from './Observer';

/**
 * 快捷的将一个对象转换成响应式对象，并返回Observer对象实例
 * @param value
 * @returns {Observer|*}
 */
export function observe(value){
  if(typeof value !== 'object'){
    return;
  }
  if(value.__ob__){
    return value.__ob__;
  }else {
    return new Observer(value);
  }
}
