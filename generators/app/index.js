'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompts: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'I\'m an asshole!' + chalk.red(' ~FRESH~')
    ));

    // Ask for the project name and if we are gonna add coveralls support
    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname // Default to current folder name
    },{
      type: 'input',
      name: 'description',
      message: 'NPM description',
      default: ''
    },{
      type: 'input',
      name: 'mocha',
      message: 'Add mocha+chai? (y/n)',
      choices: ['y', 'n'],
      default: 'y'
    },{
      when: function (answer) {
        return answer.mocha === 'y';
      },
      type: 'input',
      name: 'coveralls',
      message: 'Add travis/coveralls support (y/n)?',
      choices: ['y', 'n'],
      default: 'n'
    }], function (answers) {
      // Pass the answers to the install func
      this._installs(answers);
      done();
    }.bind(this));
  },

  /**
   * Install dependencies and copy config files
   * NOTE: I defaulted file names to have leading underscores since Travis CI
   * ignores certain dotfiles (.jshintrc, .jscsrc etc) and was causing tests
   * to fail as a result
   */
  _installs: function (answers) {
    var installs = [];
    // If we said no to mocha make sure there is a valid value in coveralls
    answers.coveralls = answers.coveralls || false;
    // Build out package.json
    this.template('_package.json', 'package.json', answers);
    // Grab our travis file if we want travis ci + coveralls support
    if (answers.mocha === 'y') {
      this.fs.copy(
        this.templatePath('_test.js'),
        this.destinationPath('test/test.js')
      );
      installs.push('mocha', 'chai');
    }
    if (answers.coveralls === 'y') {
      this.fs.copy(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml')
      );
      installs.push('coveralls', 'istanbul');
    }
    // Copy all files in the base directory
    this.fs.copy(
      this.templatePath('_jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_jscsrc'),
      this.destinationPath('.jscsrc')
    );
    this.fs.copy(
      this.templatePath('_index.js'),
      this.destinationPath('index.js')
    );

    // If we have any dev dependencies then install em
    if (installs.length) {
      this.npmInstall(installs, { saveDev: true });
    }
  }
});
