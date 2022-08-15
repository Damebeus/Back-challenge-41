const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { FavCoin } = require("../db");

router.get("/crypto/:ticker", async (req, res) => {
  const { ticker } = req.params;
  try {
    let apiUrl = await axios.get(
      `https://api.cryptapi.io/${ticker}/info/?prices=1`
    );

    const apiCoin = {
      logo: apiUrl.data.logo,
      coin: apiUrl.data.coin,
      ticker: apiUrl.data.ticker,
      prices: apiUrl.data.prices,
    };

    return res.send(apiCoin);
  } catch (error) {
    console.log(error);
  }
});
router.get("/allCrypto", async (req, res) => {
  try {
    let bitcoin = await axios.get(`https://api.cryptapi.io/btc/info/?prices=1`);
    let ethereum = await axios.get(
      `https://api.cryptapi.io/eth/info/?prices=1`
    );
    let litecoin = await axios.get(
      `https://api.cryptapi.io/ltc/info/?prices=1`
    );
    let tron = await axios.get(`https://api.cryptapi.io/trx/info/?prices=1`);

    const apiCoin = [
      {
        logo: bitcoin.data.logo,
        coin: bitcoin.data.coin,
        ticker: bitcoin.data.ticker,
        prices: bitcoin.data.prices,
      },
      {
        logo: ethereum.data.logo,
        coin: ethereum.data.coin,
        ticker: ethereum.data.ticker,
        prices: ethereum.data.prices,
      },
      {
        logo: litecoin.data.logo,
        coin: litecoin.data.coin,
        ticker: litecoin.data.ticker,
        prices: litecoin.data.prices,
      },
      {
        logo: tron.data.logo,
        coin: tron.data.coin,
        ticker: tron.data.ticker,
        prices: tron.data.prices,
      },
    ];

    return res.send(apiCoin);
  } catch (error) {
    console.log(error);
  }
});
router.get("/favcoin", async (req, res) => {
  try {
    let coin = await FavCoin.findAll();

    return res.send(coin);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  const { coin, amount, ticker } = req.body;

  if ((coin, amount, ticker)) {
    FavCoin.create({
      coin,
      amount,
      ticker,
    });
    return res.send("favCrypto agregada correctamente");
  } else {
    return res.status(400).send("Please, insert the information correctly");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoin = await FavCoin.findByPk(id);
    if (!deletedCoin) {
      return res.status(404).send("Coin not found");
    }
    await deletedCoin.destroy();
    res.status(200).send("Coin deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
