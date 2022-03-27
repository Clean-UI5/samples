sap.ui.require([
  'samples/applications/intrfc/interface/ISerializable',
  'samples/util/implements'
], function (ISerializable, testIfImplements) {
  class SerializableObject {
    serialize (outputStream) {}
    deserialize (inputStream) {}
  }

  QUnit.module('Interface testing');

  QUnit.test('SerializableObject class', function (assert) {
    assert.strictEqual(testIfImplements(SerializableObject, ISerializable), true, 'SerializableObject implements ISerializable');
  });

  QUnit.test('SerializableObject instance', function (assert) {
    const instance = new SerializableObject();
    assert.strictEqual(testIfImplements(instance, ISerializable), true, 'SerializableObject instance implements ISerializable');
  });

  QUnit.test('Any object', function (assert) {
    assert.strictEqual(testIfImplements({}, ISerializable), false, 'The empty object does not implements ISerializable');
  });
});
