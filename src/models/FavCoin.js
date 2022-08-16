const { DataTypes } = require("sequelize");
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
      type: DataTypes.ENUM("Bitcoin", "Ethereum", "Litecoin", "TRX"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ticker: {
      type: DataTypes.ENUM("BTC", "ETH", "LTC", "TRX"),
    },
  });
};
