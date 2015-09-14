var gulp        = require('gulp');
var RevAll      = require('gulp-rev-all');
var napkin      = require('gulp-rev-napkin');

module.exports = function(cfg) {

  /*==================================
   * Cachebust
   *==================================*/

  gulp.task('cachebust',function() {

    var rev = new RevAll({
      dontGlobal: ['coverage'],
      dontRenameFile: ['mocha.json', /\.html$/],
      dontUpdateReference: ['mocha.json', /\.html$/]
    });

    return gulp.src([cfg.distdir+'/**'])
      .pipe(gulp.dest(cfg.distdir))
      .pipe(rev.revision())
      .pipe(gulp.dest(cfg.distdir))
      .pipe(napkin({verbose: false}))
    ;

  });

};