
/**
 * Bundle ES5 scripts
 * @param   {object} config
 * @returns {object}
 */
module.exports = function(config) {
  var configWithScripts = Object.assign({}, config);

  configWithScripts.files = configWithScripts.files.concat([
    {src: './assets/scripts/es5/**/.*', dest: '.'},
    {src: './assets/scripts/es5/scripts/**', dest: configWithScripts.scriptsDirectory}
  ]);

  return configWithScripts;
};
