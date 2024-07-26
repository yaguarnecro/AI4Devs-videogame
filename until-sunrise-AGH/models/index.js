const sequelize = require('../config/database');
const { Score } = require('./score');
const { Player} = require('./player');

const db = {
  sequelize,
  Score,
  Player
};

module.exports = db;