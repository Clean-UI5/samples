sap.ui.define([
  'samples/util/BaseController',
  'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
  return BaseController.extend('samples.applications.vstate.controller.Main', {
    onInit: function () {
      this.defaultModel = {};
    }
  });
});
