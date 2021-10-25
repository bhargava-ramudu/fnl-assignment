const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  url: process.env.APP_URL || "http://localhost:3000",
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",

  databaseUrl: {
    development:
      process.env.DEVELOPMENT_DATABASE_URL || "mongodb://localhost:27017/fnl",
    production:
      process.env.PRODUCTION_DATABASE_URL ||
      "mongodb://localhost:27017/fnl_production",
    test: process.env.TEST_DATABASE_URL || "mongodb://localhost:27017/fnl_test",
  },

  owmBaseUrl: "https://api.openweathermap.org",
};
