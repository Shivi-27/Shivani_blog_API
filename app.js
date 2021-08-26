const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");

app.use(express.json());

let MONGODB_URL = "mongodb://127.0.0.1:27017/blogs";
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to  mongodb");
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("server is running on 5000");
});
