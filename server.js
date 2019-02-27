const express = require("express"),
  mongoose = require("mongoose"),
  app = express();
(users = require("./routes/api/users")),
  (posts = require("./routes/api/posts")),
  (profile = require("./routes/api/profile"));
// DB CONFIG
const db = require("./config/keys").mongoURI;

//CONNECT T mONGOdb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("ehllo"));

// use routes
app.use("/api/users", users),
  app.use("/api/users", posts),
  app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
