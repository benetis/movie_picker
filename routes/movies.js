var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var util = require('util');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = 'http://www.imdb.com/search/title?groups=top_1000';
    request(url, {headers: {'accept-language': 'en'}}, function (error, response, html) {
        if (error) {
            return;
        }

        var $ = cheerio.load(html);
        var movies = [];

        $('.detailed').filter(function () {
            var movie = $(this).children().last();
            var title = movie.find('a').first().text();
            var year = movie.find('.year_type').text().slice(1, -1);
            var duration = movie.find('.runtime').text();
            var scrapped_rating = movie.find('.rating').attr('title');
            var user_ratings = scrapped_rating.match(/[0-9]+(\.[0-9][0-9]?)?/)[0];
            var user_ratings_voted = scrapped_rating.match(/\((.*?)\)/)[1];

            movies.push({
                title: title,
                year: year,
                duration: duration,
                user_ratings: user_ratings,
                user_ratings_amount: user_ratings_voted
            });
        });
        res.send(movies);
    });
});

router.get('/scrape', function (req, res, next) {
    res.send('Just scrapin the movies')
});

module.exports = router;
