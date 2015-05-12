var gulp        = require('gulp');
var gif         = require('gulp-if');
var installer   = require('gulp-install');
var gutil       = require('gulp-util');
var prefixer    = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var minify      = require('gulp-minify-css');
var sequence    = require('run-sequence');

var fs          = require('fs');
var path        = require('path');
var rimraf      = require('rimraf');
var exec        = require('child_process').exec

var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');

var browserify  = require('browserify');
var watchify    = require('watchify');
var mochify     = require('mochify');

var composer    = require('sass-composer');

var minimist    = require('minimist');

var chokidar    = require('chokidar');

var debug       = minimist(process.argv.slice(2)).debug;

var SRC_DIR     = __dirname;
var BUILD_DIR   = __dirname+'/build';

/******************************************************************************************
 * Scripts
 ******************************************************************************************/

var SCRIPT_SRC_FILE   = SRC_DIR+'/index.js';
var SCRIPT_BUILD_FILE = BUILD_DIR+'/build.js';

var script_options = {
  debug:    debug,
  bare:     true,
  entries:  SCRIPT_SRC_FILE
};

function bundle_scripts(bundler) {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(gif(!debug, uglify()))
    .pipe(gulp.dest(BUILD_DIR))
    ;
}

gulp.task('scripts.clean', function(done) {
  rimraf(SCRIPT_BUILD_FILE, done);
});

gulp.task('scripts.build', ['scripts.clean'], function() {
  return bundle_scripts(browserify(script_options));
});

gulp.task('scripts.test', function() {
  return mochify({cover: true}).bundle();
});

gulp.task('scripts.watch', function() {

  var bundler = watchify(browserify(script_options))
      .on('log', gutil.log)
      .on('update', function(files) {

        //make the file paths relative to the root dir
        files = files.map(function(file) {
          return path.relative(__dirname, file);
        });

        //log
        gutil.log(gutil.colors.blue('scripts changed:'), files.join(','));
        gutil.log(gutil.colors.blue('scripts building...'));

        //bundle the scripts
        return bundle_scripts(bundler);
      })
    ;

  process.once('SIGINT', function() {
    bundler.close();
  });

  return bundle_scripts(bundler);

});

/******************************************************************************************
 * Styles
 ******************************************************************************************/

var STYLE_SRC_FILE   = SRC_DIR+'/index.scss';
var STYLE_BUILD_FILE = BUILD_DIR+'/build.css';

gulp.task('styles.clean', function(done) {
  rimraf(STYLE_BUILD_FILE, done);
});

gulp.task('styles.build', ['styles.clean'], function(done) {
  return composer()
    .entry(STYLE_SRC_FILE)
    .use(composer.plugins.url({dir: BUILD_DIR}))
    .compose()
      .pipe(source('build.css'))
      .pipe(buffer())
      .pipe(prefixer({browsers: ['last 2 versions']}))
      .pipe(gif(!debug, minify()))
      .pipe(gulp.dest(BUILD_DIR))
    ;
});

gulp.task('styles.watch', function(done) {
  gutil.log(gutil.colors.red('Not implemented yet'));
  done();
});

/******************************************************************************************
 * Packages
 ******************************************************************************************/

gulp.task('package.link', function(done) {
  exec('node ./node_modules/linklocal/bin/linklocal.js link -r -f "%s"', function (err, stdout, stderr) {
    if (err) return console.log(stderr, stdout) && done(err);
    console.log(stderr);
    done();
  });
});

gulp.task('package.install', function() {
  var gignore = require('gulp-ignore');
  return gulp.src(['!node_modules/**/package.json', '!**/node_modules/**/package.json', 'package.json', '**/package.json'])
    .pipe(installer())
    ;
});

gulp.task('package.watch', function() {

  chokidar.watch(['package.json'], {})
    .on('change', function() {
      gulp.start('package.link', 'package.install');
    })
  ;

  process.once('SIGINT', function() {
    chokidar.close();
  });

  return gulp.start('package.install');
});

/******************************************************************************************
 * Common
 ******************************************************************************************/

gulp.task('watch', function(done) {
  sequence(['package.watch', 'scripts.watch', 'styles.watch'], done);
});

gulp.task('build', function(done) {
  sequence(['scripts.build', 'styles.build'], done);
});

gulp.task('test', function(done) {
  sequence(['scripts.test'], done);
});

gulp.task('default', function(done) {
  sequence('build', 'test', done);
});
