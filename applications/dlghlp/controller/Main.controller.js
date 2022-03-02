sap.ui.define([
  'samples/util/BaseController',
  'samples/util/asyncEventHandler',
  'samples/applications/dlghlp/dialog/ExampleDialog'
], function (BaseController, asyncEventHandler, ExampleDialog) {
  return BaseController.extend('samples.applications.dlghlp.controller.Main', {
    onShow: asyncEventHandler(async function () {
      const dialog = new ExampleDialog(this.view);
      const result = await dialog.open();
    })
  });
});
