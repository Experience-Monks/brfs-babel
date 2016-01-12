var test = require('tape');
var browserify = require('browserify');
var vm = require('vm');
var path = require('path');

test('handles file event', function (t) {
  t.plan(2);

  var b = browserify();
  b.add(__dirname + '/files/main.js');
  b.transform(path.dirname(__dirname));

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  b.on('transform', function (tr, mfile) {
    tr.on('file', function (dep) {
      t.equal(dep, __dirname + '/files/robot.html');
    });
  });

  function log (msg) {
    t.equal('<b>beep boop</b>\n', msg);
  }
});
