sap.ui.define([
  'sap/ui/base/Object'
], function (UI5Object) {
  return UI5Object.extend('samples.applications.intrfc.interface.ISerializable', {
    write: function (data) {},
    constructor: function () {
      throw new Error('Abstract class');
    }
  });
});
