const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    steps: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};