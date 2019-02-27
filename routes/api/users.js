const express = require("express"),
  gravatar = require("gravatar"),
  bcrypt = require("bcryptjs"),
  router = express.Router();
User = require("../../models/User");

// @route GET api/users/test
// @desc Test users route
// @access public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route POST api/users/register
// @desc register user
// @access public
router.post("/register", (req, res) => {
  //destructure user details
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists." });
    } else {
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" //Default
      });
      const newUser = new User({
        name,
        email,
        avatar,
        password
      });

      // hash password and save user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/register
// @desc lOGIN user
// @access public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user with this email
  User.findOne({ email }).then(user => {
    // check if the email has registere
    if (!user) {
      return res
        .status(404)
        .json({ email: "Ooops!, we couldn't find this user" });
    }

    //Check if password match hashed password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "success" });
      } else {
        return res
          .status(400)
          .json({ password: "Ouch!!, your passwords do not match" });
      }
    });
  });
});

module.exports = router;
