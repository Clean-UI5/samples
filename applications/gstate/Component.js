sap.ui.define([
  'sap/ui/core/UIComponent',
  'samples/util/classModifiers/eventBus',
  'samples/util/classModifiers/models'
], function (UIComponent, eventBus, models) {
  let numberOfTimesOpened = 0;

  const Component = UIComponent.extend('samples.applications.gstate.Component', {
    metadata: {
      manifest: 'json'
    },

    init: function () {
      UIComponent.prototype.init.call(this, arguments);
      ++numberOfTimesOpened;
      this.defaultModel = {
        numberOfTimesOpened
      };
      this.eventBus.subscribe('gstate', 'reset', this.onReset, this);
    },

    exit: function () {
      this.eventBus.unsubscribe('gstate', 'reset', this.onReset);
    },

    onReset: function () {
      numberOfTimesOpened = 0;
      this.defaultModel = {
        numberOfTimesOpened
      };
    }
  });

  eventBus(Component);
  models(Component);

  Component.getMockData = function () {
    return numberOfTimesOpened;
  };

  return Component;
});
