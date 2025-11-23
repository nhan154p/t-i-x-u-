const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
    console.log(`📍 Request: ${req.url}`);

    // Default to index.html
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 Not Found</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; }
                            h1 { color: #ff6b6b; }
                        </style>
                    </head>
                    <body>
                        <h1>❌ 404 - File không tìm thấy</h1>
                        <p>Đường dẫn: ${req.url}</p>
                        <a href="/">← Về trang chủ</a>
                    </body>
                    </html>
                `, 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.toString());
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
            console.log(`✅ Served: ${filePath}`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════╗
║  🎲 TÀI XỈU PREMIUM - TEST SERVER    ║
╚══════════════════════════════════════╝

🌐 Server đang chạy tại:
   http://localhost:${PORT}

📁 Thư mục: ${__dirname}

⚠️  Nhấn Ctrl+C để dừng server

🎮 Sẵn sàng để chơi!
    `);
});
