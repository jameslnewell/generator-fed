var gulp = require('gulp');

module.exports = function(cfg) {

  var CONTENT_SRC_DIR = cfg.contentDir;
  var CONTENT_SRC_GLOB = [CONTENT_SRC_DIR + '/**/*.{html,png,jpg,gif,svg}'];

  /*==================================
   * Build content
   *==================================*/

  gulp.task('content.build', function() {
    return gulp.src(CONTENT_SRC_GLOB)
      .pipe(gulp.dest(cfg.destDir))
    ;
  });

  /*==================================
   * Watch content
   *==================================*/

  gulp.task('content.watch', ['content.build'], function() {
    gulp.watch(CONTENT_SRC_GLOB, ['content.build']);
  });

};
