sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'samples/util/i18n'
], function (Controller, i18n) {
  const BaseController = Controller.extend('samples.util.BaseController', {
    ...i18n
  });

  Object.defineProperties(BaseController.prototype, {
    view: {
      get: function () {
        return this.getView();
      }
    },
    defaultModel: {
      get: function () {
        return this.view.getModel();
      },
      set: function (model) {
        this.view.setModel(model);
      }
    },
    eventBus: {
      get: function () {
        return sap.ui.getCore().getEventBus();
      }
    }
  });

  return BaseController;
});
