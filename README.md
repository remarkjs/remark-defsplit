[![npm](https://nodei.co/npm/remark-defsplit.png)](https://npmjs.com/package/remark-defsplit)

# remark-defsplit

[![Build Status][travis-badge]][travis]
[![Dependency Status][david-badge]][david]

Extract inline link/image destinations as separate definitions.

## Example

```bash
$ travisjs badge
[![Build Status](https://travis-ci.org/eush77/remark-defsplit.svg?branch=master)](https://travis-ci.org/eush77/remark-defsplit)
```

```bash
$ travisjs badge | remark --use remark-defsplit='id:["travis-badge","travis"]'
[![Build Status][travis-badge]][travis]

[travis-badge]: https://travis-ci.org/eush77/remark-defsplit.svg?branch=master

[travis]: https://travis-ci.org/eush77/remark-defsplit
```

## API

With [remark](https://github.com/wooorm/remark) do:

```javascript
remark().use(remarkDefsplit, [options]).processSync(src)
```

#### options.id

Type: `String | [String]`.
Default: `[]`

Array of identifiers to use for new definitions in place of auto-generated ones.

## CLI

With [remark](https://github.com/wooorm/remark) do:

```sh
remark --use remark-defsplit[=options] </path/to/src
```

## Related

*   [`remark-reference-links`][remark-reference-links]
    — Practically the same as `remark-defsplit`, but with numeric identifiers
    instead of URI-based ones
*   [`remark-inline-links`][remark-inline-links]
    — Reverse, thus rewriting references and definitions into normal links
      and images

## Install

```sh
npm install remark-defsplit
```

## License

MIT

[travis]: https://travis-ci.org/eush77/remark-defsplit

[travis-badge]: https://travis-ci.org/eush77/remark-defsplit.svg

[david]: https://david-dm.org/eush77/remark-defsplit

[david-badge]: https://david-dm.org/eush77/remark-defsplit.png

[remark-reference-links]: https://github.com/wooorm/remark-reference-links

[remark-inline-links]: https://github.com/wooorm/remark-inline-links
