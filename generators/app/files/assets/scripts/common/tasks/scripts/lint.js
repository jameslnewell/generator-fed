var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function(cfg) {

  var SCRIPT_SRC_DIR = cfg.assetsdir;

  var SCRIPT_SRC_GLOB = [
    SCRIPT_SRC_DIR + '/*.js', SCRIPT_SRC_DIR + '/**/*.js' //include our scripts
  ];

  var SCRIPT_LINT_OPTIONS = null;

  //in development: allow `console`, `debugger` and other statements for debugging purposes
  if (!cfg.production) {
    SCRIPT_LINT_OPTIONS = {
      configFile: 'jameslnewell/debug'
    };
  }

  gulp.task('scripts.lint', function() {
    return gulp.src(SCRIPT_SRC_GLOB)
      .pipe(eslint(SCRIPT_LINT_OPTIONS))
      .pipe(eslint.formatEach('stylish'))
      .pipe(eslint.failOnError())
    ;
  });

  gulp.task('scripts.lintAndIgnoreErrors', function() {
    return gulp.src(SCRIPT_SRC_GLOB)
      .pipe(eslint(SCRIPT_LINT_OPTIONS))
      .pipe(eslint.formatEach('stylish'))
    ;
  });

};
