'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //contoh dari child ke parent
      this.belongsTo(models.customer, {
        foreignKey: "id_customer",
        as: "customer"
      }),

      //contoh dari parent ke child SUNNAH
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: "detail_transaksi"
      })
    }
  };
  transaksi.init({
    id_transaksi:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_customer: DataTypes.INTEGER,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: "transaksi"
  });
  return transaksi;
};