'use strict';

var path = require('path'),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert');

describe('generator-fresh:app', function () {
  beforeEach(function () {
    this.tester = helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'testName',
        description: 'testDesc',
        mocha: 'y',
        coveralls: 'y'
      });
  });
  describe('generates all files', function () {
    beforeEach(function (done) {
      this.tester.on('end', done);
    });
    console.log(path.join(__dirname, '../app'));
    it ('generates all the appropriate files given "y" to all answers', function () {
      // Check all files exist where they should
      assert.file([
        '.gitignore',
        '.jshintrc',
        '.jscsrc',
        '.travis.yml',
        'package.json',
        'index.js',
        'test/test.js'
      ]);
    });

  });

});
