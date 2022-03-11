sap.ui.define([
  'samples/util/BaseController',
  'samples/applications/rjsmdl/model/ViewState',
  'samples/util/asyncEventHandler',
  'sap/m/MessageToast'
// eslint-disable-next-line max-params
], function (BaseController, ViewState, asyncEventHandler, MessageToast) {
  return BaseController.extend('samples.applications.rjsmdl.controller.Main', {
    onInit: function () {
      this.viewState = new ViewState('Clean UI5', 2022);
      this.view.setModel(this.viewState.model);
    },

    onSave: asyncEventHandler(async function () {
      MessageToast.show(`${await this.i18n('msg.name')} : ${this.viewState.name}
${await this.i18n('msg.year')} : ${this.viewState.year}
${await this.i18n('msg.org')} : ${this.viewState.org}`);
    })
  });
});
