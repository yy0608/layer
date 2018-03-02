###### 1. 介绍，组件为pc和移动端通用，会调用不同的样式，主要有五个常用组件
toast, confirm, prompt, content, loading


###### 2. 使用方法
引用layer.js, 全局会有一个layer变量，然后调用上述的5个方法


###### 3. 传参介绍

toast，可以传入字符串或者dom字符串，如果是dom字符串请自行书写样式
```
layer.toast('我是提示')
layer.toast('<div>我是提示</div>')
```

confirm, 类似原生的alert事件，可以传入字符串或者dom字符串，如果是dom字符串请自行书写样式
```
layer.confirm('我是提示')
layer.confirm('<div>我是提示</div>')
```

prompt, 可以传入字符串或者dom字符串，如果是dom字符串请自行书写样式。回调会返回一个bool值，告诉程序用户点击了哪个
```
layer.prompt('确认删除？', function (res) {
  if (res) {
    console.log('点击了确认')
  } else {
    console.log('点击了取消')
  }
})
```

content, 可以传入字符串或者包含内容和宽高的对象
```
layer.content('我是内容')
layer.content('<div>我是内容</div>')
layer.content({
  content: '<div>我是内容</div>',
  width: '60%',
  height: '300px'
})
layer.contentRemove()
```

loading, 包含startLoading和endLoading方法，参数包含text，mask，默认不带蒙层
```
layer.startLoading()
layer.startLoading({
  text: '加载中...',
  mask: true
})
setTimeout(function () {
  layer.endLoading()
}, 2000)
```


###### 4. 如何使用可查看demo.html，本组件可定制的并不多，主要是为了使用方便，如果有更多需求，根据使用频率进行通用传参。

###### 18-02-09，加入contentRemove方法
###### 18-02-09，加入input法
```
yjyLayer.input({
  title: '输入',
  callback: function (res) {
    console.log(res)
  }
})

yjyLayer.input({
  title: '请输入内容',
  inputs: [{
    label: '姓名',
    name: 'name'
  }, {
    label: '年龄',
    name: 'age'
  }],
  callback: function (res) {
    console.log(res)
  }
})
```
###### 18-02-09，加入确认和取消按钮的文字，分别加入确认和取消的回调方法
```
yjyLayer.input({
  title: '请输入内容',
  confirmText: '确认的文字',
  cancelText: '取消的文字',
  inputs: [{
    label: '姓名',
    name: 'name'
  }, {
    label: '年龄',
    name: 'age'
  }, {
    label: '学校',
    name: 'school'
  }],
  callback: function (res) { // 所有的回调
    console.log(res)
  },
  confirm: function (res) { // 点击确认
    console.log('confirm', res)
  },
  cancel: function (res) { // 点击取消
    console.log('cancel', res)
  }
})
```
###### 18-02-26, 完善其他接口的传参，加入了回调函数，参考demo.html的注释代码
###### 18-02-26, 添加input接口的radio和checkbox参数，判断是否必填
###### 18-03-01, 加入默认值和hidden域，加入动效
###### 18-03-02, 加入textarea和lableWidth
