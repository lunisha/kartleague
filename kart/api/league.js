const LeagueModel = require("../model/league");
const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");


const router = express.Router();
router.get("/", (req, res) => {
  LeagueModel.find((err, result) => {
    if (err) return res.status(500).send("오류 발생");
    let arr = [];
    for(let i=0; i<result.length; i++) {
      arr.push({'title': result[i].title, 'season': result[i].season})
    }
    res.json(arr);
  })
})
router.get("/:season", (req, res) => {
  const season = req.params.season;
  LeagueModel.findOne({ season }, (err, result) => {  
    if (err) return res.status(500).end();
    if(!result) return res.status(404).end();
    res.json(result);
  })
})

module.exports = router;