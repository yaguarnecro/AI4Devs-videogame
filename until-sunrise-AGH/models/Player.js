const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  time: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Player;