var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('10 Random movies');
});

router.get('/scrape', function (req, res, next) {
  res.send('Just scrapin the movies')
});

module.exports = router;
