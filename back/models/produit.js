'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      produit.hasMany(models.commande)
    }
  }
  produit.init({
    design: DataTypes.STRING,
    model: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'produit',
  });
  return produit;
};