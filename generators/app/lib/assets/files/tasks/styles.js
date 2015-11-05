var gulp        = require('gulp');
var logger      = require('gulp-util');
var prefixer    = require('gulp-autoprefixer');
var minify      = require('gulp-minify-css');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var del         = require('del');
var sequence    = require('run-sequence');
var composer    = require('sass-composer');
var watcher     = require('sass-composer/lib/watcher');

module.exports = function(cfg) {

  var STYLE_SRC_DIR = cfg.srcdir+'/assets';
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

  /**
   * Create the bundler
   * @param   {boolean}     [watch]
   * @returns {composer}
   */
  function createBundler(watch) {
    var bundler;

    if (watch) {
      bundler = watcher(STYLE_OPTIONS);
    } else {
      bundler = composer(STYLE_OPTIONS);
    }

    return bundler;
  }

  /**
   * Perform the bunlding
   * @param   {composer}    bundler
   * @param   {object}      options
   * @returns {stream}
   */
  function createBundle(bundler, options) {
    options = options || {}; //TODO: handle errors
    return bundler.compose()
      .pipe(source('bundled.css'))
      .pipe(buffer())
      .pipe(prefixer({browsers: ['last 2 versions']}))
      .pipe(gulp.dest(STYLE_BUILD_DIR))
    ;
  }

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
    return createBundle(createBundler());
  });

  /*==================================
   * Watch styles
   *==================================*/

  gulp.task('styles.watch', function() {
    var startTime = 0;
    var bundler = createBundler(true);

    bundler.on('change', function() {
      logger.log('bundling styles...');
      startTime = Date.now();
      return createBundle(bundler).on('finish', function() {
        var totalTime=Date.now()-startTime;
        logger.log('bundled stlyes in '+(totalTime/1000)+'s');
      });
    });

    startTime = Date.now();
    return createBundle(bundler).on('finish', function() {
      var totalTime=Date.now()-startTime;
      logger.log('bundled stlyes in '+(totalTime/1000)+'s');
    });
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