sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'samples/util/i18n',
  'samples/util/classModifiers/eventBus',
  'samples/util/classModifiers/readOnlyProperties',
  'samples/util/classModifiers/defaultModel'
], function (Controller, i18n, eventBus, readOnlyProperties, defaultModel) {
  const BaseController = Controller.extend('samples.util.BaseController', {
    ...i18n
  });

  eventBus(BaseController);
  readOnlyProperties(BaseController, {
    view: function () {
      return this.getView();
    }
  });
  defaultModel(BaseController, function () { return this.view; });

  return BaseController;
});
