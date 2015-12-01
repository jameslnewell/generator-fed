var gulp = require('gulp');
var uglify = require('gulp-uglify');

module.exports = function(cfg) {

  /*==================================
   * Optimise scripts
   *==================================*/

  gulp.task('scripts.optimise', function() {
    return gulp.src(cfg.destDir + '/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest(cfg.destDir))
    ;
  });

};
