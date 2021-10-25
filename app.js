const express = require("express");
const config = require("./config");

const cityRoutes = require("./routes/cities");
const cors = require("cors");
const app = express();

require("./startup/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/cities", cityRoutes);

app.get("/", (req, res) => {
  console.log("this is root");
  res.status(200).json({
    msg: "Hello there, you have come to home",
  });
});
const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async (req, res) =>
    console.log(`listening on port ${PORT}`)
  );
}

module.exports = app;
