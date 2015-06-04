var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function() {

    var data = {
      name: 'my-app'
    };

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('assets/package.json'),
      this.destinationPath('assets/package.json'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('assets/index.js'),
      this.destinationPath('assets/index.js'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('assets/index.scss'),
      this.destinationPath('assets/index.scss'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('assets/test/index.js'),
      this.destinationPath('assets/test/index.js'),
      data
    );

    var self = this;
    var done = this.async();
    this.prompt({
      type:     'confirm',
      name:     'git',
      message:  'Initialise Git?'
    }, function(value) {

      if (!value.git) {
        return done();
      }

      //initialise Git
      self.spawnCommand('git', ['init']).on('close', function(err) {
        if (err) return done(err);

        //setup Git pre-commit hook
        self.fs.copyTpl(
          self.templatePath('pre-commit'),
          self.destinationPath('.git/hook/pre-commit'),
          data
        );

        done();
      });

    });

  },

  install: function() {
    this.npmInstall([]/*, {registry: 'http://npm:8080'}*/);
  }

});