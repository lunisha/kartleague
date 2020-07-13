const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const LeagueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  season:{
    type: String,
    required: true,
  },
  pTeam: {
    type: [[String]],
  },
  pSingle: {
    type: [String],
  },
  winnerTeam: {
    type: [String],
  },
  winnerSingle: {
    type: [String],
  }
})

const League = mongoose.model("league", LeagueSchema);
module.exports = League;