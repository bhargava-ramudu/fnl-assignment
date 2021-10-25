const City = require("../models/City");
const {
  getWeatherData,
  getData,
  shouldFetchLatestData,
  processWeatherData,
} = require("../utils/weatherData");
const sendResponse = require("../utils/sendResponse");

/**
 * Get cities and weather data
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @return
 */
const getCityAndWeatherData = (req, res) => {
  let queryObj = {};
  let city = req.query.city;

  if (city) {
    queryObj = { "city.name": city };
  }

  getData(req, res, City, queryObj)
    .then((data) => {
      //   console.log("got data -----------", data);
      if (city) {
        if (data.length > 0) {
          let shouldUpdate = shouldFetchLatestData(data[0]);
          if (shouldUpdate) {
            getWeatherData(req, res, city.trim()).then((weatherData) => {
              return processWeatherData({
                req,
                res,
                weatherData,
                insert: false,
                table: City,
              });
            });
          } else {
            let msg = "Data Fetched Successfully";
            sendResponse(res, 200, true, null, data[0], msg);
          }
        } else {
          sendResponse(res, 404, false, null, null, "Not found");
        }
      } else {
        console.log(data, "return");
        sendResponse(res, 200, true, null, data, "Fetched Successfully list");
      }
    })
    .catch((err) => {
      console.log(err);
      let msg = "error while fetching data";
      sendResponse(res, 500, false, err, null, msg);
    });
};

/**
 * insert city and weather data
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @return
 */
const insertCityAndItsData = (req, res) => {
  let cityname = req.body.city;
  let proms = [
    getData(req, res, City, { "city.name": cityname }),
    getWeatherData(req, res, cityname),
  ];
  Promise.all(proms)
    .then((result) => {
      // console.log(result[0], "------db data");
      // console.log(result[1], "------weather data");
      let weatherData = result[1];
      if (result[0]) {
        processWeatherData({
          req,
          res,
          weatherData,
          insert: result[0].length > 0 ? false : true,
          table: City,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      let msg = `error while inserting/updating the city and its weather data`;
      return sendResponse(res, 500, false, null, null, msg);
    });
};

module.exports = { getCityAndWeatherData, insertCityAndItsData };
