const express = require("express");

const {
  insertCityAndItsData,
  getCityAndWeatherData,
} = require("../controllers/cities");
const cityValidtor = require("../validators/city");
const cityRouter = express.Router();

cityRouter.get("/", getCityAndWeatherData);
cityRouter.post("/", cityValidtor, insertCityAndItsData);

module.exports = cityRouter;
