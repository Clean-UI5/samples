sap.ui.define([
  'sap/ui/model/Model',
  'sap/ui/model/json/JSONModel'
], function (Model, JSONModel) {
  return function defaultModel (Class, modelsProvider) {
    Object.defineProperty(Class.prototype, 'defaultModel', {
      get: function () {
        return modelsProvider.call(this).getModel();
      },
      set: function (model) {
        if (!(model instanceof Model)) {
          model = new JSONModel(model);
        }
        modelsProvider.call(this).setModel(model);
      }
    });
  };
});
