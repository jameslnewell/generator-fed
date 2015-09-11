var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');

module.exports = function(cfg) {

  /*==================================
   * Optimise images
   *==================================*/

  gulp.task('images.optimise', function() {
    return gulp.src(cfg.distdir+'/**/*.{png,jpg,gif,svg}')
      .pipe(imagemin({
        progressive:  true,
        svgoPlugins:  [{removeViewBox: false}],
        use:          [pngquant()]
      }))
      .pipe(gulp.dest(cfg.distdir))
    ;
  });

};