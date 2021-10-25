const City = require("../models/City");
const citySchema = require("../validation-schemas/index");
const sendResponse = require("../utils/sendResponse");
/**
 * Validates the city request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Object}
 */
async function cityValidtor(req, res, next) {
  const { city } = req.body;

  try {
    const data = await citySchema.validateAsync({
      city: city,
    });
    console.log(data);
    return next();
  } catch (error) {
    console.log(error);
    let errors = {};
    error.details.map((err) => {
      errors[err.path] = err.message;
    });
    // let errors = {
    //   [error.details[0].path]: error.message,
    // };
    let msg = "Bad Request";
    return sendResponse(res, 400, false, errors, null, msg);
  }
}

module.exports = cityValidtor;
