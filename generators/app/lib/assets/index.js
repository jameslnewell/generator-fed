var content = require('./content');
var scripts = require('./scripts');
var styles = require('./styles');

module.exports = function(config) {
  var configWithAssets = Object.assign({}, config);

  if (config.lang === 'universal') {

    configWithAssets.tasks = Object.assign({}, config.tasks, {
      lint: [
        'scripts.lint'
      ],
      build: [
        //remove the rev-manifest.json so the server uses the newly built files
        ['clean.rev-manifest', 'lint'],
        ['scripts.bundle', 'styles.bundle']
      ],
      test: [
        'scripts.test'
      ],
      'test.watch': [
        'scripts.test.watch'
      ],
      optimise: [
        ['scripts.optimise', 'styles.optimise'],
        'cachebust'
      ],
      watch: [
        //remove the rev-manifest.json so the server uses the newly built files
        ['clean.rev-manifest', 'scripts.watch', 'styles.watch']
      ]
    });

    configWithAssets = scripts(configWithAssets);
    configWithAssets = styles(configWithAssets);

  } else {

    configWithAssets.tasks = Object.assign({}, config.tasks, {
      lint: [
        'scripts.lint'
      ],
      build: [
        'lint',
        ['scripts.bundle', 'styles.bundle', 'content.build']
      ],
      test: [
        'scripts.test'
      ],
      'test.watch': [
        'scripts.test.watch'
      ],
      optimise: [
        ['scripts.optimise', 'styles.optimise', 'images.optimise'],
        'cachebust'
      ],
      watch: [
        ['scripts.watch', 'styles.watch', 'content.watch']
      ]
    });

    configWithAssets = content(configWithAssets);
    configWithAssets = scripts(configWithAssets);
    configWithAssets = styles(configWithAssets);

  }

  configWithAssets.scripts = Object.assign({}, configWithAssets.scripts, {
    'build': 'gulp all',
    'test': 'gulp test'
  });

  return configWithAssets;
};
