module.exports = function(config) {

  config.set({

    basePath: 'src/assets',

    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js', //polyfill .bind() for phantom JS <v2.0
      '**/test/**/*.js'  //test files
    ],

    exclude: [
      '**/node_modules/!(phantomjs-polyfill)/**'
    ],

    preprocessors: {
      'test/**/*.js':      ['browserify'],
      '**/test/**/*.js':   ['browserify']
    },

    frameworks: ['mocha', 'browserify', 'source-map-support'],
    browsers:   [],
    reporters:  ['dots'],

    browserify: {
      debug: true
    },

    client: {
      mocha: {
        reporter: 'html'
      }
    },

    port:       9876,
    colors:     true,
    autoWatch:  true,
    singleRun:  true,
    logLevel:   config.LOG_WARN

  });
};