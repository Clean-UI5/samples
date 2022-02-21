sap.ui.define([
  'samples/util/BaseController',
  'samples/applications/rjsmdl/model/ViewState',
  'sap/m/MessageToast'
], function (BaseController, ViewState, MessageToast) {
  return BaseController.extend('samples.applications.rjsmdl.controller.Main', {
    onInit: function () {
      this.viewState = new ViewState('Clean UI5', 2022);
      this.getView().setModel(this.viewState.model);
    },

    onSave: function () {
      MessageToast.show(`Name : ${this.viewState.name}
Year : ${this.viewState.year}
Organization : ${this.viewState.org}`);
    }
  });
});
