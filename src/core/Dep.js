let uid = 0;
/**
 * 依赖收集类
 */
export default class Dep{
  constructor () {
    this.uid = uid++;
    this.subs = [];
    console.log('我是Dep类！');
  }
  // 添加订阅
  addSub(sub){
    this.subs.push(sub)
  }
  // 添加依赖
  depend(){
    /*
      Dep.target就是依赖，它本质是一个Watcher。Dep.target是一个全局的变量，用window.target也是一样的，但这里用Dep.target更方便些
      当我们给对象的某个属性设置值的时候Dep.target就会有值，当我们去读取这个对象的属性的时候就会将Dep.target添加进依赖中
     */
    if(Dep.target){
      this.addSub(Dep.target);
    }
  }
  // 通知更新
  notify(){
    console.log('通知更新');
    let subs = this.subs.slice();
    subs.forEach(watcher => {
      watcher.update();
    });
  }
}
