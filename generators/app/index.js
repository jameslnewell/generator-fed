var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  askForName: function() {
    var done = this.async();
    this.prompt(
      {
        type:     'input',
        name:     'name',
        message:  'Project name?',
        store:    true,
        default:  this.config.get('name'),
        validate: function(value) {
          return value.length > 0;
        }
      },
      function(props) {
        this.name = props.name;
        done();
      }.bind(this)
    );
  },

  askToInstall: function() {
    var done = this.async();
    this.prompt(
      {
        type:     'confirm',
        name:     'install',
        message:  'Install npm packages?',
        default:  false
      },
      function(props) {
        this.install = props.install;
        done();
      }.bind(this)
    );
  },

  /**
   * Write project files
   */
  writing: function() {
    this.fs.copy(this.templatePath('**/*'), this.destinationPath('.'));
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {name: this.name});
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {name: this.name});
    this.fs.copyTpl(this.templatePath('src/component/package.json'), this.destinationPath('src/component/package.json'), {name: this.name});
  },

  /**
   * Install npm packages
   */
  install: function() {
    if (this.install) {
      this.npmInstall();
    }
  }

});