const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  city: {
    id: Number,
    name: {
      type: String,
      required: [true, "city is required"],
      lowercase: true,
    },
    coord: mongoose.Schema.Types.Mixed,
    country: String,
    population: Number,
    timeZone: Number,
    sunrise: Number,
    sunset: Number,
  },
  weatherDataList: [
    {
      dt: Number,
      main: mongoose.Schema.Types.Mixed,
      weather: mongoose.Schema.Types.Mixed,
      clouds: mongoose.Schema.Types.Mixed,
      wind: mongoose.Schema.Types.Mixed,
      visibility: Number,
      pop: Number,
      sys: mongoose.Schema.Types.Mixed,
      dt_txt: String,
    },
  ],
});

module.exports = mongoose.model("City", citySchema);
