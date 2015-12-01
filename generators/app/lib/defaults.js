
/**
 * The default config fields
 * @param   {Object} config
 * @returns {Object}
 */
module.exports = function(config) {
  var configWithDefaults = Object.assign({}, config || {});

  configWithDefaults.name = configWithDefaults.name || '';
  configWithDefaults.lang = configWithDefaults.lang || '';

  configWithDefaults.dependencies = configWithDefaults.dependencies || {};
  configWithDefaults.devDependencies = configWithDefaults.devDependencies || {};
  configWithDefaults.buildDependencies = configWithDefaults.buildDependencies || {};

  configWithDefaults.tasks = configWithDefaults.tasks || {};
  configWithDefaults.ignores = configWithDefaults.ignores = [];
  configWithDefaults.transforms = configWithDefaults.transforms = [];
  configWithDefaults.scripts = configWithDefaults.scripts = {};

  configWithDefaults.scriptPath = configWithDefaults.scriptPath || 'index.js';
  configWithDefaults.scriptsDirectory = configWithDefaults.scriptsDirectory || './src/assets';
  configWithDefaults.stylesDirectory = configWithDefaults.stylesDirectory || './src/assets';
  configWithDefaults.contentDirectory = configWithDefaults.contentDirectory || './src/content';

  configWithDefaults.files = configWithDefaults.files || [];
  configWithDefaults.templates = configWithDefaults.templates || [];

  return configWithDefaults;
};
