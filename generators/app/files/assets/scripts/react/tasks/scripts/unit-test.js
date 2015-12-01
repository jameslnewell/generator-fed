require('babel-core/register');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');

module.exports = function(cfg) {

  gulp.task('scripts.test.bamboo', function() {
    process.env.MOCHA_FILE = cfg.destDir + '/__reports__/mocha.json';
    return gulp.src(cfg.scriptsDir + '/test{,s}/**/*.{js,jsx}')
      .pipe(mocha({
        reporter: 'mocha-bamboo-reporter',
        output: cfg.reportsDir + '/mocha.json'
      }))
    ;
  });

  gulp.task('scripts.test.instrument', function() {
    return gulp.src(['!' + cfg.scriptsDir + '/**/test{,s}/**/*.{js,jsx}', cfg.scriptsDir + '/**/*.{js,jsx}'])
      .pipe(istanbul({
        instrumenter: isparta.Instrumenter
      }))
      .pipe(istanbul.hookRequire())
    ;
  });

  gulp.task('scripts.test', ['scripts.test.instrument'], function() {
    return gulp.src(cfg.scriptsDir + '/**/test{,s}/**/*.{js,jsx}')
      .pipe(mocha())
      .pipe(istanbul.writeReports({
        dir: cfg.reportsDir + '/coverage',
        reporters: ['text-summary', 'html']
      }))
    ;
  });

  gulp.task('scripts.test.watch', function() {
    gulp.watch(cfg.scriptsDir + '/**/*.{js,jsx}', ['scripts.test']);
  });

};
