const jwt = require("jsonwebtoken");
exports = {};
exports.gettoken = (emailid, user) => {
  const token = jwt.sign();
};
