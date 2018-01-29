# layer
常用组件方法

###### 1. 介绍，组件为pc和移动端通用，会调用不同的样式，主要有五个常用组件
toast, confirm, prompt, content, loading


###### 2. 使用方法
引用layer.js, 全局会有一个layer变量，然后调用上述的5个方法


###### 3. 传参介绍

toast，可以传入字符串或者dom字符串，如果是dom字符串请自行书写样式
layer.toast('我是提示')
layer.toast('<div>我是提示</div>')

confirm, 类似原生的alert事件，可以传入字符串或者dom字符串，如果是dom字符串请自行书写样式
layer.confirm('我是提示')
layer.confirm('<div>我是提示</div>')

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
```

loading, 包含startLoading和endLoading方法
```
layer.startLoading()
setTimeout(function () {
  layer.endLoading()
}, 2000)
```


###### 4. 如何使用可查看demo.html，本组件可定制的并不多，主要是为了使用方便，如果有更多需求，根据使用频率进行通用传参。
