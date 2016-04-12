'use strict';

var path = require('path'),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert');

describe('generator-fresh:app', function () {

  describe('generates basic files with no additional options', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'testName',
          description: 'testDesc',
          mocha: 'n'
        })
        .on('end', done);
    });

    it ('should have all base config files and no test folder or travis.yml', function () {
      // Check all files exist where they should
      assert.file([
        '.gitignore',
        '.jshintrc',
        '.jscsrc',
        'package.json',
        'index.js'
      ]);

      assert.noFile([
        '.travis.yml',
        'test/test.js'
      ]);
    });
  });

  describe('generates basic files with w/ mocha but no coveralls', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'testName',
          description: 'testDesc',
          mocha: 'y',
          coveralls: 'n'
        })
        .on('end', done);
    });

    it ('should have a test folder but no travis.yml', function () {
      // Check all files exist where they should
      assert.file([
        '.gitignore',
        '.jshintrc',
        '.jscsrc',
        'package.json',
        'index.js',
        'test/test.js'
      ]);

      assert.noFile([
        '.travis.yml'
      ]);
    });
  });

  describe('generates all files', function () {
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
