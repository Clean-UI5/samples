sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'samples/util/i18n',
  'samples/util/classModifiers/models',
  'samples/util/classModifiers/eventBus',
  'samples/util/classModifiers/readOnlyProperties'
// eslint-disable-next-line max-params
], function (Controller, i18n, models, eventBus, readOnlyProperties) {
  const BaseController = Controller.extend('samples.util.BaseController', {
    ...i18n
  });

  models(BaseController, function () { return this.view; });
  eventBus(BaseController);
  readOnlyProperties(BaseController, {
    view: function () {
      return this.getView();
    }
  });

  return BaseController;
});
