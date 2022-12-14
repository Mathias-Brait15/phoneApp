'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Transaction)
    }

    ambiguStock(){
      if (this.stock === 0){
        return 'Mohon maaf, barang sudah habis'
      } else if (this.stock < 10){
        return 'Ayo buruan! Barang udah tinggal kurang  10 nihh!'
      } else if (this.stock < 50){
        return 'Lagi populer nih.. sisa 50 doanggg!'
      } else {
        return 'Santai aja.. Stok masih banyak'
      }
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        }
      }},
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        }
      }},
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};