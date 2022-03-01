sap.ui.define([
  'sap/m/MessageToast'
], function (MessageToast) {
  return {
    message: async function (key, offset) {
      MessageToast.show(await this.i18n(key), {
        offset: `0 ${offset}`
      });
    }
  };
});
