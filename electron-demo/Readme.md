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