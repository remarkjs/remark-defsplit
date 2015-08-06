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

$ travisjs badge | mdast --use mdast-defsplit
[![Build Status][travis-ci-1]][travis-ci-2]

[travis-ci-1]: https://travis-ci.org/eush77/mdast-defsplit.svg?branch=master

[travis-ci-2]: https://travis-ci.org/eush77/mdast-defsplit
```

## API

With [mdast](https://github.com/wooorm/mdast) do:

```
mdast.use(mdastDefsplit).process(src)
```

## CLI

With [mdast](https://github.com/wooorm/mdast) do:

```
mdast --use mdast-defsplit </path/to/src
```

## Install

```
npm install mdast-defsplit
```

## License

MIT
