'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      commande.belongsTo(models.client, {
        foreignKey: { allowNull: false }
      })
      commande.belongsTo(models.produit, {
        foreignKey: { allowNull: false }
      })
      commande.hasMany(models.commande)
    }
  }
  commande.init({
    dateCommande: DataTypes.DATE,
    idClient: DataTypes.INTEGER,
    idProduit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'commande',
  });
  return commande;
};