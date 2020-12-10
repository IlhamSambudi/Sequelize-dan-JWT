'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detail_transaksi', {
      id_detail_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        references: {
          model: "transaksi",
          key: "id_transaksi"
        }
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id_product"
        }
      },
      qty: {
        type: Sequelize.DOUBLE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detail_transaksis');
  }
};