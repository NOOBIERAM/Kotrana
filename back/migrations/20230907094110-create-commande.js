'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commandes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateCommande: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idClient: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model : 'clients',
          key: 'id'
        }
      },
      idProduit: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model : 'produits',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('commandes');
  }
};