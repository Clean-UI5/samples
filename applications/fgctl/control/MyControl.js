sap.ui.define([
  'samples/util/FragmentControl'
], function (FragmentControl) {
  return FragmentControl.extend('samples/applications/fgctl/control/MyControl', {
    metadata: {
      properties: {
        label: { type: 'string', defaultValue: null },
        value: { type: 'string', defaultValue: '0' }
      },
      events: {
        change: {}
      }
    },

    onChange: function (event) {
      if (event.getParameter('value') === '') {
        this.setValue('0');
      }
      this.fireChange();
    },

    inc: function () {
      this.setValue(parseInt(this.getValue() || '0', 10) + 1);
    },

    dec: function () {
      this.setValue(parseInt(this.getValue() || '0', 10) - 1);
    }
  });
});
