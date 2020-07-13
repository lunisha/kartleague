const ProgamerModel = require("../model/progamer");
const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");

const router = express.Router();
router.get("/", (req, res) => {
  ProgamerModel.find((err, result) =>{
    if (err) return res.status(500).send("오류 발생");
    let arr = [];
    for(i = 0; i< result.length; i++){
      arr.push({ 'name': result[i].name});
    }
    res.json(arr);
  })
})
router.get("/:name", (req, res) => {
  const name = req.params.name;
  ProgamerModel.findOne({ name }, (err, result) => {
    if (err) return res.status(500).end();
    if(!result) return res.status(404).end();
    res.json(result);
  })
})

router.post("/",bodyParser.json(), (req, res) => {
  const { name, team, nickname, position, link } = req.body;
  if (!name || !team || !nickname || !position || !link) return res.status(400).send("입력값이 모자랍니다.");
  ProgamerModel.create({ name, team, nickname, position, link }, (err, result) => {
    if (err) return res.status(500).send("오류 발생");
    res.status(201).json(result);
  })
})

router.put("/:name", bodyParser.json(), (req, res) => {
  const name1 = req.params.name;
  const { name, team, nickname, position } = req.body;  
  ProgamerModel.findOneAndUpdate({ name: name1 }, { nickname, team, position }, { new: true }, (err, result) =>{
      if (err) {
        return res.status(500).end();
      }
      if (!result) return res.status(404).end();
      res.json(result);
    });
});

router.delete("/:name", bodyParser.json(), (req, res) => {
  const name = req.params.name;
  ProgamerModel.findByIdAndRemove({ name }, (err, result) => {
    if (err) return res.status(500).end();
      if (!result) return res.status(404).end();
      res.json(result);
  })
})



module.exports = router;