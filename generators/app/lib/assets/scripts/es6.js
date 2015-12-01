
/**
 * Bundle ES6 scripts
 * @param   {object} config
 * @returns {object}
 */
module.exports = function(config) {
  var configWithScripts = Object.assign({}, config);

  configWithScripts.transforms = configWithScripts.transforms.concat([
    ['babelify']
  ]);

  configWithScripts.buildDependencies = Object.assign({}, configWithScripts.buildDependencies, {
    'babelify': '^7.2.0',
    'babel-preset-es2015': '^6.0.15',
    'istanbul': 'git://github.com/gotwarlost/istanbul.git#source-map'
  });

  configWithScripts.files = configWithScripts.files.concat([
    {src: './assets/scripts/es6/.*', dest: '.'},
    {src: './assets/scripts/es6/scripts/**', dest: configWithScripts.scriptsDirectory},
    {src: './assets/scripts/es6/scripts/**/.*', dest: configWithScripts.scriptsDirectory}
  ]);

  return configWithScripts;
};
