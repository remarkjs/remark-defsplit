/**
 * @typedef {import('../index.js').Options} Options
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import process from 'node:process'
import test from 'node:test'
import {remark} from 'remark'
import remarkDefsplit from '../index.js'

test('fixtures', async function (t) {
  const base = new URL('fixtures/', import.meta.url)
  const folders = await fs.readdir(base)

  let index = -1

  while (++index < folders.length) {
    const folder = folders[index]

    if (folder.charAt(0) === '.') continue

    await t.test(folder, async function () {
      const folderUrl = new URL(folder + '/', base)
      const inputUrl = new URL('input.md', folderUrl)
      const outputUrl = new URL('output.md', folderUrl)
      const configUrl = new URL('config.json', folderUrl)

      const input = String(await fs.readFile(inputUrl))

      /** @type {Options | undefined} */
      let config
      /** @type {string} */
      let output

      try {
        config = JSON.parse(String(await fs.readFile(configUrl)))
      } catch {}

      // @ts-expect-error: to do: fix type.
      const proc = remark().use(remarkDefsplit, config)

      const actual = String(await proc.process(input))

      try {
        if ('UPDATE' in process.env) {
          throw new Error('Updating…')
        }

        output = String(await fs.readFile(outputUrl))
      } catch {
        output = actual
        await fs.writeFile(outputUrl, actual)
      }

      const expected = String(await remark().process(output))

      assert.equal(actual, expected)
    })
  }
})
