[![npm](https://nodei.co/npm/mdast-defsplit.png)](https://npmjs.com/package/mdast-defsplit)

# mdast-defsplit

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Extract inline link/image destinations as separate definitions.

[travis]: https://travis-ci.org/eush77/mdast-defsplit
[travis-badge]: https://travis-ci.org/eush77/mdast-defsplit.svg
[david]: https://david-dm.org/eush77/mdast-defsplit
[david-badge]: https://david-dm.org/eush77/mdast-defsplit.png

## Example

```
$ travisjs badge
[![Build Status](https://travis-ci.org/eush77/mdast-defsplit.svg?branch=master)](https://travis-ci.org/eush77/mdast-defsplit)
```

```
$ travisjs badge | mdast --use mdast-defsplit='id:["travis-badge","travis"]'
[![Build Status][travis-badge]][travis]

[travis-badge]: https://travis-ci.org/eush77/mdast-defsplit.svg?branch=master

[travis]: https://travis-ci.org/eush77/mdast-defsplit
```

## API

With [mdast](https://github.com/wooorm/mdast) do:

```
mdast.use(mdastDefsplit, [options]).process(src)
```

#### options.id

Type: `String | [String]` <br>
Default: `[]`

Array of identifiers to use for new definitions in place of auto-generated ones.

## CLI

With [mdast](https://github.com/wooorm/mdast) do:

```
mdast --use mdast-defsplit[=options] </path/to/src
```

## Related

- [mdast-reference-links] — practically the same, but with numerical identifiers instead of uri-based ones.

[mdast-reference-links]: https://github.com/wooorm/mdast-reference-links

## Install

```
npm install mdast-defsplit
```

## License

MIT
