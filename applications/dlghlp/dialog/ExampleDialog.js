sap.ui.define([
  'samples/util/DialogController',
  'sap/m/MessageToast'
], function (DialogController, MessageToast) {
  return DialogController.extend('samples.applications.dlghlp.dialog.ExampleDialog', {
    onInit: async function () {
      this.byId('switch').setTooltip(await this.i18n('dialog.switch.label'));
      this.defaultModel = {};
    },

    onExit: async function () {
      MessageToast.show(await this.i18n('dialog.destroyed'));
    },

    onBeforeOpen: function () {
      this.defaultModel.setData({
        state: false
      });
    },

    onOK: function () {
      this.setResult(this.defaultModel.getData());
      this.close();
    },

    onCancel: function () {
      this.setResult(null);
      this.close();
    }
  });
});
