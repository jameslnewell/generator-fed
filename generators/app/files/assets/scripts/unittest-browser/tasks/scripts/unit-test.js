var path = require('path');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var Server = require('karma').Server;
var istanbul = require('browserify-istanbul');

var transforms = require('../../package.json').browserify.transform;

module.exports = function(cfg) {

  var configFile = __dirname + '/../../karma.conf.js';

  var testConfig = {

    configFile: configFile,

    autoWatch: false,
    singleRun: true,

    reporters: ['dots', 'bamboo', 'coverage'],

    browserify: {
      debug: true,
      transform: transforms.concat([istanbul()])
    },

    browsers: ['PhantomJS'],

    coverageReporter: {
      dir: path.resolve(__dirname + '/../..', cfg.reportsdir + '/coverage'),
      reporters: [
        {type: 'html'},
        {type: 'text-summary'}
      ]
    },

    bambooReporter: {
      filename: path.resolve(__dirname + '/../..', cfg.reportsdir + '/mocha.json')
    }

  };

  var debugTestConfig = {

    configFile: configFile,

    browserify: {
      debug: true,
      transform: transforms
    }

  };

  gulp.task('scripts.test', function(done) {
    mkdirp(cfg.reportsdir, function(err) {
      if (err) return done(err);
      new Server(testConfig, function(exitCode) {
        done(exitCode ? new Error('Tests failed.') : null);
      }).start();
    });
  });

  gulp.task('scripts.test.watch', function(done) {
    new Server(debugTestConfig, function(exitCode) {
      done(exitCode ? new Error('Tests failed.') : null);
    }).start();
  });

};
