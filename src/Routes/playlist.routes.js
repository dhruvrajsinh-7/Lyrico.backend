const express = require("express");
const router = express.Router();
const {
  CreatePlaylist,
  GetPlaylist,
  GetAllPlaylist,
  GetArtistPlaylist,
  AddSong,
} = require("../controller/playlist.controller");
router.post("/create", CreatePlaylist);
router.get("/get/playlist/:playlistId", GetPlaylist);
router.get("/get/myplaylists", GetAllPlaylist);
router.get("/get/artistplaylist/:artistplaylistId", GetArtistPlaylist);
router.post("/add/song", AddSong);
module.exports = router;
