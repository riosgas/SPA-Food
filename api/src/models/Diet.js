const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('diet', {
    name: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    }
  });
};
