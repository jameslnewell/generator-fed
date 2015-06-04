var gulp = require('gulp');
var gif = require('gulp-if');
var installer = require('gulp-install');
var gutil = require('gulp-util');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sequence = require('run-sequence');
var through = require('through2');

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var jshint = require('gulp-jshint');
var browserify = require('browserify');
var watchify = require('watchify');
var mochify = require('mochify');
var istanbul = require('mochify-istanbul');

var composer = require('sass-composer');

var minimist = require('minimist');

var chokidar = require('chokidar');

var prod = minimist(process.argv.slice(2)).prod;

var SRC_DIR = __dirname + '/assets';
var BUILD_DIR = __dirname + '/assets/build';

/******************************************************************************************
 * Assets
 ******************************************************************************************/

gulp.task('assets.clean', function (done) {
  rimraf(BUILD_DIR, function (err) {
    if (err) done(err);
    mkdirp(BUILD_DIR, done);
  });
});

/******************************************************************************************
 * Scripts
 ******************************************************************************************/

var SCRIPT_SRC_FILE = SRC_DIR + '/index.js';
var SCRIPT_BUILD_FILE = BUILD_DIR + '/build.js';

var script_options = {
  debug: prod,
  bare: true,
  entries: SCRIPT_SRC_FILE
};

function browserifier(bundler) {
  return bundler.bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(gif(prod, uglify()))
    .pipe(gulp.dest(BUILD_DIR))
    ;
}

gulp.task('scripts.lint', function () {
  return gulp.src([
    '!' + SRC_DIR + '/build/*.js', '!' + SRC_DIR + '/build/**/*.js', '!' + SRC_DIR + '/node_modules/**/*.js', '!' + SRC_DIR + '/**/node_modules/**/*.js',
    SRC_DIR + '/*.js', SRC_DIR + '/**/*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}))
    .pipe(jshint.reporter('fail'))
    ;
});

gulp.task('scripts.build', function () {
  return browserifier(browserify(script_options));
});

gulp.task('scripts.watch', function () {

  var bundler = watchify(browserify(script_options))
      .on('log', gutil.log)
      .on('update', function (files) {

        //make the file paths relative to the root dir
        files = files.map(function (file) {
          return path.relative(__dirname, file);
        });

        //log
        gutil.log(gutil.colors.blue('scripts changed:'), files.join(','));
        gutil.log(gutil.colors.blue('scripts building...'));

        //bundle the scripts
        return browserifier(bundler);
      })
    ;

  process.once('SIGINT', function () {
    bundler.close();
  });

  return browserifier(bundler);
});

function mochifier(opts, done) {

  var output = through()
      .pipe(process.stdout)
      .on('end', function() {
        done();
      })
    ;

  var b = mochify(SRC_DIR + '/**/test/*.js', {
      output: output,
      cover:  true,
      glob: {
        ignore: [
          SRC_DIR + '/**/node_modules/**/test/*.js'
        ]
      }
    })
      .on('error', function(err) {
        done(err);
      })
    ;

  //if (opts.cover) {
  //  b.plugin(istanbul, {
  //    dir:      BUILD_DIR+'/coverage',
  //    //exclude:  ['test/**', '**/node_modules/**/*'],
  //    report:   ['text', 'html']
  //  });
  //}

  b.bundle();
}

gulp.task('scripts.test', function(done) {
  mochifier({}, done);
});

/******************************************************************************************
 * Styles
 ******************************************************************************************/

var STYLE_SRC_FILE = SRC_DIR + '/index.scss';
var STYLE_BUILD_FILE = BUILD_DIR + '/build.css';

gulp.task('styles.build', function () {
  return composer()
    .entry(STYLE_SRC_FILE)
    .use(composer.plugins.url({dir: BUILD_DIR}))
    .compose()
    .pipe(source('build.css'))
    .pipe(buffer())
    .pipe(prefixer({browsers: ['last 2 versions']}))
    .pipe(gif(prod, minify()))
    .pipe(gulp.dest(BUILD_DIR))
    ;
});

gulp.task('styles.watch', function (done) {
  gutil.log(gutil.colors.red('Not implemented yet'));
  done();
});

/******************************************************************************************
 * Packages
 ******************************************************************************************/

gulp.task('package.link', function (done) {
  exec('node ./node_modules/linklocal/bin/linklocal.js link -r -f "%s"', {cwd: SRC_DIR}, function (err, stdout, stderr) {
    if (err) return console.log(stderr, stdout) && done(err);
    console.log(stderr);
    done();
  });
});

gulp.task('package.install', function () {
  return gulp.src(['!node_modules/**/package.json', '!**/node_modules/**/package.json', SRC_DIR + '/package.json', SRC_DIR + '/**/package.json'])
    .pipe(installer())
    ;
});

gulp.task('package.watch', function () {

  var watcher = chokidar.watch(['package.json'], {})
      .on('change', function () {
        gulp.start('package.link', 'package.install');
      })
    ;

  process.once('SIGINT', function () {
    watcher.close();
  });

  return gulp.start('package.install');
});

/******************************************************************************************
 * Common
 ******************************************************************************************/

gulp.task('watch', function (done) {
  sequence(['package.watch', 'scripts.watch', 'styles.watch'], done);
});

gulp.task('clean', function (done) {
  sequence(['assets.clean'], done);
});

gulp.task('build', function (done) {
  sequence('scripts.lint', ['scripts.build', 'styles.build'], done);
});

gulp.task('test', function (done) {
  sequence(['scripts.test'], done);
});

gulp.task('default', function (done) {
  sequence('build', done);
});

gulp.task('all', function (done) {
  sequence('clean', 'build', 'test', done);
});
