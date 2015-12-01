
/**
 * Bundle ES6+JSX scripts
 * @param   {object} config
 * @returns {object}
 */
module.exports = function(config) {
  var configWithScripts = Object.assign({}, config);

  configWithScripts.scriptPath = 'index.jsx';

  configWithScripts.transforms = configWithScripts.transforms.concat([
    'babelify'
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
    {src: './assets/scripts/react/.*', dest: '.'},
    {src: './assets/scripts/react/tasks/**', dest: './tasks'}
  ]);

  if (configWithScripts.lang !== 'universal') {

    //universal tests are different
    configWithScripts.files = configWithScripts.files.concat([
      {src: './assets/scripts/react/scripts/**', dest: configWithScripts.scriptsDirectory},
      {src: './assets/scripts/react/scripts/**/.*', dest: configWithScripts.scriptsDirectory}
    ]);

    //we don't need a static file with in an universal app
    configWithScripts.templates = configWithScripts.templates.concat([
      {
        src: './assets/scripts/react/content/index.html.ejs',
        dest: configWithScripts.contentDirectory + '/index.html',
        data: {
          name: configWithScripts.name
        }
      }
    ]);

  }

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

  // ---- universal ----

  if (configWithScripts.lang === 'universal') {

    configWithScripts.scriptPath = 'client/index.jsx';

    configWithScripts.scriptsDirectory = './src';
    configWithScripts.stylesDirectory = './src/assets';
    configWithScripts.contentDirectory = './src/assets';

    configWithScripts.dependencies = Object.assign({}, configWithScripts.dependencies, {
      'express': '^4.13.3',
      'history': '^1.13.1',
      'nodemon': '^1.8.1',
      'react': '^0.14.2',
      'react-dom': '^0.14.2',
      'react-fetcher': '^0.2.0',
      'react-helmet': '^2.2.0',
      'react-redux': '^4.0.0',
      'react-router': '^1.0.0',
      'redux': '^3.0.3',
      'redux-form': '^2.4.5',
      'redux-simple-router': '^0.0.10',
      'redux-thunk': '^1.0.0',
      'rev-manifest-path': '^0.1.3'
    });

    configWithScripts.devDependencies = Object.assign({}, configWithScripts.devDependencies, {
      'redux-devtools': '^3.0.0-beta-3',
      'redux-devtools-log-monitor': '^1.0.0-beta-3',
      'redux-devtools-dock-monitor': '^1.0.0-beta-3'
    });

    configWithScripts.buildDependencies = Object.assign({}, configWithScripts.buildDependencies, {
      'mocha': '^2.3.4',
      'isparta': '^4.0.0',
      'gulp-mocha': '^2.2.0',
      'gulp-istanbul': '^0.10.2',
      'mocha-bamboo-reporter': '^1.1.0'
    });

    configWithScripts.files = configWithScripts.files.concat([
      {src: './assets/scripts/universal/scripts/**', dest: configWithScripts.scriptsDirectory},
      {src: './assets/scripts/universal/scripts/**/.*', dest: configWithScripts.scriptsDirectory}
    ]);

    configWithScripts.scripts = Object.assign({}, configWithScripts.scripts, {
      'start': 'nodemon --exec babel-node -- src/server/index.jsx'
    });

  }

  return configWithScripts;
};
