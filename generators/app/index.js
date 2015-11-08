var path = require('path');
var generators = require('yeoman-generator');

function mergeModule(name) {
  var self = this;

  //get the module config
  var module = require(path.join(__dirname, 'lib', name))({
    name:         this.name,
    tasks:        this.tasks,
    dependencies: this.dependencies
  });

  //merge the module files with the app files
  this.fs.copy(path.join(__dirname, 'lib', name, 'files'), this.destinationPath('.'));
  this.fs.copy(path.join(__dirname, 'lib', name, 'files', '**/.*'), this.destinationPath('.')); //dot files e.g. .eslintrc

  if (module) {

    //merge the module templates
    if (module.templates) {
      for (var i=0; i<module.templates.length; ++i) {
        var tpl = module.templates[i];
        this.fs.copyTpl(path.join(__dirname, 'lib', name, 'templates', tpl.src), this.destinationPath(tpl.dest), tpl.data)
      }
    }

  }

}

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type:     String,
      desc:     'The name of the project'
    });

    this.option('static', {
      type:     Boolean,
      desc:     'Whether to include static site generation',
      defaults: false
    });

    this.option('install', {
      type:     Boolean,
      desc:     'Whether to install npm dependencies',
      defaults: false
    });

    // --- language features ---

    this.option('es5', {
      type:     Boolean,
      desc:     'Whether use ES5',
      defaults: false
    });

    this.option('es6', {
      type:     Boolean,
      desc:     'Whether use ES5',
      defaults: false
    });

    this.option('react', {
      type:     Boolean,
      desc:     'Whether use ES6+JSX',
      defaults: false
    });

    this.name = this.options.name || path.basename(path.resolve('.')).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/--/g, '-');

    if ((this.options.es5 && this.options.es6) || (this.options.es5 && this.options.react) || (this.options.es6 && this.options.react)) {
      this.env.error('Please choose only one of --es5, --es6 and --react.');
    } else {
      if (this.options.es6) {
        this.lang = 'es6';
      } else if (this.options.react) {
        this.lang = 'react';
      } else {
        this.lang = 'es5';
      }
    }

    this.dependencies = {
      "del": "^2.0.1",
      "gulp": "^3.9.0",
      "gulp-imagemin": "^2.2.1",
      "gulp-rev-all": "^0.8.21",
      "gulp-rev-napkin": "git+https://github.com/mbbender/gulp-rev-napkin.git",
      "imagemin-pngquant": "^4.1.0",
      "mkdirp": "^0.5.0",
      "readdir": "^0.0.13",
      "run-sequence": "^1.1.0"
    };

    this.tasks = {
      default:  ['build'],
      all:      ['clean', 'install', 'build', ['test', 'optimise']],
      install:  [],
      build:    [],
      test:     [],
      optimise: [],
      watch:    []
    };
  },

  /**
   * Setup the project assets
   */
  assets: function() {
    mergeModule.call(this, 'assets', {name: this.name});
  },

  /**
   * Setup the project static content
   */
  static: function() {
    if (this.options.static) {
      mergeModule.call(this, 'static');
    }
  },

  /**
   * Setup the base project files
   */
  base: function() {

    this.fs.copy(this.templatePath('_editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('_gitattributes'), this.destinationPath('.gitattributes'));
    this.fs.copy(this.templatePath('tasks/**'), this.destinationPath('tasks'));

    this.fs.copyTpl(this.templatePath('_eslintrc.ejs'), this.destinationPath('.eslintrc'), {
      lang: this.lang
    });

    this.fs.copyTpl(this.templatePath('_gulpfile.js.ejs'), this.destinationPath('gulpfile.js'), {
      name: this.name,
      tasks: this.tasks
    });

    this.fs.copyTpl(this.templatePath('_package.json.ejs'), this.destinationPath('package.json'), {
      name: this.name,
      dependencies: this.buildDependencies
    });

    this.fs.copyTpl(this.templatePath('_README.md.ejs'), this.destinationPath('README.md'), {
      name: this.name
    });

  },

  /**
   * Install the dependencies
   */
  install: function() {
    if (this.options.install) {
      this.npmInstall();
    }
  }

});