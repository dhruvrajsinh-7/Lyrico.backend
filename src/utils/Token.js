const jwt = require("jsonwebtoken");
exports = {};
exports.getToken = async (emailid, user) => {
  const token = jwt.sign(
    { identifier: user._id },
    "IAMTHESECRETKEYHERECRACKMEIFYOUCAN"
  );
  return token;
};
module.exports = exports;
