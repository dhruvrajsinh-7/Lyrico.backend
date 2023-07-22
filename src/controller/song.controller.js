const Song = require("../model/song.model");
const User = require("../model/user.model");

async function CreateSong(req, res) {
  const { songname, thumbnail, track } = req.body;

  try {
    if (!songname || !thumbnail || !track) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const artist = req.user._id;
    console.log(artist);
    const newSong = new Song({
      songname,
      thumbnail,
      track,
      artist,
    });

    await newSong.save();
    res.status(200).json(newSong);
  } catch (err) {
    res.status(400).json({ message: "Error creating song" });
  }
}

async function GetMySong(req, res) {
  const artistid = req.user._id;

  try {
    const songs = await Song.find({ artist: artistid }).populate("artist");
    res.status(200).json(songs);
  } catch (err) {
    res.status(400).json({ message: "Error getting songs" });
  }
}

async function GetAllSongs(req, res) {
  try {
    const songs = await Song.find().populate("artist");
    res.status(200).json(songs);
  } catch (err) {
    res.status(400).json({ message: "Error getting songs" });
  }
}

async function GetArtistSong(req, res) {
  const artistsongId = req.params.artistsongId;

  try {
    const artist = await User.findById(artistsongId);
    if (!artist) {
      return res.status(400).json({ message: "Artist not found" });
    }

    const songs = await Song.find({ artist: artistsongId });
    res.status(200).json(songs);
  } catch (err) {
    res.status(400).json({ message: "Error getting songs" });
  }
}

async function GetSong(req, res) {
  const songName = req.params.songName;
  try {
    const song = await Song.find({ songname: songName }).populate("artist");
    if (!song || song.length === 0) {
      return res.status(400).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (err) {
    res.status(400).json({ message: "Error getting song" });
  }
}

module.exports = {
  CreateSong,
  GetMySong,
  GetAllSongs,
  GetArtistSong,
  GetSong,
};
