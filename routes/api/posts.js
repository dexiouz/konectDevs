const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  // Load post model
  Post = require("../../models/Post"),
  // Validation
  validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Test posts route
// @access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));
// @route GET api/posts
// @desc Get posts
// @access public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
})

// @route GET api/posts/:id
// @desc Get post by id
// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404));
})

// @route GET api/posts
// @desc Create post
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validtion
    if (!isValid) {
      // if any errors, send error 400 with errors object
      return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body,
      newPost = new Post({
        text,
        name,
        avatar,
        user: req.user.id
      });

    newPost.save().then(post => res.json(post));
  }
);
module.exports = router;
