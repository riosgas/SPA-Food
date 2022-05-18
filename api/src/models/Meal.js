const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('meal', {
    name: {
      primaryKey: true,
      type: DataTypes.STRING
    }
  });
};
