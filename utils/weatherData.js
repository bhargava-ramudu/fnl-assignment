const axios = require("axios");
const City = require("../models/City");
const sendResponse = require("./sendResponse");
const mongoose = require("mongoose");
const config = require("../config");

/**
 * Gets Weather data from OpenWeatherMaps api
 *
 * @param {Object} req
 * @param {Object} res
 * @param {string} cityname
 *
 * @returns {Promise}
 */
const getWeatherData = async (req, res, cityname) => {
  const apiUrl = `${config.owmBaseUrl}/data/2.5/forecast?q=${cityname}&appid=${process.env.OWM_API_KEY}`;
  let data = axios(apiUrl)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      // console.log(err);
      console.log(err.response.data);
      return err.response.data;
    });

  return data;
};

const getData = (req, res, table, query) => {
  const limit = req.query.limit ? req.query.limit : 20;
  const page = req.query.page ? req.query.page : 1;
  const skip = (page - 1) * limit;
  let data = table
    .find(query)
    .limit(limit)
    .skip(skip)
    .exec()
    .then((data) => {
      console.log(data, "this is data");
      return data;
    })
    .catch((err) => {
      sendResponse(res, 500, false, err, null, "Error while fetching the data");
    });
  return data;
};

const shouldFetchLatestData = (cityData) => {
  console.log(cityData.weatherDataList[0]);
  if (new Date().getTime() > cityData.weatherDataList[0].dt * 1000) {
    return true;
  } else {
    return false;
  }
};

const processWeatherData = ({ req, res, weatherData, insert, table }) => {
  try {
    if (weatherData.cod == "200") {
      createOrModifyData({
        req,
        res,
        weatherData,
        insert,
        table,
        queryData: { "city.name": weatherData.city.name },
        updateData: {
          city: weatherData.city,
          weatherDataList: weatherData.list,
        },
      });
    } else if (weatherData.cod == "404") {
      let msg = `Please enter a valid city name`;
      return sendResponse(res, 404, false, null, null, msg);
    } else {
      let msg = `Sorry!! Something went wrong!!`;
      return sendResponse(res, 500, false, null, null, msg);
    }
  } catch (e) {
    res.status(500).json({ erros: e });
  }
  // } else {
  //   let msg = `Sorry!! Something went wrong!!`;
  //   return sendResponse(res, 500, false, null, null, msg);
  // }
};

const createOrModifyData = ({
  req,
  res,
  weatherData,
  insert,
  table,
  queryData,
  updateData,
}) => {
  let execute;
  let msg;
  if (insert) {
    console.log("inserting------------------");
    updateData["_id"] = new mongoose.Types.ObjectId();
    let city = new City(updateData);
    execute = city.save();
  } else {
    console.log("updating------------------");

    execute = table
      .findOneAndUpdate(
        { ...queryData },
        { $set: { ...updateData } },
        { new: true }
      )
      .exec();
  }

  execute
    .then((result) => {
      msg = `City data updated Successfully`;
      return sendResponse(res, 200, true, null, result, msg);
    })
    .catch((err) => {
      msg = `error while updating the weather data`;
      return sendResponse(res, 500, false, err, null, msg);
    });
};

module.exports = {
  getWeatherData,
  shouldFetchLatestData,
  createOrModifyData,
  getData,
  processWeatherData,
};
