const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const sequelize = require('./config/database');
const db = require('./models').sequelize.models;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Sincronizar la base de datos
sequelize.sync().then(() => {

    console.log('Database synchronized');
    console.log('Score model:', db.Score);
    console.log('Player model:', db.Player);

    app.use(express.static('public'));
    app.set('view engine', 'ejs');

    // Rutas
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.post('/save-score', async (req, res) => {
        try {
            const { name, score, date } = req.body;
            const newScore = await db.Score.create({ name, score, date });
            res.json(newScore);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/get-scores', async (req, res) => {
        try {
            const scores = await db.Score.findAll({
                order: [['date', 'DESC']],
                limit: 10
            });
            res.json(scores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    server.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
