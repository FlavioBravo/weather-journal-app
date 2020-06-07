// weatherUser.js - route Module
const express = require("express");
const router = express.Router();

// Setup empty JS object to act as API endpoint
const projectData = require("fs");

// Get weatherUserDataList
router.get("/", function (req, res) {
  const weatherUserDataList = require("./db.json");
  res.json({
    ok: true,
    respond: weatherUserDataList,
  });
});

// Post one weatherUserData
router.post("/", function (req, res) {
  let weatherUserDataList = require("./db.json");

  const id = weatherUserDataList.length + 1;
  const weatherUserData = {
    _id: `${id}`,
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };

  weatherUserDataList.push(weatherUserData);

  projectData.writeFileSync(
    `${__dirname}/db.json`,
    JSON.stringify(weatherUserDataList)
  );

  res.json({
    ok: true,
    respond: weatherUserData,
  });
});

module.exports = router;
