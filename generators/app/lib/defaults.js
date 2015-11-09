
/**
 * The default config fields
 * @param   {Object} config
 * @returns {Object}
 */
module.exports = function(config) {
  var configWithDefaults = Object.assign({}, config || {});

  configWithDefaults.name = config.name || '';
  configWithDefaults.lang = config.lang || '';

  configWithDefaults.dependencies = configWithDefaults.dependencies || {};
  configWithDefaults.devDependencies = configWithDefaults.devDependencies || {};
  configWithDefaults.buildDependencies = configWithDefaults.buildDependencies || {};

  configWithDefaults.tasks = config.tasks || {};
  configWithDefaults.ignores = configWithDefaults.ignores = [];
  configWithDefaults.transforms = configWithDefaults.transforms = [];

  configWithDefaults.files = configWithDefaults.files || [];
  configWithDefaults.templates = configWithDefaults.templates || [];

  return configWithDefaults;
};
