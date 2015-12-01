var gulp        = require('gulp');
var RevAll      = require('gulp-rev-all');
var revdel      = require('gulp-rev-delete-original');

module.exports = function(cfg) {

  /*==================================
   * Cachebust
   *==================================*/

  gulp.task('cachebust',function() {

    var rev = new RevAll({
      dontGlobal: [/__reports__\/.*/], //fixme: not ignoring report assets?
      dontRenameFile: [/\.html$/],
      dontUpdateReference: [/\.html$/]
    });

    return gulp.src([cfg.destDir+'/**'])
      .pipe(gulp.dest(cfg.destDir))
      .pipe(rev.revision())
      .pipe(gulp.dest(cfg.destDir))
      .pipe(revdel())
      .pipe(rev.manifestFile())
      .pipe(gulp.dest(cfg.destDir))
    ;

  });

};
