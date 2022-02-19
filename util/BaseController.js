sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/base/Log'
], function (Controller, Log) {
  return Controller.extend('samples.util.BaseController', {
    i18n: async function (key, ...args) {
      let resourceBundle;
      try {
        resourceBundle = await this.getView().getModel('i18n').getResourceBundle();
        return resourceBundle.getText(key, args);
      } catch (e) {
        Log.error('An exception occurred while calling i18n', e.toString(), 'samples.util.BaseController', () => {
          return {
            resourceBundle,
            key,
            args
          };
        });
        return key; // Best we can do
      }
    }
  });
});
  