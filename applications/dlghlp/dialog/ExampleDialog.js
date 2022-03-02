sap.ui.define([
  'samples/util/DialogController'
], function (DialogController) {
  return DialogController.extend('samples.applications.dlghlp.dialog.ExampleDialog', {
    onOK: function () {
      this.setResult(true);
      this.dialog.close();
    },

    onCancel: function () {
      this.setResult(false);
      this.dialog.close();
    }
  });
});
