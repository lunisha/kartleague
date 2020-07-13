const express = require("express");
const Mongoose = require("mongoose");

const port = 3001;
const app = express();

app.use("/api/league" ,require("./api/league"));
app.use("/api/progamer" ,require("./api/progamer"));
app.use("/api/user" ,require("./api/user"));





async function server() {
  await Mongoose.connect('mongodb://localhost/kartleague',
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false , useCreateIndex: true});
  await app.listen(port);
}

server().then(() => {
  console.log(`다음 트랙은 ${port}입니다. 지금부터 박수와 함께 달려보겠습니다!!`);
}).catch((err) => {
  console.error(err);
  console.log(`시작할 수 없습니다.`);
})


