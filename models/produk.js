'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product.init({
    id_produk:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produk',
    tableName: "produk"
  });
  return product;
};