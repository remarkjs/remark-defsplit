'use strict';

var defsplit = require('..');

var test = require('tape'),
    mdast = require('mdast');

var fs = require('fs');


test(function (t) {
  var input = fs.readFileSync(__dirname + '/data/input.md',
                              { encoding: 'utf8' });
  var output = fs.readFileSync(__dirname + '/data/output.md',
                               { encoding: 'utf8' });
  // Normalize style.
  output = mdast.process(output);

  t.equal(mdast.use(defsplit).process(input), output, 'extracts destinations');
  t.equal(mdast.use(defsplit).process(output), output, 'idempotence');
  t.end();
});
