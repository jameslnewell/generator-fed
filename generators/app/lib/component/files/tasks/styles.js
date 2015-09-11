var gulp        = require('gulp');
var prefixer    = require('gulp-autoprefixer');
var minify      = require('gulp-minify-css');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var del         = require('del');
var sequence    = require('run-sequence');
var composer    = require('sass-composer');

module.exports = function(cfg) {

  var STYLE_SRC_DIR = cfg.srcdir+'/component';
  var STYLE_BUILD_DIR = cfg.distdir;

  var STYLE_SRC_FILE = STYLE_SRC_DIR+'/index.scss';
  var STYLE_BUILD_FILE = STYLE_BUILD_DIR+'/bundled.css';

  var STYLE_OPTIONS = {
    entry:    STYLE_SRC_FILE,
    plugins:  [composer.plugins.url({dir: STYLE_BUILD_DIR, copy: true})]
  };

  var STYLE_SRC_GLOB = [
    '!'+STYLE_SRC_DIR+'/node_modules/**/*.css', '!'+STYLE_SRC_DIR+'/**/node_modules/**/*.css', //ignore styles from node_modules
    '!'+STYLE_SRC_DIR+'/node_modules/**/*.scss', '!'+STYLE_SRC_DIR+'/**/node_modules/**/*.scss', //ignore styles from node_modules
    STYLE_SRC_DIR+'/*.css', STYLE_SRC_DIR+'/**/*.css', //include our styles
    STYLE_SRC_DIR+'/*.scss', STYLE_SRC_DIR+'/**/*.scss' //include our styles
  ];

  /*==================================
   * Clean styles
   *==================================*/

  gulp.task('styles.clean', function() {
    return del(['bundled.css', 'node_modules/'], {cwd: cfg.distdir});
  });

  /*==================================
   * Bundle styles
   *==================================*/

  gulp.task('styles.bundle', function() {
    return composer(STYLE_OPTIONS).compose()
      .pipe(source('bundled.css'))
      .pipe(buffer())
      .pipe(prefixer({browsers: ['last 2 versions']}))
      .pipe(gulp.dest(STYLE_BUILD_DIR))
    ;
  });

  /*==================================
   * Watch styles
   *==================================*/

  gulp.task('styles.watch', function() {
    gulp.watch(STYLE_SRC_GLOB, ['styles.build']);
  });

  /*==================================
   * Minify styles
   *==================================*/

  gulp.task('styles.optimise', function() {
    return gulp.src(cfg.distdir+'/**/*.css')
      .pipe(minify())
      .pipe(gulp.dest(cfg.distdir))
    ;
  });

};