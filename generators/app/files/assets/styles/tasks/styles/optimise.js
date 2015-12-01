var gulp = require('gulp');
var minify = require('gulp-minify-css');

module.exports = function(cfg) {

  /*==================================
   * Minify styles
   *==================================*/

  gulp.task('styles.optimise', function() {
    return gulp.src(cfg.destDir + '/**/*.css')
      .pipe(minify())
      .pipe(gulp.dest(cfg.destDir))
    ;
  });

};
