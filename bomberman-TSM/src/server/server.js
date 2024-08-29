const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000; // Cambiamos el puerto a 3000 o al proporcionado por el entorno

// Añadir middleware para configurar CSP
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; connect-src 'self' ws: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; worker-src 'self' blob:;"
    );
    next();
});

// Servir archivos estáticos desde la carpeta public
app.use('/static', express.static(path.join(__dirname, '../../public')));

// Añadir configuración para servir imágenes y otros assets
app.use('/assets', express.static(path.join(__dirname, '../../public/assets')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../public/index.html'));
});

server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado');
});

const newFunction = () => {
    console.log("This is a new function.");
};