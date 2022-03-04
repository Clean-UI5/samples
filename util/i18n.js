sap.ui.define([
  'sap/base/Log'
], function (Log) {
  return {
    i18n: async function (key, ...args) {
      let resourceBundle;
      try {
        resourceBundle = await this.getModel('i18n').getResourceBundle();
        return resourceBundle.getText(key, args);
      } catch (e) {
        Log.error('An exception occurred while calling i18n', e.toString(), this.getMetadata().getName(), () => {
          return {
            resourceBundle,
            key,
            args
          };
        });
        return key; // Best we can do
      }
    }
  };
})