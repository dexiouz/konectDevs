const 
  express = require("express"),
  gravatar = require('gravatar'),
  bcrypt = require('bcryptjs'),
  router = express.Router();
  User = require('../../models/User')

// @route GET api/users/test
// @desc Test users route
// @access public
router.get("/test", (req, res) => res.json({ msg: "users works" }));


// @route GET api/users/register
// @desc register user
// @access public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists.'})
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', // rating
          d: 'mm', //Default
        })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        // hash password and save user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})
module.exports = router;
