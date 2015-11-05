var path        = require('path');
var gulp        = require('gulp');
var del         = require('del');
var mkdirp      = require('mkdirp');
var sequence    = require('run-sequence');
var source      = require('vinyl-source-stream');

var logger      = require('gulp-util');
var eslint      = require('gulp-eslint');
var browserify  = require('browserify');
var incremental = require('browserify-incremental');
var watchify    = require('watchify');
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

  /**
   * Create the bundler
   * @param   {boolean}     [watch]
   * @returns {browserify}
   */
  function createBundler(watch) {
    var config;

    if (watch) {
      config = Object.assign({}, watchify.args, SCRIPT_OPTIONS);
    } else {
      config = Object.assign({}, incremental.args, SCRIPT_OPTIONS);
    }

    var bundler = browserify(config);

    if (watch) {
      bundler = watchify(bundler);
    } else {
      bundler = incremental(bundler, {cacheFile: './browserify-cache.json'}); //TODO: move this somewhere else?
    }

    return bundler;
  }

  /**
   * Perform the bunlding
   * @param   {browserify}  bundler
   * @param   {object}      options
   * @returns {stream}
   */
  function createBundle(bundler, options) {
    options = options || {}; //TODO: handle errors
    return bundler.bundle()
      .pipe(source('bundled.js'))
      .pipe(gulp.dest(SCRIPT_BUILD_DIR))
    ;
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

  function lint() {
    return gulp.src(SCRIPT_SRC_GLOB)
      .pipe(eslint(SCRIPT_LINT_OPTIONS))
      .pipe(eslint.format('stylish'))
    ;
  }

  function lintAndFail() {
    return gulp.src(SCRIPT_SRC_GLOB)
      .pipe(eslint(SCRIPT_LINT_OPTIONS))
      .pipe(eslint.format('stylish'))
      .pipe(eslint.failOnError())
    ;
  }

  gulp.task('scripts.lint', lint);
  gulp.task('scripts.lintAndFail', lintAndFail);

  /*==================================
   * Bundle scripts
   *==================================*/

  gulp.task('scripts.bundle', function() {
    return createBundle(createBundler());
  });

  /*==================================
   * Watch scripts
   *==================================*/

  gulp.task('scripts.watch', function() {
    var bundler = createBundler(true);

    bundler.on('update', function() {
      logger.log('bundling scripts...');
      return sequence('scripts.lint', function() {
        return createBundle(bundler)
      });
    });

    bundler.on('time', function(time) {
      logger.log('bundled scripts in '+(time/1000)+'s');
    });

    return sequence('scripts.lint', function() {
      return createBundle(bundler)
    });
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
