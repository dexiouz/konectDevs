const
 express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require('body-parser'),
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

app.get("/", (req, res) => res.send("ehllo"));

// use routes
app.use("/api/users", users),
  app.use("/api/posts", posts),
  app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
