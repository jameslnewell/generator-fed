var content = require('./content');
var scripts = require('./scripts');
var styles = require('./styles');

module.exports = function(config) {
  var configWithAssets = Object.assign({}, config);

  configWithAssets.tasks = Object.assign({}, config.tasks, {
    build: ['scripts.lint', ['scripts.bundle', 'styles.bundle', 'content.build']],
    test: ['scripts.test'],
    'test.watch': ['scripts.test.watch'],
    optimise: [['scripts.optimise', 'styles.optimise', 'images.optimise'], 'cachebust'],
    watch: [['scripts.watch', 'styles.watch', 'content.watch']]
  });

  configWithAssets = content(configWithAssets);
  configWithAssets = scripts(configWithAssets);
  configWithAssets = styles(configWithAssets);

  return configWithAssets;
};
