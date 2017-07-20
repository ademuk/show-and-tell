const process = require('process');
const { defineSupportCode } = require('cucumber');

var disable = false;

defineSupportCode(function({ registerHandler, setDefaultTimeout }) {
  setDefaultTimeout(-1);

  registerHandler('AfterStep', function (step, callback) {
    if (disable) {
      return callback();
    }

    var keypress = require('keypress');

    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);

    process.stdin.setRawMode(true);

    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
      if (key && key.ctrl && key.name === 'c') {
        disable = true;
      }
      callback();
    });
  });

  registerHandler('StepResult', function (step) {
    if (step.status === 'failed') {
      disable = true;
    }
  });
});