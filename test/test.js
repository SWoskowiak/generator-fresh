'use strict';

var path = require('path'),
  helpers = require('yeoman-test'),
  chai = require('chai'),
  expect = chai.expect;


chai.use(require('chai-fs'));


describe('generator-fresh:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
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
    // assert.file([
    //   '.gitignore',
    //   '.jshintrc',
    //   '.jscsrc',
    //   '.travis.yml',
    //   'package.json',
    //   'index.js',
    //   'test/test.js'
    // ]);
    expect('.gitignore').to.be.a.file();
    expect('.jscsrc').to.be.a.file();
    expect('.jshintrc').to.be.a.file();
    expect('.travis.yml').to.be.a.file();
    expect('test/test.js').to.be.a.file();

  });
});
