sap.ui.define([
  'samples/util/BaseController'
], function (BaseController) {
  return BaseController.extend('samples.applications.gstate.controller.Main', {
    onReset: function () {
      this.eventBus.publish('gstate', 'reset');
    }
  });
});
