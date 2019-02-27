const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  users = require("./routes/api/users"),
  posts = require("./routes/api/posts"),
  profile = require("./routes/api/profile"),
  app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONFIG
const db = require("./config/keys").mongoURI;

//CONNECT T mONGOdb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", users),
  app.use("/api/posts", posts),
  app.use("/api/profile", profile);

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`server running on port ${port}`));
