const sequelize = require('./config/database');
const Player = require('./models/player');
const Score =  require('./models/score');

async function initDb() {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

initDb();