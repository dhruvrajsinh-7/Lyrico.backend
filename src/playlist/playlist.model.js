const mongoose = require("mongoose");
const playlistSchema = mongoose.Schema({
  songname: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "song",
  },
  songs: {
    type: Array,
    required: false,
    default: [],
  },
  collaborators: {
    type: Array,
    required: false,
    default: [],
  },
});
module.exports = mongoose.model("playlist", playlistSchema);
