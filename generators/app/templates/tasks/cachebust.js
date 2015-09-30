var gulp        = require('gulp');
var RevAll      = require('gulp-rev-all');
var napkin      = require('gulp-rev-napkin');

module.exports = function(cfg) {

  /*==================================
   * Cachebust
   *==================================*/

  gulp.task('cachebust',function() {

    var rev = new RevAll({
      dontGlobal: [/__reports__\/.*/],
      dontRenameFile: [/\.html$/],
      dontUpdateReference: [/\.html$/]
    });

    return gulp.src([cfg.distdir+'/**'])
      .pipe(gulp.dest(cfg.distdir))
      .pipe(rev.revision())
      .pipe(gulp.dest(cfg.distdir))
      .pipe(napkin({verbose: false}))
      .pipe(rev.manifestFile())
      .pipe(gulp.dest(cfg.distdir))
    ;

  });

};