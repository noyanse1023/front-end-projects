# 依赖
1. npx create-react-app cloud-doc
2. npm install electron --save-dev
3. npm install electron-is-dev --save-dev // 是否是开发环境
4. npm install concurrently —-save-dev
5. npm install wait-on —-save-dev
6. npm install cross-env —-save-dev // 启动不打开浏览器
同时运行两条命令
”dev”: “concurrently \“wait-on http://loaclhost:3000 && electron .\”  \“cross-env BROWSER=none npm start\”
7. npm install bootstrap --save
`import 'bootstrap/dist/css/bootstrap.min.css`
# 配置package.json:
```
"main": "main.js"
"script": {
  ”dev”: “concurrently \“wait-on http://loaclhost:3000 electron .\”  \“cross-env BROWSER=none npm start\”

  "concurrently "electron ." "npm start" " 要转义哦
}
```

# useRef
在不同的渲染之间记住之前渲染的值
```
// 每次渲染 num都会重置，但useRef不会
const foo = () => {
  let num = 1
  num++
  console.log(num)
}
```
使用useRef, 数字会累加哦～
current 每次在渲染中都会保留下来, 通过获取dom节点的方式
```
const foo = () => {
  let num = useRef(1)
  num.current++
  console.log(num.current)
}
```
# input设置focus也是一个副作用

# 选择一个图标库，现在流行inline svg图标库
```
npm i bootstrap-icons
```

# 类型检查
`npm install --save prop-types`

#  自定义hook
键盘事件 useKeyPress.js


