const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;
mongoose
  .connect(
    `mongodb+srv://dhruv:${password}@cluster0.3viquax.mongodb.net/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

exports.mongoose = mongoose;
