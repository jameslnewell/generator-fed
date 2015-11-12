
/**
 * Configure the styles
 * @param   {Object} config
 * @returns {Object}
 */
module.exports = function(config) {
  var configWithStyles = Object.assign({}, config || {});

  configWithStyles.buildDependencies = Object.assign({}, configWithStyles.buildDependencies, {
    'autoprefixer': '^6.0.2',
    'gulp': '^3.9.0',
    'gulp-autoprefixer': '^3.0.1',
    'gulp-minify-css': '^1.1.1',
    'gulp-util': '^3.0.7',
    'sass-composer': '2.0.0-beta12',
    'vinyl-buffer': '^1.0.0',
    'vinyl-source-stream': '^1.1.0'
  });

  configWithStyles.files = config.files.concat([
    {src: 'styles/**', dest: './'}
  ]);

  return configWithStyles;
};
