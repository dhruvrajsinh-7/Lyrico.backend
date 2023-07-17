const express = require("express");
const router = express.Router();
const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { get } = require("express/lib/response");
register = (req, res) => {
  const { firstname, lastname, password, emailid, username } = req.body;
  if (!firstname || !lastname || !password || !emailid || !username) {
    res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = User.findone({ emailid: emailid });
  if (user) {
    res.status(400).json({ message: "User already exists" });
  }
  const rounds = 10;
  const pass = "IAMTHESECRETKEYHERECRACKMEIFYOUCAN";
  const hash = bcrypt.hash(password, rounds);
  const newuser = new User({
    firstname,
    lastname,
    password: hash,
    emailid,
    username,
  });
  newuser
    .save()
    .then(() => {
      res.status(200).json({ message: "User created successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error creating user" });
    });
  const token = gettoken(emailid, newuser._id);
};
module.exports = {
  register,
};
