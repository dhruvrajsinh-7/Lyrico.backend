const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/Token");

async function register(req, res) {
  const { firstname, lastname, password, emailid, username } = req.body;
  if (!firstname || !lastname || !password || !emailid || !username) {
    res.status(400).json({ message: "Please fill all the fields" });
    return;
  }

  const user = await User.findOne({ emailid: emailid });
  if (user) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const rounds = 10;
  const hash = await bcrypt.hash(password, rounds);
  const newuser = new User({
    firstname,
    lastname,
    password: hash,
    emailid,
    username,
  });

  try {
    await newuser.save();
    const token = await getToken(emailid, newuser);
    const userreturn = { ...newuser.toJSON(), token };
    delete userreturn.password;
    return res.status(200).json(userreturn);
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
}

async function login(req, res) {
  const { emailid, password } = req.body;

  if (!password || !emailid) {
    res.status(400).json({ message: "Please fill all the fields" });
    return;
  }

  const user = await User.findOne({ emailid: emailid });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
}

module.exports = {
  register,
  login,
};
