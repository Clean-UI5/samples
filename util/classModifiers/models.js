sap.ui.define([
  'sap/ui/model/Model',
  'sap/ui/model/json/JSONModel'
], function (Model, JSONModel) {
  return function defaultModel (Class, modelsProvider) {
    if (modelsProvider) {
      Object.assign(Class.prototype, {
        getModel: function (name) {
          return modelsProvider.call(this).getModel(name);
        },
        setModel: function (model, name) {
          if (!(model instanceof Model)) {
            model = new JSONModel(model);
          }
          modelsProvider.call(this).setModel(model, name);
        }
      });
    } else {
      const inheritedSetModel = Class.prototype.setModel;
      Class.prototype.setModel = function (model, name) {
        if (!(model instanceof Model)) {
          model = new JSONModel(model);
        }
        inheritedSetModel.call(this, model, name);
      };
    }
    Object.defineProperty(Class.prototype, 'defaultModel', {
      get: function () {
        return this.getModel();
      },
      set: function (model) {
        this.setModel(model);
      }
    });
  };
});
