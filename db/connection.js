require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("Error occur on MongoDB Connection" + error);
  });

module.exports = connection;

