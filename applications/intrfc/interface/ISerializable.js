sap.ui.define([
  'sap/ui/base/Object'
], function (UI5Object) {
  return UI5Object.extend('samples.applications.intrfc.interface.ISerializable', {
    serialize: function (outputStream) {},
    deserialize: function (inputStream) {},
    constructor: function () {
      throw new Error('Abstract class');
    }
  });
});
