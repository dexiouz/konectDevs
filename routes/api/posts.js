const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  // Load post model
  Post = require("../../models/Post"),
  // Load Profile model
  Profile = require("../../models/Profile"),
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
    .catch(err => res.status(404).json({ nopostsfound: 'NO one has made any post.' }));
})

// @route GET api/posts/:id
// @desc Get post by id
// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'Sorry no post found for that id.' }));
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

// @route DELETE api/posts/:id 
// @desc delete post
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not uthorized' })
          }

          //Delete 
          post.remove().then(() => res.json({ success: true }));
        })
    }).catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

// @route POST api/posts/like:id 
// @desc like post
// @access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
    }).catch(err => res.status(404).json({ postnotfound: 'No post found' }))
});


// @route POST api/posts/unlike/:id 
// @desc unlike post
// @access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // splice out of array
          post.likes.splice(removeIndex, 1)

          //save
          post.save().then(post => res.json(post));
        })
    }).catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

// @route POST api/posts/comment/:id 
// @desc Add comment to post
// @access private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validtion
  if (!isValid) {
    // if any errors, send error 400 with errors object
    return res.status(400).json(errors);
  }
  const { text, name } = req.body;
  const { user } = req.user;
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text,
        name,
        user,
      }

      // Add to comments Array
      post.comments.unshift(newComment);

      // save
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'Post not found' }))
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Remove comment from post
// @access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      //  check if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' })
      }
      // Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of Array
      post.comments.splice(removeIndex, 1);

      // save
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'Post not found' }))
})
module.exports = router;
