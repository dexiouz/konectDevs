const express = require("express"),
  router = express.Router();

// @route GET api/users/test
// @desc Test users route
// @access public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

module.exports = router;
