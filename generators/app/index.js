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

  test: function () {
    console.log(this.destinationRoot());

    console.log(this.destinationPath('index.js'));
  },
  /**
   * Install dependencies
   */
  _installs: function (answers) {
    var installs = [];
    // If we said no to mocha make sure there is a valid value in coveralls
    answers.coveralls = answers.coveralls || false;
    // Build out package.json
    this.template('package.json', 'package.json', answers);
    // Grab our travis file if we want travis ci + coveralls support
    if (answers.mocha === 'y') {
      this.directory('test');
      installs.push('mocha', 'chai');
    }
    if (answers.coveralls === 'y') {
      this.directory('ci', '.');
      installs.push('coveralls', 'istanbul');
    }
    // Copy all files in the base directory
    this.directory('base', '.');

    // If we have any dev dependencies then install em
    if (installs.length) {
      this.npmInstall(installs, { saveDev: true });
    }
  }
});
