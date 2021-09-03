const {Sequelize, DataTypes} = require('sequelize');
const { product, feature, style, sku, photo } = require('./pgModels/index.js');
const productOverviewDB = new Sequelize('productOverviewDB', 'root', null, {
    host: 'localhost',
    dialect: 'postgres'
});

try {
    productOverviewDB.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
 
const models = {
    Photo: photo(productOverviewDB, DataTypes),
    SKU: sku(productOverviewDB, DataTypes),
    Style: style(productOverviewDB, DataTypes), 
    Feature: feature(productOverviewDB, DataTypes),
    Product: product(productOverviewDB, DataTypes)
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
    models,
    productOverviewDB
};