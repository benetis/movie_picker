var express = require('express');
var router = express.Router();
var Scraper = require('../models/scraper');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Scraper.scrape(function(movies) {
    res.send(movies);
  })
});

// router.get('/random', function (req, res, next) {
//   var randomMovie = movie_cache[Math.floor(movie_cache.length * Math.random())];
//   res.send(randomMovie)
// });

module.exports = router;
