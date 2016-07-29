var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var _ = require('lodash');

module.exports = {
  movies: [],
  doRequest: function (url, callback) {
    request(url, {headers: {'accept-language': 'en'}}, function (error, response, html) {
      if (error) {
        return;
      }

      var $ = cheerio.load(html);
      var movies = [];

      $('.lister-item').filter(function (i, el) {
        var movie = $(el);
        var title = $(movie.find('a')[1]).text();
        var year = movie.find('.lister-item-year').text().slice(1, -1);
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
        console.log(movies);
      });

      callback(movies);
    });
  },
  scrape: function(callback) {
    var url = 'http://www.imdb.com/search/title?groups=top_1000';
    if(_.isEmpty(this.movies)) {
      this.doRequest(url, function(movies) {
        this.movies = movies;
        callback(this.movies);
      });
    } else {
      callback(this.movies);
    }
  },
  random: function(callback) {
    this.scrape(function(movies) {
      callback(movies[Math.floor(movies.length * Math.random())]);
    })
  }

};