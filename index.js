const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 设置路由，根据不同的请求路径处理不同的请求
    if (req.url === '/' || req.url === '/index.html') {
        // 返回任务列表页面
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/tasks') {
        // 返回任务列表数据（假设数据存储在一个 JSON 文件中）
        fs.readFile(path.join(__dirname, 'tasks.json'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        // 返回404错误，表示请求的页面不存在
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// 启动服务器，监听端口3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
