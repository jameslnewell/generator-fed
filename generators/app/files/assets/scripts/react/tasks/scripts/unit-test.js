var path = require('path');
var gulp = require('gulp');
var mkdirp = require('mkdirp');

module.exports = function(cfg) {

  gulp.task('scripts.test', function(done) {
    mkdirp(cfg.reportsdir, function(err) {

    });
  });

  gulp.task('scripts.test.watch', function(done) {

  });

};
