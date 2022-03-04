sap.ui.define([
  'samples/util/BaseController',
  'samples/util/asyncEventHandler',
  'samples/applications/dlghlp/dialog/ExampleDialog',
  'sap/m/MessageToast'
], function (BaseController, asyncEventHandler, ExampleDialog, MessageToast) {
  return BaseController.extend('samples.applications.dlghlp.controller.Main', {
    onInit: function () {
      this._dialog = new ExampleDialog({
        view: this.view
      });
    },

    onShow: asyncEventHandler(async function () {
      const result = await this._dialog.open();
      MessageToast.show(`Dialog result is ${JSON.stringify(result)}`)
    })
  });
});
