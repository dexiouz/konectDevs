const express = require("express"),
  gravatar = require("gravatar"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  router = express.Router(),
  passport = require("passport"),
  //Load Input validation
  validateRegisterInput = require('../../validation/register'),
  //Load user model
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

  // const { errors, isValid } = validateRegisterInput(req.body);

  // //Check validtion
  // if(!isValid) {
  //   return res.status(400).json(errors);
  // }

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
// @desc lOGIN user/ Returning Jwt Token
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
        //the passwords match
        const { id, name, avatar } = user,
          payload = { id, name, avatar };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ password: "Ouch!!, your passwords do not match" });
      }
    });
  });
});

// @route GET api/users/CURRENT
// @desc Get current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
