var express = require('express');
var router = express.Router();

/* GET Burt page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Burton', ItsLyingImNotHere: 'here'});
});

module.exports = router;
