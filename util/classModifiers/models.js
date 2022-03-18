sap.ui.define([
  'sap/ui/model/Model',
  'sap/ui/model/json/JSONModel'
], function (Model, JSONModel) {
  return function defaultModel (Class, modelsProvider) {
    function toSAPUI5Model (model) {
      if (model instanceof Model) {
        return model;
      }
      return new JSONModel(model);
    }

    if (modelsProvider) {
      Object.assign(Class.prototype, {
        getModel: function (name) {
          return modelsProvider.call(this).getModel(name);
        },
        setModel: function (model, name) {
          modelsProvider.call(this).setModel(toSAPUI5Model(model), name);
        }
      });
    } else {
      const inheritedSetModel = Class.prototype.setModel;
      Class.prototype.setModel = function (model, name) {
        inheritedSetModel.call(this, toSAPUI5Model(model), name);
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
