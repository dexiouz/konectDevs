const express = require("express"),
  router = express.Router();

// @route GET api/posts/test
// @desc Test posts route
// @access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
