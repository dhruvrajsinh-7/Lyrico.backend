const express = require("express");
const passport = require("passport");

const router = express.Router();
const {
  CreatePlaylist,
  GetPlaylist,
  GetMyPlaylists,
  GetArtistPlaylist,
  AddSong,
} = require("../controller/playlist.controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  CreatePlaylist
);
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  GetPlaylist
);
router.get(
  "/get/myplaylists",
  passport.authenticate("jwt", { session: false }),
  GetMyPlaylists
);
router.get(
  "/get/artistplaylist/:artistplaylistId",
  passport.authenticate("jwt", { session: false }),
  GetArtistPlaylist
);
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  AddSong
);

module.exports = router;
