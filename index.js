const express = require("express");
const bodyParser = require("body-parser");
// const authorRouter = require("./router/authorRouter");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/author", authorRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});

module.exports = app;
