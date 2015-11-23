var gulp = require('gulp');

module.exports = function(cfg) {

  var CONTENT_SRC_DIR = cfg.srcdir + '/content';
  var CONTENT_SRC_GLOB = [CONTENT_SRC_DIR + '/**/*'];

  /*==================================
   * Build content
   *==================================*/

  gulp.task('content.build', function() {
    return gulp.src(CONTENT_SRC_GLOB)
      .pipe(gulp.dest(cfg.distdir))
    ;
  });

  /*==================================
   * Watch content
   *==================================*/

  gulp.task('content.watch', ['content.build'], function() {
    gulp.watch(CONTENT_SRC_GLOB, ['content.build']);
  });

};
