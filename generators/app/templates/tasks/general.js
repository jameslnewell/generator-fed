var gulp        = require('gulp');
var sequence    = require('run-sequence');

var del         = require('del');
var mkdirp      = require('mkdirp');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var RevAll      = require('gulp-rev-all');
var napkin      = require('gulp-rev-napkin');

module.exports = function(cfg) {

  /*==================================
   * Clean
   *==================================*/

  gulp.task('clean', function() {
    return del(['*'], {cwd: cfg.distdir})
      .then(function() {
        mkdirp(cfg.distdir); //TODO: promisify
      })
    ;
  });

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

  /*==================================
   * Cachebust
   *==================================*/

  gulp.task('cachebust',function() {

    var rev = new RevAll({
      dontGlobal: ['coverage'],
      dontRenameFile: ['bundled.css', 'bundled.js', 'mocha.json']
    });

    return gulp.src([cfg.distdir+'/**'])
      .pipe(gulp.dest(cfg.distdir))
      .pipe(rev.revision())
      .pipe(gulp.dest(cfg.distdir))
      .pipe(napkin({verbose: false}))
    ;

  });

};