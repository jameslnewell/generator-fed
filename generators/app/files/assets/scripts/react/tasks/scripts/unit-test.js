require('babel-core/register');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');

module.exports = function(cfg) {

  gulp.task('scripts.test.bamboo', function() {
    process.env.MOCHA_FILE = cfg.distdir + '/__reports__/mocha.json';
    return gulp.src(cfg.assetsdir + '/test/**/*.js')
      .pipe(mocha({
        reporter: 'mocha-bamboo-reporter',
        output: cfg.distdir + '/__reports__/mocha.json'
      }))
    ;
  });

  gulp.task('scripts.test.instrument', function() {
    return gulp.src(['!' + cfg.assetsdir + '/test/**/*.js', cfg.assetsdir + '/**/*.js'])
      .pipe(istanbul({
        instrumenter: isparta.Instrumenter
      }))
      .pipe(istanbul.hookRequire())
    ;
  });

  gulp.task('scripts.test', ['scripts.test.instrument'], function() {
    return gulp.src(cfg.assetsdir + '/test/**/*.js')
      .pipe(mocha())
      .pipe(istanbul.writeReports({
        dir: cfg.distdir + '/__reports__/coverage',
        reporters: ['text-summary', 'html']
      }))
    ;
  });

  gulp.task('scripts.test.watch', function() {
    gulp.watch(cfg.assetsdir + '/**/*.js', ['scripts.test']);
  });

};
