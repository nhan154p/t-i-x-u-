const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 8000;

// Get local IP
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const LOCAL_IP = getLocalIP();

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
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    console.log(`📍 ${req.method} ${req.url} - ${req.socket.remoteAddress}`);

    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Không tìm thấy</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0e27; color: #fff; }
                            h1 { color: #ff6b6b; }
                            a { color: #ffd700; text-decoration: none; }
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
                res.end('❌ Lỗi server: ' + err.toString());
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════╗
║  🎲 TÀI XỈU LIVE - SERVER CÔNG KHAI      ║
╚═══════════════════════════════════════════╝

🌐 Truy cập tại:
   • Local: http://localhost:${PORT}
   • LAN:   http://${LOCAL_IP}:${PORT}
   
📱 Chia sẻ link cho bạn bè:
   http://${LOCAL_IP}:${PORT}

💡 Quy tắc firewall:
   - Windows: Cho phép port ${PORT}
   - Mac/Linux: sudo ufw allow ${PORT}/tcp

⚠️  Để dừng: Nhấn Ctrl+C

✅ Server đang chạy...
    `);
});

// Handle errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} đã được sử dụng!`);
        console.log(`💡 Thử port khác: PORT=3000 node server.js`);
        process.exit(1);
    } else {
        console.error('❌ Server error:', err);
    }
});
