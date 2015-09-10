var gulp        = require('gulp');
var sequence    = require('run-sequence');

var cfg = {
  srcdir: './src',
  distdir: './dist'
};

require('./tasks/general')(cfg);
require('./tasks/packages')(cfg);
require('./tasks/scripts')(cfg);
require('./tasks/styles')(cfg);

gulp.task('install', function(done) {
  sequence('packages.install', 'packages.dedupe', done);
});

gulp.task('bundle', function(done) {
  sequence('scripts.lint', ['styles.bundle', 'scripts.bundle'], done);
});

gulp.task('optimise', function(done) {
  sequence(['styles.optimise', 'scripts.optimise', 'images.optimise'], 'cachebust', done);
});

gulp.task('test', function(done) {
  sequence('scripts.test', done);
});

gulp.task('debug', function(done) {
  sequence('scripts.debug', done);
});

gulp.task('watch', function(done) {
  sequence(['packages.watch', 'styles.watch', 'scripts.watch', done]);
});

//============================================================

gulp.task('default', ['bundle']);

gulp.task('all', function(done) {
  sequence('clean', 'install', 'bundle', 'optimise', 'test', done);
});