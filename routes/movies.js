var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var util = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = 'http://www.imdb.com/search/title?groups=top_1000';
  request(url, {headers: {'accept-language': 'en'}}, function (error, response, html) {
    if(error) { return; }

    var $ = cheerio.load(html);
    var movies = [];

    $('.detailed').filter(function () {
      var movie = $(this).children();
      var title = movie.last().find('a').first().text();
      var year = movie.last().find('.year_type').text().slice(1, -1);
      movies.push({title: title, year: year});
    });
    res.send(movies);
  });
});

router.get('/scrape', function (req, res, next) {
  res.send('Just scrapin the movies')
});

module.exports = router;
