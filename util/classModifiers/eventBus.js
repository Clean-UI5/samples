sap.ui.define([], function () {
  return function (Class) {
    Object.defineProperty(Class.prototype, 'eventBus', {
      get: function () {
        return sap.ui.getCore().getEventBus();
      }
    });
  };
});
