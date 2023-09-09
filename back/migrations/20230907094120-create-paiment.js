'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paiments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      montant: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      datePaiment: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idCommande: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model : 'commandes',
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
    await queryInterface.dropTable('paiments');
  }
};