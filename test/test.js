'use strict';

var path = require('path'),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert');

describe('Fresh Generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({name: 'testName', description: 'testDesc', mocha: 'y', coveralls: 'y'})
      .on('end', function () {
        done();
      });
  });

  it ('generates all the appropriate files given "y" to all answers', function () {
    // Check everything was made
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
