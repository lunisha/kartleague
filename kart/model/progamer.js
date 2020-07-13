const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProgamerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
  },
  nickname: {
    type: [String],
  },
  position: {
    type: String,
  },
  link: {
    type: [String],
    default: ["", "", ""]
  },
})

const Progamer = mongoose.model("progamer", ProgamerSchema);
module.exports = Progamer;