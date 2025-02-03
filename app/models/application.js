'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.hasOne(models.ApplicationAddress, {
        foreignKey: 'application_id',
        as: 'address'
      })
    }
  }
  Application.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Application'
  });
  return Application;
};