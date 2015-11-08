

function defaults(options) {
  var optionsWithDefaults = options || {};

  optionsWithDefaults.files = optionsWithDefaults.files || [];
  optionsWithDefaults.templates = optionsWithDefaults.dependencies || [];

  optionsWithDefaults.dependencies = optionsWithDefaults.dependencies || {};
  optionsWithDefaults.devDependencies = optionsWithDefaults.devDependencies || {};
  optionsWithDefaults.buildDependencies = optionsWithDefaults.buildDependencies || {};

  optionsWithDefaults.browserifyTransforms = optionsWithDefaults.browserifyTransforms = [];
  optionsWithDefaults.gitIgnores = optionsWithDefaults.gitIgnores = [];

  return optionsWithDefaults;
}





module.exports = function(options) {
  return options;
};
