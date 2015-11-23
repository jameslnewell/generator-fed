var assets = require('./assets');

/**
 * Common config for all generators
 * @param   {Object} config
 * @returns {Object}
 */
module.exports = function(config) {
  var configWithCommon = Object.assign({}, config);

  configWithCommon = assets(configWithCommon);

  configWithCommon.buildDependencies = Object.assign({}, configWithCommon.buildDependencies, {
    'del': '^2.0.1',
    'gulp': '^3.9.0',
    'gulp-imagemin': '^2.2.1',
    'gulp-rev-all': '^0.8.21',
    'gulp-rev-napkin': 'git+https://github.com/mbbender/gulp-rev-napkin.git',
    'imagemin-pngquant': '^4.1.0',
    'mkdirp': '^0.5.1',
    'readdir': '^0.0.13',
    'run-sequence': '^1.1.0'
  });

  configWithCommon.ignores = configWithCommon.ignores.concat([
    '.idea',
    'Thumbs.db',
    '.DS_Store',
    'npm-debug.log',
    'node_modules/',
    'dist/'
  ]);

  configWithCommon.tasks = Object.assign({}, configWithCommon.tasks, {
    default: ['build'],
    all: ['clean', 'build', 'test', 'optimise']
  });

  configWithCommon.files = configWithCommon.files.concat([
    {src: './common/.editorconfig', dest: '.editorconfig'},
    {src: './common/.gitattributes', dest: '.gitattributes'},
    {src: './common/tasks/**', dest: './tasks'}
  ]);

  configWithCommon.templates = configWithCommon.templates.concat([
    {src: './common/.gitignore.ejs', dest: '.gitignore', data: {
      ignores: configWithCommon.ignores
    }},
    {src: './common/gulpfile.js.ejs', dest: './gulpfile.js', data: {
      name: configWithCommon.name,
      tasks: configWithCommon.tasks
    }},
    {src: './common/package.json.ejs', dest: './package.json', data: {
      name: configWithCommon.name,
      dependencies: configWithCommon.dependencies,
      devDependencies: Object.assign(
        {},
        configWithCommon.buildDependencies,
        configWithCommon.devDependencies
      ),
      transforms: configWithCommon.transforms
    }},
    {src: './common/README.md.ejs', dest: './README.md', data: {
      name: configWithCommon.name
    }}
  ]);

  return configWithCommon;
};
