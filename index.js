var babel = require('babel-core');
var through = require('through2');
var staticFs = require('babel-plugin-static-fs');

module.exports = babelBrfs;
function babelBrfs (filename, opts) {
  if (/\.json$/i.test(filename)) return through();

  var input = '';
  return through(write, flush);

  function write (buf, enc, next) {
    input += buf.toString();
    next();
  }

  function flush (next) {
    var result;
    try {
      result = babel.transform(input, {
        plugins: [
          [ staticFs, {
            // ensure static-fs files are discovered
            onFile: this.emit.bind(this, 'file')
          } ]
        ],
        babelrc: false,
        filename: filename
      });
      this.push(result.code);
      this.push(null);
      next();
    } catch (err) {
      next(err);
    }
  }
}
