//user model
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  favouritesongs: {
    type: Array,
    required: false,
    default: [],
  },
  favouritesingers: {
    type: Array,
    required: false,
    default: [],
  },
  favouriteplaylists: {
    type: Array,
    required: false,
    default: [],
  },
  favouritealbums: {
    type: Array,
    required: false,
    default: [],
  },
  favouritegenres: {
    type: Array,
    required: false,
    default: [],
  },
});
module.exports = mongoose.model("User", userSchema);
