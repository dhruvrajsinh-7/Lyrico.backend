const express = require("express");
const router = express.Router();
const {
  CreateSong,
  GetMySong,
  GetAllSongs,
  GetArtistSong,
  GetSong,
} = require("../controller/song.controller");

router.post("/create", CreateSong);
router.get("/get/mysongs", GetMySong);
router.get("/get/allsongs", GetAllSongs);
router.get("/get/artistsong/:artistsongId", GetArtistSong);
router.get("/get/song/:songName", GetSong);
