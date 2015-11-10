
/**
 * The core config for getting gulp setup
 * @param   {Object} config
 * @returns {Object}
 */
module.exports = function(config) {
  var configWithCore = Object.assign({}, config);

  configWithCore.buildDependencies = Object.assign({}, config.buildDependencies, {
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

  configWithCore.ignores = config.ignores.concat([
    'Thumbs.db',
    '.DS_Store',
    '.idea',
    'npm-debug.log',
    'node_modules/',
    'dist/'
  ]);

  configWithCore.tasks = Object.assign({}, config.tasks, {
    default:  ['build'],
    all:      ['clean', 'install', 'build', ['test', 'optimise']],
  });

  configWithCore.files = config.files.concat([
    {src: 'core/_editorconfig', dest: '.editorconfig'},
    {src: 'core/_gitattributes', dest: '.gitattributes'},
    {src: 'core/tasks/**', dest: 'tasks'}
  ]);

  configWithCore.templates = config.templates.concat([
    {src: 'core/_eslintrc.ejs', dest: '.eslintrc', data: {
      lang: configWithCore.lang
    }},
    {src: 'core/_gitignore.ejs', dest: '.gitignore', data: {
      ignores: configWithCore.ignores
    }},
    {src: 'core/_gulpfile.js.ejs', dest: 'gulpfile.js', data: {
      name: configWithCore.name,
      tasks: configWithCore.tasks
    }},
    {src: 'core/_package.json.ejs', dest: 'package.json', data: {
      name: configWithCore.name,
      dependencies: configWithCore.buildDependencies,
      transforms: configWithCore.transforms
    }},
    {src: 'core/_README.md.ejs', dest: 'README.md', data: {
      name: configWithCore.name
    }}
  ]);

  return configWithCore;
};
