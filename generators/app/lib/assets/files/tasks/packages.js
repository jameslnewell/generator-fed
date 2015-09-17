var gulp        = require('gulp');
var sequence    = require('run-sequence');

var queue       = require('queue');
var npm         = require('npm-cmd');
var linklocal   = require('linklocal');
var fs          = require('fs');
var del         = require('del');
var finder      = require('finder-on-steroids');

module.exports = function(cfg) {

  var PACKAGE_SRC_DIR = cfg.srcdir+'/assets';
  var PACKAGE_BUILD_DIR = cfg.distdir;

  var PACKAGE_SRC_GLOB = [
    '!'+PACKAGE_SRC_DIR+'/node_modules/**/*.js', '!'+PACKAGE_SRC_DIR+'/**/node_modules/**/*.js', //ignore packages from node_modules
    PACKAGE_SRC_DIR+'/*.json', PACKAGE_SRC_DIR+'/**/*.json' //include our packages
  ];

  /*==================================
   * Uninstall packages
   *==================================*/

  gulp.task('packages.uninstall', function(done) {
    finder(PACKAGE_SRC_DIR).directories()
      .name('node_modules')
      .filter(function(path, stat) {
        return (path.match(/node_modules/g) || []).length === 1;
      })
      .find(function(err, directories) {
        if (err) return done(err);
        del(directories).then(done).catch(done);
      });
  });

  /*==================================
   * Install packages
   *==================================*/

  gulp.task('packages.install', function(done) {
    var q = queue({concurrency: 1});

    //run `npm install` in the main dir
    q.push(function(next) {
      npm.install({cwd: PACKAGE_SRC_DIR}, function(err) {
        if (err) {
          next(new Error('`npm install` failed in '+PACKAGE_SRC_DIR+':\n'+err.stderr));
        } else {
          next(null);
        }
      });
    });

    //run `npm install` on every locally linked dir (because install won't traverse packages already in node_modules)
    linklocal.link.recursive(PACKAGE_SRC_DIR, function(err, links) {
      if (err) return done(err);

      links.forEach(function(link) {
        q.push(function(next) {
          npm.install({cwd: link.to}, function(err) {
            if (err) {
              next(new Error('`npm install` failed in '+link.to+':\n'+err.stderr));
            } else {
              next(null);
            }
          });
        });
      });

      q.start(function(err) {
        done(err);
      });

    });
  });

  /*==================================
   * Dedupe packages
   *==================================*/

  gulp.task('packages.dedupe', function(done) {
    npm.dedupe({cwd: PACKAGE_SRC_DIR}, done);
  });

  /*==================================
   * Watch packages
   *==================================*/

  gulp.task('packages.watch', function() {
    gulp.watch(PACKAGE_SRC_GLOB, ['packages.install']);
  });

};