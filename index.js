const express = require("express");
const bodyParser = require("body-parser");
const barRouter = require("./router/barRouter");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", barRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});

module.exports = app;
