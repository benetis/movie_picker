var Scraper = require('../models/scraper');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  Scraper.scrape(function(movies) {
    res.send(movies);
  })
});

router.get('/random', function (req, res, next) {
  Scraper.random(function(movie) {
    res.send(movie);
  });
});

module.exports = router;
