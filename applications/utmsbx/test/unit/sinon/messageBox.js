sap.ui.require([
  'sap/m/MessageBox',
  'samples/util/messageBox'
], function (MessageBox, messageBox) {
  QUnit.module('Testing with sinon', {
    before: function () {
      sinon.stub(MessageBox, 'show', function (label, options) {
        options.onClose({
          label,
          options
        });
      });
    },

    after: function () {
      MessageBox.show.restore();
    }
  });

  QUnit.test('it wraps MessageBox.show', function (assert) {
    const done = assert.async();
    messageBox('test')
      .then(({ label, options }) => {
        assert.strictEqual(label, 'test', 'The label is transmitted');
        assert.strictEqual(options.title, 'My application', 'A default title is applied');
        assert.strictEqual(options.icon, MessageBox.Icon.INFORMATION, 'A default icon is passed');
        done();
      });
  });

  QUnit.test('it supports options', function (assert) {
    const done = assert.async();
    messageBox('test', {
      title: 'My title',
      icon: 'any'
    })
      .then(({ label, options }) => {
        assert.strictEqual(options.title, 'My title', 'The title is applied');
        assert.strictEqual(options.icon, 'any', 'The icon is passed');
        done();
      });
  });
});
