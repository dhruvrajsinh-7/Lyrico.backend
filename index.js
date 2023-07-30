const express = require("express");
const app = express();
const port = 3000;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const db = require("./src/db.config.js");
const User = require("./src/model/user.model.js");
const authRoutes = require("./src/Routes/Auth.routes.js");
const songRoutes = require("./src/Routes/song.routes.js");
const playlistRoutes = require("./src/Routes/playlist.routes.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dhruv's application." });
});

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "IAMTHESECRETKEYHERECRACKMEIFYOUCAN";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
