const express = require("express"),
  mongoose = require("mongoose"),
  app = express();

// DB CONFIG
const db = require("./config/keys").mongoURI;

//CONNECT T mONGOdb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("ehllo"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
