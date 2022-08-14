const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("favCoin", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    coin: {
      type: DataTypes.ENUM("bitcoin", "ethereum", "litecoin", "tron" ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ticker: {
      type: DataTypes.ENUM("btc", "eth", "ltc", "trx")
    },
  });
};
