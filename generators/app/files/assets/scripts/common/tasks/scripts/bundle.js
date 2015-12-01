var path = require('path');
var gulp = require('gulp');

var sequence = require('run-sequence');
var source = require('vinyl-source-stream');

var logger = require('gulp-util');
var browserify = require('browserify');
var incremental = require('browserify-incremental');
var watchify = require('watchify');

var package = require('../../package.json');

module.exports = function(cfg) {

  var SCRIPT_SRC_DIR = cfg.scriptsDir;
  var SCRIPT_BUILD_DIR = cfg.destDir;

  var SCRIPT_SRC_FILE = path.join(SCRIPT_SRC_DIR, cfg.scriptPath);
  var SCRIPT_BUILD_FILE = SCRIPT_BUILD_DIR + '/bundled.js';

  var SCRIPT_SRC_GLOB = [
    SCRIPT_SRC_DIR + '/*.{js,jsx}', SCRIPT_SRC_DIR + '/**/*.{js,jsx}' //include our scripts
  ];

  /**
   * Create the bundler
   * @param   {boolean}     [watch]
   * @returns {browserify}
   */
  function createBundler(watch) {
    var config = {
      debug: !cfg.production,
      entries: SCRIPT_SRC_FILE,
      extensions: ['.js', '.json', '.jsx']
    };

    if (watch) {
      config = Object.assign({}, watchify.args, config);
    } else if (!cfg.production) {

      //in development: use incremental builds to make them faster
      config = Object.assign({}, incremental.args, config);

    }

    var bundler = browserify(config);

    //in production: replace process.env.NODE_ENV with the actual value,
    // so that uglify can strip dead code in production
    if (cfg.production) {
      bundler.transform('envify', {
        global: true,
        _: 'purge',
        NODE_ENV: 'production'
      });
    }

    //apply transforms from browserify.transform in package.json
    if (package && package.browserify && package.browserify.transform) {
      package.browserify.transform.forEach(function(transform) {
        if (Array.isArray(transform)) {
          bundler.transform.call(bundler, transform[0], transform[1]);
        } else {
          bundler.transform(transform);
        }
      });
    }

    if (watch) {
      bundler = watchify(bundler);
    } else if (!cfg.production) {

      //in development: use incremental builds to make them faster
      bundler = incremental(bundler, {cacheFile: './dist/.browserify-cache'});

    }

    return bundler;
  }

  /**
   * Perform the bunlding
   * @param   {browserify}  bundler
   * @param   {object}      [options]
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
      return sequence('scripts.lintAndIgnoreErrors', function() {
        logger.log('bundling scripts...');
        return createBundle(bundler);
      });
    });

    bundler.on('time', function(time) {
      logger.log('bundled scripts in ' + time / 1000 + 's');
    });

    return sequence('scripts.lintAndIgnoreErrors', function() {
      logger.log('bundling scripts...');
      return createBundle(bundler);
    });
  });

};
