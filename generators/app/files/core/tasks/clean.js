var gulp = require('gulp');
var del = require('del');
var mkdirp = require('mkdirp');

module.exports = function(cfg) {

  /*==================================
   * Clean
   *==================================*/

  gulp.task('clean', function(cb) {
    del(['*', '.*'], {cwd: cfg.distdir})
      .then(function() {
        mkdirp(cfg.distdir, cb);
      })
    ;
  });

};
