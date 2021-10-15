/*
import {defineReactive} from './core/defineReactive';

let obj = {}

defineReactive(obj, 'aa', '张三')
console.log(111);
console.log(obj.aa);
obj.aa = '李四'
console.log(obj.aa);
*/

import Observer from './core/Observer'
import { observe } from './core/observe';
import Watcher from './core/Watcher';

/*
let obj = {
  name: '张三',
  age: 24,
  a: {
    b: {
      c: 20
    }
  },
  scores: [
    {name: '语文', score: 78},
    {name: '数学', score: 88},
    {name: '英语', score: 98}
  ],
  hobby: ['学习', '看电影']
};

/!*new Observer(obj);
console.log(obj);*!/


observe(obj)
console.log(obj);
console.log(obj.name);
obj.name = 'aaa';
console.log(obj.a.b.c);
console.log(obj.scores[0].score);
obj.scores[1].score = 92;
*/

let obj = {
  a: 1,
  b: 2
};

observe(obj);
new Watcher(obj, 'a', function (newVal, oldVal) {
  console.log('属性a变化了，新值为：', newVal);
});

setTimeout(() => {
  console.log('1.5秒到，修改a属性');
  obj.a = 'aaa';
  obj.b = 213
}, 1500);
