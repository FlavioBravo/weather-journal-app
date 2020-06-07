const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//EndPoint
const weatherUser = require("./weatherUser");
app.use("/api/weatherUser", weatherUser);

//Public Folder
app.use(express.static(publicPath));

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
