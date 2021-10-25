const Mongoose = require("mongoose");
const config = require("../config");

module.exports = function () {
  const db = config.databaseUrl[config.environment];
  console.log(db);
  Mongoose.connect(db, {
    useNewUrlParser: true,
  })
    .then(() => console.log("connected to db"))
    .catch((err) => {
      console.log(err);
    });
};
