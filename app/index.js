'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompts: function () {

    var done = this.async();

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
      message: 'Add mocha+chai?',
      choices: ['y', 'n'],
      default: 'y'
    },{
      when: function (answer) {
        return answer.mocha === 'y';
      },
      type: 'input',
      name: 'coveralls',
      message: 'Add travis/coveralls support?',
      choices: ['y', 'n'],
      default: 'n'
    }], function (answers) {
      // Pass the answers to the install func
      this._installDev(answers);
      done();
    }.bind(this));
  },

  /**
   * Install dev dependencies
   */
  _installDev: function (answers) {
    var installs = [];
    // If we said no to mocha make sure there is a valid value in coveralls
    answers.coveralls = answers.coveralls || false;
    // Build out package.json
    this.template('_package.json', 'package.json', answers);
    // Grab our travis file if we want travis ci + coveralls support
    if (answers.coveralls === 'y') { this.directory('ci', '.'); }
    // Copy all files in the base directory
    this.directory('base', '.');

    // Add in mocha + chai
    if (answers.mocha) { installs.push('mocha', 'chai'); }
    // Add in coveralls support
    if (answers.coveralls) { installs.push('coveralls', 'istanbul'); }
    // If we have any dev dependencies then install em
    if (installs.length) {
      this.npmInstall(installs, { saveDev: true });
    }
  }
});
