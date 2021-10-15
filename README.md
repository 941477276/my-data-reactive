# Vue数据响应式原理
+ 使用`Object.defineProperty`为data中的每一个属性都设置`getter`、`setter`，并为每个属性都创建一个Dep
  依赖收集对象，然后在`getter`中收集依赖，在`setter`中通知依赖更新
+ 使用`Watcher`观察data中的每一个属性，当外部修改了data中的属性时`setter`函数中的依赖就会通知更新，
此时会调用`Watcher`的`udpate`方法，`udpate`方法中会获取属性的最新值，然后与旧值去对比，如果不相同则触发
回调
