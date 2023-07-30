const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  CreateSong,
  GetMySong,
  GetAllSongs,
  GetArtistSong,
  GetSong,
} = require("../controller/song.controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  CreateSong
);
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  GetMySong
);
router.get(
  "/get/allsongs",
  passport.authenticate("jwt", { session: false }),
  GetAllSongs
);
router.get(
  "/get/artistsong/:artistsongId",
  passport.authenticate("jwt", { session: false }),
  GetArtistSong
);
router.get(
  "/get/song/:songName",
  passport.authenticate("jwt", { session: false }),
  GetSong
);

module.exports = router;
