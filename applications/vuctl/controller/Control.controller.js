sap.ui.define([
  'samples/util/BaseController'
], function (BaseController) {
  const ControlController = BaseController.extend('samples.applications.vuctl.controller.Control', {
    onInit: function () {
      this.eventBus.subscribe('samples/vuctl', 'reset', this.onReset, this);
      this.eventBus.subscribe('samples/vuctl', 'inc', this.onIncrement, this);
      this.eventBus.subscribe('samples/vuctl', 'dec', this.onDecrement, this);
    },

    onExit: function () {
      this.eventBus.unsubscribe('samples/vuctl', 'reset', this.onReset, this);
      this.eventBus.unsubscribe('samples/vuctl', 'inc', this.onIncrement, this);
      this.eventBus.unsubscribe('samples/vuctl', 'dec', this.onDecrement, this);
    },

    notify: function () {
      const id = this.defaultModel.getProperty('/id');
      const value = this.value;
      this.eventBus.publish('samples/vuctl', 'change', {
        id,
        value
      });
    },

    onChange: function (oEvent) {
      if (oEvent.getParameter('value') === '') {
        this.value = 0;
      }
      this.notify();
    },

    onReset: function () {
      this.value = 0;
      this.notify();
    },

    onIncrement: function () {
      this.value = this.value + 1;
      this.notify();
    },

    onDecrement: function () {
      this.value = this.value - 1;
      this.notify();
    }
  });

  Object.defineProperties(ControlController.prototype, {
    value: {
      get: function () {
        return parseInt(this.defaultModel.getProperty('/value') || '0', 10);
      },
      set: function (value) {
        this.defaultModel.setProperty('/value', value);
        return true;
      }
    }
  });
});
