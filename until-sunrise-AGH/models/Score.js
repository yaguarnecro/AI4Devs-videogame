// models/Score.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Score = sequelize.define('Score', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Score;