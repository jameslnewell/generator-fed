
/**
 * Test scripts in the browser
 * @param   {object} config
 * @returns {object}
 */
module.exports = function(config) {
  var configWithScripts = Object.assign({}, config);

  configWithScripts.devDependencies = Object.assign({}, configWithScripts.devDependencies, {
    'chai': '^3.4.1',
    'phantomjs-polyfill': '0.0.1'
  });

  configWithScripts.buildDependencies = Object.assign({}, configWithScripts.buildDependencies, {
    'browserify-istanbul': '^0.2.1',
    'gulp': '^3.9.0',
    'karma': '^0.13.15',
    'karma-bamboo-reporter': '^0.1.1',
    'karma-browserify': '^4.4.0',
    'karma-coverage': '^0.5.3',
    'karma-mocha': '^0.2.1',
    'karma-phantomjs-launcher': '^0.2.1',
    'karma-source-map-support': '^1.1.0',
    //'karma-threshold-reporter': '^0.1.15',
    'mkdirp': '^0.5.1',
    'mocha': '^2.2.5',
    'phantomjs': '^1.9.18'
  });

  configWithScripts.files = configWithScripts.files.concat([
    {src: './assets/scripts/unittest-browser/**', dest: '.'}
  ]);

  return configWithScripts;
};
