module.exports = function(config) {
  config.set({

    basePath: 'src/assets',

    browserify: {
      debug: true
    },

    client: {
      mocha: {
        reporter: 'html'
      }
    },

    files: [

      //polyfill .bind() for phantom JS <v2.0
      '../../node_modules/phantomjs-polyfill/bind-polyfill.js',

      //test files
      'test/**/*.js'

    ],

    frameworks: ['mocha', 'browserify', 'source-map-support'],

    preprocessors: {
      'test/**/*.js': ['browserify']
    },

    reporters: ['dots']

  });
};
