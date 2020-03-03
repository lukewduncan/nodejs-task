var router = require('express').Router();

// GET api/books
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("test")
});

// POST api/books
router.post('/', function (req, res) {
  res.json("test")
});

module.exports = router;