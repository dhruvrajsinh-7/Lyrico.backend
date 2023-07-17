const express = require("express");
const app = express();
const port = 3000;
const passport = require("passport");
const db = require("./src/db.config.js");
const User = require("./src/user/user.model.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dhruv's application." });
});

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "IAMTHESECRETKEYHERECRACKMEIFYOUCAN";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
