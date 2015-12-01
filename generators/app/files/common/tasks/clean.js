var gulp = require('gulp');
var del = require('del');
var mkdirp = require('mkdirp');

module.exports = function(cfg) {

  /*==================================
   * Clean
   *==================================*/

  gulp.task('clean', function(cb) {
    del(['*', '.*'], {cwd: cfg.destDir})
      .then(function() {
        mkdirp(cfg.destDir, cb);
      })
    ;
  });

  gulp.task('clean.rev-manifest', function() {
    return del(['rev-manifest.json'], {cwd: cfg.destDir});
  });

};
