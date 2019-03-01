const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  router = express.Router(),
  // Load profile model
  Profile = require("../../models/Profile"),
  // Load profile model
  User = require("../../models/User");

// @route GET api/profiles/test
// @desc Test profiles route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profiles works" }));

// @route GET api/profiles
// @desc Get current user profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          (errors.noproflie = "This user has no profile"),
            res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
