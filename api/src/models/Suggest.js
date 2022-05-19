const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('suggest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meal: {
      type: DataTypes.STRING
    },
    diet: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });
};
