var es5 = require('./es5');
var es6 = require('./es6');
var react = require('./react');
var unitTestInBrowser = require('./unittest-in-browser');

/**
 * Bundle scripts
 * @param   {object} config
 * @returns {object}
 */
module.exports = function(config) {
  var configWithScripts = Object.assign({}, config);

  configWithScripts.buildDependencies = Object.assign({}, configWithScripts.buildDependencies, {
    'browserify': '^12.0.1',
    'browserify-incremental': '^3.0.1',
    'envify': '^3.4.0',
    'eslint-config-jameslnewell': '^0.3.3',
    'gulp': '^3.9.0',
    'gulp-eslint': '^1.0.0',
    'gulp-uglify': '^1.2.0',
    'gulp-util': '^3.0.7',
    'run-sequence': '^1.1.0',
    'vinyl-buffer': '^1.0.0',
    'vinyl-source-stream': '^1.1.0',
    'watchify': '^3.6.0'
  });

  configWithScripts.files = configWithScripts.files.concat([
    {src: './assets/scripts/common/tasks/**', dest: './tasks'}
  ]);

  switch (configWithScripts.lang) {

    case 'es5':
      configWithScripts = es5(configWithScripts);
      configWithScripts = unitTestInBrowser(configWithScripts);
      break;

    case 'es6':
      configWithScripts = es6(configWithScripts);
      configWithScripts = unitTestInBrowser(configWithScripts);
      break;

    case 'react':
    case 'universal':
      configWithScripts = react(configWithScripts);
      break;

    default:
      throw new Error('Unsupported scripting language.');

  }

  return configWithScripts;
};
