
/**
 * The assets config for getting JS and CSS setup
 * @param   {Object} config
 * @returns {Object}
 */
module.exports = function(config) {
  var configWithAssets = Object.assign({}, config);

  configWithAssets.devDependencies = Object.assign({}, config.buildDependencies, {
    'phantomjs-polyfill': '0.0.1'
  });

  configWithAssets.buildDependencies = Object.assign({}, config.buildDependencies, {
    'autoprefixer': '^6.0.2',
    'browserify': '^12.0.1',
    'browserify-incremental': '^3.0.1',
    'browserify-istanbul': '^0.2.1',
    'envify': '^3.4.0',
    'eslint-config-jameslnewell': 'jameslnewell/eslint-config-jameslnewell',
    'gulp': '^3.9.0',
    'gulp-autoprefixer': '^3.0.1',
    'gulp-eslint': '^1.0.0',
    'gulp-minify-css': '^1.1.1',
    'gulp-uglify': '^1.2.0',
    'gulp-util': '^3.0.7',
    'karma': '^0.13.9',
    'karma-bamboo-reporter': '^0.1.0',
    'karma-browserify': '^4.2.1',
    'karma-coverage': '^0.4.2',
    'karma-mocha': '^0.2.0',
    'karma-phantomjs-launcher': '^0.2.1',
    'karma-source-map-support': '^1.1.0',
    'karma-threshold-reporter': '^0.1.15',
    'mkdirp': '^0.5.1',
    'mocha': '^2.2.5',
    'phantomjs': '^1.9.18',
    'run-sequence': '^1.1.0',
    'sass-composer': '2.0.0-beta9',
    'vinyl-buffer': '^1.0.0',
    'vinyl-source-stream': '^1.1.0',
    'watchify': '^3.6.0'
  });

  configWithAssets.tasks = Object.assign({}, config.tasks, {
    build: ['scripts.lint', ['scripts.bundle', 'styles.bundle', 'content.build']],
    test: ['scripts.test'],
    debug: ['scripts.debug'],
    optimise: [['scripts.optimise', 'styles.optimise', 'images.optimise'], 'cachebust'],
    watch: [['packages.watch', 'scripts.watch', 'styles.watch', 'content.watch']]
  });

  configWithAssets.files = config.files.concat([
    {src: 'assets/_/**', dest: './'}
  ]);

  if (config.lang === 'es5') {

    //use test file for ES5
    configWithAssets.files.push({
      src: 'assets/index.es5.js', dest: 'src/assets/test/index.js'
    });

  } else {

    if (config.lang === 'react') {

      //compile ES6+JSX
      configWithAssets.transforms = configWithAssets.transforms.concat([
        ['babelify', {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }]
      ]);

      configWithAssets.dependencies = Object.assign({}, configWithAssets.dependencies, {
        'react': '^0.14.2',
        'react-dom': '^0.14.2'
      });

      configWithAssets.buildDependencies = Object.assign({}, configWithAssets.buildDependencies, {
        'babelify': '^7.2.0',
        'babel-plugin-transform-object-rest-spread': '^6.0.14',
        'babel-preset-es2015': '^6.0.15',
        'babel-preset-react': '^6.0.15'
      });

    } else {

      //compile ES6
      configWithAssets.transforms = configWithAssets.transforms.concat([
        ['babelify', {
          presets: ['es2015']
        }]
      ]);

      configWithAssets.buildDependencies = Object.assign({}, configWithAssets.buildDependencies, {
        'babelify': '^7.2.0',
        'babel-preset-es2015': '^6.0.15'
      });

    }

    configWithAssets.buildDependencies = Object.assign({}, configWithAssets.buildDependencies, {
      'istanbul': "git://github.com/gotwarlost/istanbul.git#source-map",
    });

    //use test file for ES6
    configWithAssets.files.push({
      src: 'assets/index.es6.js', dest: 'src/assets/test/index.js'
    });

  }

  return configWithAssets;
};
