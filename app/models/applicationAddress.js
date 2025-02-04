'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ApplicationAddress.belongsTo(models.Application, {
        foreignKey: 'applicationId',
        as: 'application'
      })
    }
  }
  ApplicationAddress.init({
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    town: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'ApplicationAddress'
  });
  return ApplicationAddress;
};