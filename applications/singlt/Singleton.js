sap.ui.define([
  'sap/ui/base/Object'
], function (UI5Object) {
  let instance = null;

  const Singleton = UI5Object.extend('myApp.Singleton', {
    constructor: function () {
      if (instance !== null) {
        return instance;
      }
      instance = this;
      this._value = 0;
    },

    add: function () {
      return ++this._value;
    }
  });

  Singleton.destroy = function () {
    instance.destroy();
    instance = null;
  };

  return Singleton;
});
