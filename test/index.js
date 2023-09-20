/**
 * @typedef {import('../index.js').Options} Options
 */

import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {remark} from 'remark'
import remarkDefsplit from '../index.js'

test('remarkDefsplit', (t) => {
  t.equal(
    process(readInput('wonders/wonders')),
    readOutput('wonders/wonders'),
    'extracts destinations'
  )

  t.equal(
    process(readOutput('wonders/wonders')),
    readOutput('wonders/wonders'),
    'idempotence'
  )

  t.equal(
    process(readInput('clash/different-sections')),
    readOutput('clash/different-sections'),
    'extracted definitions in different sections do not clash'
  )

  t.equal(
    process(readInput('clash/other-definitions')),
    readOutput('clash/other-definitions'),
    'new-born definitions don’t clash with existing identifiers'
  )

  t.equal(
    process(readInput('clash/reuse')),
    readOutput('clash/reuse'),
    'identifier reuses existing identifiers'
  )

  t.equal(
    process(readInput('clash/reuse-title-mismatch')),
    readOutput('clash/reuse-title-mismatch'),
    'identifier reuses existing identifiers does not clash with titles'
  )

  t.equal(
    process(readInput('clash/object-prototype-props')),
    readOutput('clash/object-prototype-props'),
    'identifier doesn’t clash with Object.prototype property names'
  )

  t.equal(
    process(readInput('options/id-multi'), {id: ['travis-badge', 'travis']}),
    readOutput('options/id-multi'),
    '`options.id` works with array of values'
  )

  t.equal(
    process(readInput('options/id-single'), {id: 'travis-ci-0'}),
    readOutput('options/id-single'),
    '`options.id` works with a single value'
  )

  t.equal(
    process(readInput('options/object-prototype-props'), {
      id: ['__proto__', 'constructor']
    }),
    readOutput('options/object-prototype-props'),
    '`options.id` works with Object.prototype property names'
  )

  t.equal(
    process(readInput('local/example')),
    readOutput('local/example'),
    'should support links to local things'
  )

  t.end()
})

/**
 * @param {string} src
 * @param {Options} [options]
 * @returns {string}
 */
function process(src, options) {
  return (
    remark()
      // @ts-expect-error: to do: remove when refactor.
      .use(remarkDefsplit, options)
      .processSync(src)
      .toString()
  )
}

/**
 * @param {string} fp
 * @returns {string}
 */
function readInput(fp) {
  return String(fs.readFileSync(path.join('test', 'data', fp + '.md')))
}

/**
 * @param {string} fp
 * @returns {string}
 */
function readOutput(fp) {
  return remark()
    .processSync(readInput(fp + '-output'))
    .toString()
}
