# brfs-babel

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is like [brfs](http://npmjs.com/package/brfs), a browserify transform to inline static files, but built on top of Babel and its AST manipulations. This provides some new features, like ES2015 import support, various additional edge cases, cleaner code output, and source maps.

However, since this is a re-write and work in progress, this has [some limitations](#limitations) and currently only supports `fs.readFileSync` and `fs.readdirSync`.

## Install

```sh
npm install brfs-babel --save
```

## Usage

Once installed, you can use it as a replacement for `brfs` transform:

```sh
browserify index.js -t brfs-babel
```

It will handle ES2015 syntax, so it can be ordered before or after `babelify`. Or, you can choose to avoid `babelify` altogether, e.g. if you are targeting a new version of Node/Chrome/FF.

```js
import { readFileSync } from 'fs';
import { join } from 'path';
const src = readFileSync(join(__dirname, 'hello.txt'), 'utf8');
```

And `hello.txt` is a text ifle containing the string `"Hello, world!"`.

After transformation:

```js
import { join } from 'path';
const src = 'Hello, World!';
```

## Limitations

The following `fs` functions are supported:

- `fs.readFileSync(filepath, [enc])`
- `fs.readdirSync(filepath)`

The following `path` functions will be evaluated statically when they are found inside the arguments of the above calls:

- `path.join()`
- `path.resolve()`

Some test cases are failing from `brfs`. This includes dynamic variables like this:

```js
const path = '/foo.txt';
fs.readFileSync(__dirname + path, 'utf8');
```

As well as inline CommonJS usage, like this:

```js
require('fs').readFileSync(__dirname + '/foo.txt', 'utf8');
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/brfs-babel/blob/master/LICENSE.md) for details.
