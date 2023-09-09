'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paiment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      paiment.belongsTo(models.commande, {
        foreignKey: { allowNull: false }
      })
    }
  }
  paiment.init({
    montant: DataTypes.INTEGER,
    datePaiment: DataTypes.DATE,
    idCommande: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paiment',
  });
  return paiment;
};