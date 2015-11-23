
/**
 * Bundle ES6+JSX scripts
 * @param   {object} config
 * @returns {object}
 */
module.exports = function(config) {
  var configWithScripts = Object.assign({}, config);

  configWithScripts.transforms = configWithScripts.transforms.concat([
    ['babelify']
  ]);

  configWithScripts.dependencies = Object.assign({}, configWithScripts.dependencies, {
    'react': '^0.14.2',
    'react-dom': '^0.14.2'
  });

  configWithScripts.buildDependencies = Object.assign({}, configWithScripts.buildDependencies, {
    'babelify': '^7.2.0',
    'babel-plugin-transform-object-rest-spread': '^6.0.14',
    'babel-preset-es2015': '^6.0.15',
    'babel-preset-react': '^6.0.15'
  });

  configWithScripts.files = configWithScripts.files.concat([
    {src: './assets/scripts/react/**', dest: '.'},
    {src: './assets/scripts/react/**/.*', dest: '.'}
  ]);

  configWithScripts.templates = configWithScripts.templates.concat([
    {src: './assets/scripts/react/src/content/index.html.ejs', dest: './src/content/index.html', data: {
      name: configWithScripts.name
    }}
  ]);

  // ---- testing ----

  configWithScripts.devDependencies = Object.assign({}, configWithScripts.devDependencies, {
    'babel-core': '^6.1.21',
    'chai': '^3.4.1',
    'jsx-chai': '^1.1.1',
    'react-testutils-query': '^0.1.1',
    'react-testutils-render': '^0.1.1'
  });

  configWithScripts.buildDependencies = Object.assign({}, configWithScripts.buildDependencies, {
    'mocha': '^2.3.4',
    'isparta': '^4.0.0',
    'gulp-mocha': '^2.2.0',
    'gulp-istanbul': '^0.10.2',
    'mocha-bamboo-reporter': '^1.1.0'

  });

  return configWithScripts;
};
