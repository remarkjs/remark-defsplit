'use strict';

var defsplit = require('..');

var test = require('tape'),
    mdast = require('mdast');

var fs = require('fs');


test(function (t) {
  var input = readInput('wonders/wonders'),
      output = readOutput('wonders/wonders');

  t.equal(mdast.use(defsplit).process(input), output, 'extracts destinations');
  t.equal(mdast.use(defsplit).process(output), output, 'idempotence');
  t.end();
});


test('identifier clashes', function (t) {
  t.equal(mdast.use(defsplit).process(readInput('clash/different-sections')),
          readOutput('clash/different-sections'),
          'extracted definitions in different sections do not clash');
  t.equal(mdast.use(defsplit).process(readInput('clash/other-definitions')),
          readOutput('clash/other-definitions'),
          'new-born definitions don\'t clash with existing ones');
  t.end();
});


function readInput (test) {
  return fs.readFileSync(dataFile(test), { encoding: 'utf8' });
}


function readOutput (test) {
  // Normalize style.
  return mdast.process(fs.readFileSync(dataFile(test + '-output'),
                                       { encoding: 'utf8' }));
}


function dataFile (test) {
  return __dirname + '/data/' + test + '.md';
}
