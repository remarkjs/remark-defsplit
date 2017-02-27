[![npm](https://nodei.co/npm/remark-defsplit.png)](https://npmjs.com/package/remark-defsplit)

# remark-defsplit

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Extract inline link/image destinations as separate definitions.

[travis]: https://travis-ci.org/eush77/remark-defsplit
[travis-badge]: https://travis-ci.org/eush77/remark-defsplit.svg
[david]: https://david-dm.org/eush77/remark-defsplit
[david-badge]: https://david-dm.org/eush77/remark-defsplit.png

## Example

```
$ travisjs badge
[![Build Status](https://travis-ci.org/eush77/remark-defsplit.svg?branch=master)](https://travis-ci.org/eush77/remark-defsplit)
```

```
$ travisjs badge | remark --use remark-defsplit='id:["travis-badge","travis"]'
[![Build Status][travis-badge]][travis]

[travis-badge]: https://travis-ci.org/eush77/remark-defsplit.svg?branch=master

[travis]: https://travis-ci.org/eush77/remark-defsplit
```

## API

With [remark](https://github.com/wooorm/remark) do:

```
remark().use(remarkDefsplit, [options]).processSync(src)
```

#### options.id

Type: `String | [String]` <br>
Default: `[]`

Array of identifiers to use for new definitions in place of auto-generated ones.

## CLI

With [remark](https://github.com/wooorm/remark) do:

```
remark --use remark-defsplit[=options] </path/to/src
```

## Related

- [remark-reference-links] — practically the same, but with numerical identifiers instead of uri-based ones.

[remark-reference-links]: https://github.com/wooorm/remark-reference-links

## Install

```
npm install remark-defsplit
```

## License

MIT
