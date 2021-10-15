/**
 * 给对象定义一个属性
 * @param obj
 * @param key
 * @param value
 * @param enumerable
 */
export function def(obj, key, value, enumerable){
  Object.defineProperty(obj, key, {
    value,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
