sap.ui.define([
  'samples/util/BaseController',
  'sap/m/MessageToast',
  'samples/applications/singlt/Singleton'
], function (BaseController, MessageToast, Singleton) {
  return BaseController.extend('samples.applications.singlt.controller.Main', {
    onNewAndAdd: function () {
      const singleton = new Singleton();
      const value = singleton.add();
      MessageToast.show(value.toString());
    }
  });
});
