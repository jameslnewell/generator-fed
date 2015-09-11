var gulp        = require('gulp');
var path        = require('path');
var metalsmith  = require('metalsmith');
var minHTML     = require('gulp-htmlmin');
var rootPath    = require('metalsmith-rootpath');
var templates   = require('metalsmith-templates');

module.exports = function(cfg) {

  var CONTENT_SRC_DIR = cfg.srcdir+'/static';
  var CONTENT_SRC_GLOB = cfg.srcdir+'/static/**/*';

  /*==================================
   * Build content
   *==================================*/

  gulp.task('content.build', function(done) {

    var
      src   = './content',
      dest  = path.relative(CONTENT_SRC_DIR, cfg.distdir)
    ;

    metalsmith(CONTENT_SRC_DIR)
      .clean(false)
      .source(src)
      .destination(dest)
      .use(rootPath())
      .use(templates('ejs'))
      .build(done)
    ;

  });

  /*==================================
   * Watch content
   *==================================*/

  gulp.task('packages.watch', function() {
    gulp.watch(CONTENT_SRC_GLOB, ['content.build']);
  });

  /*==================================
   * Optimise content
   *==================================*/

  gulp.task('content.optimise', function() {
    return gulp.src(cfg.distdir+'/**/*.html')
      .pipe(minHTML({
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true
      }))
      .pipe(gulp.dest(cfg.distdir))
    ;
  });
};