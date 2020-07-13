const UserModel = require("../model/user")
const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.post("/login",bodyParser.json(), (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password ) return res.status(400).send("필수값이 미기재되었습니다.");
  UserModel.findOne({email}, (err, user) => {
    if (err)
      return res.status(500).send("오류 발생");
    if (!user)
      return res.status(404).send("미가입 계정입니다.");
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).send("오류 발생");
      if (!isMatch)
        return res.status(500).send("잘못된 비밀번호입니다.");

      const token = jwt.sign(user._id.toHexString(), "secretKey")

      UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
        if (err)
          return res.status(500).send("오류 발생");
        res.cookie("token", token, { httpOnly: true });
        res.json(result);
      })
    })
  })
})

router.post("/signin", bodyParser.json(), (req, res) => {
  const { name, email, password } = req.body;
  if(!name||!email||!password) return res.status(400).send("필수값이 미기재되었습니다.");
  UserModel.findOne({ email }, (err, result) => {
    if (err)
      return res.status(500).send("사용자 조회시 오류 발생");
    if (result)
      return res.status(409).send("이미 사용 중");
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err)
        return res.status(500).send("암호화 중 오류 발생");
      const user = new UserModel({ name, email, password: hash });
      user.save((err, result) => {
        if (err)
          return res.status(500).send("회원가입 시 오류 발생");
        res.status(201).json(result);
      })
    })
  })
})

router.get("/check", cookieParser(), (req, res) => {
  res.locals.user = null;
  const token = req.cookies.token;
  if(!token){
    if(req.url === "/")
      return ;
    return res.status(403).send("토큰 없음");
  }
  jwt.verify(token, "secretKey", (err, _id) => {
    if(err) {
      res.clearCookie("token").status(403).send("에러 발생");
      return;
    }
    UserModel.findOne({ _id , token }, (err, user) => {
      if (err)
        return res.status(500).send("인증 시 오류 발생");
      if (!user)
        return res.status(403).send("1");
      res.locals.user = { name: user.name };
      res.status(200).send("로그인 완료");          
    });
  })
})

router.get("/logout", cookieParser(), (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) return res.status(500).send("로그아웃 시 오류 발생");
    UserModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
      if (err) return res.status(500).send("로그아웃 시 오류 발생");
      res.clearCookie("token");
      res.status(200).send("로그아웃 완료");
    })
  })
})

module.exports = router;