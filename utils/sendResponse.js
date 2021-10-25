/**
 * Get cities and weather data
 *
 * @param {Object} req
 * @param {Object} res
 * @param {boolean} isSuccess
 * @param {(Object|null)} errors
 * @param {(Object|Object[]|null)} data
 * @param {string} msg
 *
 * @return
 */
const sendResponse = (resObj, status, isSuccess, errors, data, msg) => {
  return resObj.status(status).json({
    isSuccess,
    errors,
    data,
    msg,
  });
};

module.exports = sendResponse;
