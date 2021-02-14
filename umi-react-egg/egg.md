# egg.js
## 安装
```
mkdir egg
npm init egg --type=simple // 生成基本的项目模版
```
## node进程
1. child_process
  exec() 创建子进程
  spawn() 创建子进程 返回流
    ```
    const { exec， spawn } = require(child_process)
    exec('cat a.js', (error, stdout, stderr) => {
      console.log(error)
    })

    const ls = spawn('ls', ['-a'], { encoding: 'utf8' })
    ls.stdout.on('data', data => {
      // 正确
    })
    ls.stderr.on('data', data => {
      // 错误
    })
    ls.on('close', code => {
      // 关闭
    })
    ```
2. cluster
```
const cluster = require('cluster')
const http = require('http')
const os = require('os')

const cpulens = os.cpus().length
if (cluster.isMaster) {
  console.log('主进程' + process.pid + '正在运行')
  // 衍生工作进程
  cpus.forEach(() => {
    cluster.fock()
  })
} else {
  // 工作进程可以共享任何tcp连接
  // 这里共享一个http服务器
  http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-type': 'text/html;charset=utf-8',
    })
    res.write('hello')
    res.end()
  }).listen(8000)
  console.log('工作进程', procress.pid, '已经启动')
}
```
## 子进程与主进程通信
child.js:
```
procress.on('message', msg=> {
  // 来自master
})
```
master.js:
```
const { fork } = require('child_procress')
const child = fork('./child.js')
child.on('message', msg => {
  // 来自子进程
})
```