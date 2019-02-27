const express = require("express"),
  router = express.Router();

// @route GET api/profiles/test
// @desc Test profiles route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profiles works" }));

module.exports = router;
