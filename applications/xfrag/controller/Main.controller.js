sap.ui.define([
  'samples/util/BaseController',
  'samples/util/xfrag',
  'sap/m/MessageToast'
], function (BaseController, xfrag, MessageToast) {
  return BaseController.extend('samples.applications.xfrag.controller.Main', {
    onInit: async function () {
      const button = await xfrag`
      <m:Button xmlns:m="sap.m"
        id="helloButton"
        class="sapUiLargeMargin"
        text="{i18n>message}"
      />`;
      const message = await this.i18n('message')
      button.attachPress(() => MessageToast.show(message));
      this.byId('page').addContent(button);
    }
  });
});
