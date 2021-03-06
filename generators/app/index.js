var path = require('path');
var generators = require('yeoman-generator');

var defaults = require('./lib/defaults');
var common = require('./lib/common');

module.exports = generators.Base.extend({

  /**
   * Construct the generator
   * @constructor
   */
  constructor: function() {
    generators.Base.apply(this, arguments);

    // --- generic options ---

    this.option('name', {
      type: String,
      desc: 'The name of the project',
      defaults: path.basename(path.resolve('.'))
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/--/g, '-')
    });

    this.option('static', {
      type: Boolean,
      desc: 'Whether to include static site generation',
      defaults: false
    });

    this.option('install', {
      type: Boolean,
      desc: 'Whether to install npm dependencies',
      defaults: false
    });

    // --- language options ---

    this.option('es5', {
      type: Boolean,
      desc: 'Whether use ES5',
      defaults: false
    });

    this.option('es6', {
      type: Boolean,
      desc: 'Whether use ES5',
      defaults: false
    });

    this.option('react', {
      type: Boolean,
      desc: 'Whether use ES6+JSX',
      defaults: false
    });

    this.option('universal', {
      type: Boolean,
      desc: 'Whether to use a universal app',
      defaults: false
    });

  },

  /**
   * Setup the base project files
   * @returns {void}
   */
  base: function() {

    var lang = 'es5';
    if (
      this.options.es5 && this.options.es6
      || this.options.es5 && this.options.react
      || this.options.es5 && this.options.universal
      || this.options.es6 && this.options.react
      || this.options.es6 && this.options.universal
      || this.options.react && this.options.universal
    ) {
      this.env.error('Please choose only one of --es5, --es6, --react and --universal.');
    } else if (this.options.es6) {
      lang = 'es6';
    } else if (this.options.react) {
      lang = 'react';
    } else if (this.options.universal) {
      lang = 'universal';
    }

    //get the default config
    var config = common(defaults({
      name: this.options.name,
      lang: lang
    }));

    //copy files
    for (var i = 0; i < config.files.length; ++i) {
      var file = config.files[i];
      this.fs.copy(path.join(__dirname, 'files', file.src), this.destinationPath(file.dest));
    }

    //copy templates
    for (var j = 0; j < config.templates.length; ++j) {
      var template = config.templates[j];
      this.fs.copyTpl(
        path.join(__dirname, 'templates', template.src),
        this.destinationPath(template.dest),
        template.data
      );
    }

  },

  /**
   * Install the dependencies
   * @returns {void}
   */
  install: function() {
    if (this.options.install) {
      this.npmInstall();
    }
  }

});
