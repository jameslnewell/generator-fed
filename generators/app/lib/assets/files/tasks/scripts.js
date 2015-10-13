var path        = require('path');
var gulp        = require('gulp');
var del         = require('del');
var mkdirp      = require('mkdirp');
var sequence    = require('run-sequence');
var source      = require('vinyl-source-stream');

var eslint      = require('gulp-eslint');
var browserify  = require('browserify');
var uglify      = require('gulp-uglify');
var KarmaServer = require('karma').Server;

module.exports = function(cfg) {

  var SCRIPT_SRC_DIR = cfg.srcdir+'/assets';
  var SCRIPT_BUILD_DIR = cfg.distdir;

  var SCRIPT_SRC_FILE = SCRIPT_SRC_DIR+'/index.js';
  var SCRIPT_BUILD_FILE = SCRIPT_BUILD_DIR+'/bundled.js';

  var SCRIPT_SRC_GLOB = [
    '!'+SCRIPT_SRC_DIR+'/node_modules/**/*.js', '!'+SCRIPT_SRC_DIR+'/**/node_modules/**/*.js', //ignore scripts from node_modules
    SCRIPT_SRC_DIR+'/*.js', SCRIPT_SRC_DIR+'/**/*.js' //include our scripts
  ];

  var SCRIPT_TESTS_GLOB = [
    '!'+SCRIPT_SRC_DIR+'/node_modules/**/*.js', '!'+SCRIPT_SRC_DIR+'/**/node_modules/**/*.js', //ignore scripts from node_modules
    SCRIPT_SRC_DIR+'/**/test/**/*.js' //include our scripts
  ];

  var SCRIPT_OPTIONS = {
    debug:    true,
    bare:     true,
    entries:  SCRIPT_SRC_FILE
  };

  var SCRIPT_LINT_OPTIONS = null;
  if (process.argv.indexOf('--debug') !== -1) {
    SCRIPT_LINT_OPTIONS = {
      configFile: "jameslnewell/debug"
    };
  }

  /*==================================
   * Clean scripts
   *==================================*/

  gulp.task('scripts.clean', function() {
    return del(['bundled.js', 'coverage/', 'mocha.json'], {cwd: cfg.distdir});
  });

  /*==================================
   * Lint scripts
   *==================================*/

  gulp.task('scripts.lint', function() {
    return gulp.src(SCRIPT_SRC_GLOB)
      .pipe(eslint(SCRIPT_LINT_OPTIONS))
      .pipe(eslint.format('stylish'))
      .pipe(eslint.failOnError())
    ;
  });

  /*==================================
   * Bundle scripts
   *==================================*/

  gulp.task('scripts.bundle', function() {
    return browserify(SCRIPT_OPTIONS).bundle()
      .pipe(source('bundled.js'))
      .pipe(gulp.dest(SCRIPT_BUILD_DIR))
    ;
  });

  /*==================================
   * Watch scripts
   *==================================*/

  gulp.task('scripts.watch', function() {
    gulp.watch(SCRIPT_SRC_GLOB, ['scripts.lint', 'scripts.bundle']);
  });

  /*==================================
   * Test scripts
   *==================================*/

  gulp.task('scripts.test', function(done) {
    var reportsDirectory = path.resolve(cfg.distdir)+'/__reports__';
    mkdirp(reportsDirectory, function(err) {
      if (err) return done(err);
      var server = new KarmaServer({
        configFile: __dirname+'/../karma.conf.js',
        singleRun:  true,

        reporters:  ['dots', 'bamboo', 'coverage'/*, 'threshold'*/],
        browsers:   ['PhantomJS'],

        browserify: {
          debug:      true,
          transform:  ['browserify-istanbul']
        },

        coverageReporter: {
          dir: reportsDirectory+'/coverage',
          reporters: [
            {type: 'html'},
            {type: 'text-summary'}
          ]
        },

        thresholdReporter: {
          statements: 90,
          branches:   90,
          functions:  90,
          lines:      90
        },

        bambooReporter:{
          filename: reportsDirectory+'/mocha.json'
        }

      }, done);
      server.start();
    });
  });

  gulp.task('scripts.debug', function(done) {
    var server = new KarmaServer({
      configFile: __dirname+'/../karma.conf.js',
      singleRun:  false
    }, done);
    server.start();
  });

  /*==================================
   * Optimise scripts
   *==================================*/

  gulp.task('scripts.optimise', function() {
    return gulp.src(cfg.distdir+'/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest(cfg.distdir))
    ;
  });

};
