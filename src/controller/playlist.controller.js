const playlist = require("../model/playlist.model");
const Song = require("../model/song.model");
const user = require("../model/user.model");

async function CreatePlaylist(req, res) {
  const currentUser = req.user;
  const { songname, thumbnail, songs } = req.body;

  try {
    if (!songname || !thumbnail) {
      res.status(400).json({ message: "Please fill all the required fields" });
      return;
    }

    const newplaylist = new playlist({
      songname,
      thumbnail,
      songs: songs || [],
      owner: currentUser._id,
      collaborators: [currentUser._id],
    });

    await newplaylist.save();
    res.status(200).json(newplaylist);
  } catch (err) {
    res.status(400).json({ message: "Error creating playlist" });
  }
}

async function GetPlaylist(req, res) {
  const playlistId = req.params.playlistId;

  try {
    const playlist = await playlist.findById(playlistId);
    if (!playlist) {
      res.status(400).json({ message: "Playlist not found" });
      return;
    }
    res.status(200).json(playlist);
  } catch (err) {
    res.status(400).json({ message: "Error getting playlist" });
  }
}
async function GetMyPlaylists(req, res) {
  const artistid = req.user._id;

  try {
    const playlists = await playlist
      .find({ owner: artistid })
      .populate("owner");
    res.status(200).json(playlists);
  } catch (err) {
    res.status(400).json({ message: "Error getting playlists" });
  }
}

async function GetArtistPlaylist(req, res) {
  const artistplaylistId = req.params.artistplaylistId;

  try {
    const artist = await user.findById(artistplaylistId);
    if (!artist) {
      res.status(400).json({ message: "Artist not found" });
      return;
    }

    const playlist = await playlist.findById(artistplaylistId);
    if (!playlist) {
      res.status(400).json({ message: "Playlist not found" });
      return;
    }

    res.status(200).json(playlist);
  } catch (err) {
    res.status(400).json({ message: "Error getting playlist" });
  }
}

async function AddSong(req, res) {
  const currentUser = req.user;
  const { playlistId, songId } = req.body;

  try {
    const playlistObj = await playlist.findById(playlistId);
    if (!playlistObj) {
      res.status(400).json({ message: "Playlist not found" });
      return;
    }

    if (
      !playlistObj.owner.equals(currentUser._id) &&
      !playlistObj.collaborators.includes(currentUser._id)
    ) {
      res.status(400).json({ message: "You are not authorized to add songs" });
      return;
    }

    const song = await Song.findOne({ _id: songId });
    if (!song) {
      res.status(400).json({ message: "Song not found" });
      return;
    }

    playlistObj.songs.push(songId);
    await playlistObj.save();
    res.status(200).json(playlistObj);
  } catch (err) {
    res.status(400).json({ message: "Error adding song" });
    console.error(err);
  }
}

module.exports = {
  CreatePlaylist,
  GetPlaylist,
  GetMyPlaylists,
  GetArtistPlaylist,
  AddSong,
};
