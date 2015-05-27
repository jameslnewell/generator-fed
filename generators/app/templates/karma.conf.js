module.exports = function(config) {
  config.set({

    basePath: 'assets',

    files: [

      'test/*.js',    //test files
      '**/test/*.js'  //test files
    ],

    exclude: [
      'node_modules/**',
      '**/node_modules/**'
    ],

    preprocessors: {
      'test/*.js':      ['browserify'],
      '**/test/*.js':   ['browserify']
    },

    frameworks: ['browserify', 'mocha'],
    browsers:   ['PhantomJS'],
    reporters:  ['mocha', 'coverage'],

    port:       9876,
    colors:     true,
    autoWatch:  true,
    singleRun:  true,
    logLevel:   config.LOG_WARN,

    browserify: {
      debug: true,
      transform: ['browserify-istanbul']
    },

    coverageReporter: {
      dir: './build/test/coverage',
      reporters: [
        {type: 'html'},
        {type: 'text-summary'}
      ]
    }

  });
};
