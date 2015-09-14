var gulp        = require('gulp');
var path        = require('path');
var minHTML     = require('gulp-htmlmin');
var metalsmith  = require('metalsmith');
var rename      = require('metalsmith-rename');
var layouts     = require('metalsmith-layouts');
var templates   = require('metalsmith-in-place');
var rootPath    = require('metalsmith-rootpath');
var filepath    = require('metalsmith-filepath');

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
      .use(rename([[/\.ejs$/, '.html']]))
      .use(rootPath())
      .use(filepath({absolute: false}))
      .use(templates({engine: 'ejs', partials: './templates', pattern: '**/*.html'}))
      .use(layouts({engine: 'ejs', directory: './layouts', default: 'index.ejs', pattern: '**/*.html'}))
      .build(done)
    ;

  });

  /*==================================
   * Watch content
   *==================================*/

  gulp.task('content.watch', function() {
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