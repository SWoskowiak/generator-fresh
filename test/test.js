'use strict';

var path = require('path'),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert');

describe('generator-fresh:app', function () {
  var tempDir = '';

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'testName',
        description: 'testDesc',
        mocha: 'y',
        coveralls: 'y'
      })
      .on('end', done);
  });

  describe('generates all files', function () {
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
