'use strict';

var path = require('path'),
  helpers = require('yeoman-test'),
  chai = require('chai'),
  expect = chai.expect;


chai.use(require('chai-fs'));


describe('generator-fresh:app', function () {
  var tempDir = '';

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        tempDir = dir;
        console.log('DIR:', dir, '\n\n');
      })
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
    expect(tempDir + '/.gitignore').to.be.a.file();
    //expect(tempDir + '/.jscsrc').to.be.a.file();
    expect(tempDir + '/.jshintrc').to.be.a.file();
    expect(tempDir + '/.travis.yml').to.be.a.file();
    expect(tempDir + '/index.js').to.be.a.file();
    expect(tempDir + '/test/test.js').to.be.a.file();
    expect(tempDir + '/package.json').to.be.a.file();

  });
});
