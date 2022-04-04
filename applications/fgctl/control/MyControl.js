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

    /** @private */
    _onChange: function (event) {
      if (event.getParameter('value') === '') {
        this.setValue('0');
      }
      this.fireChange();
    },

    /** Increment the control value */
    inc: function () {
      this.setValue(parseInt(this.getValue() || '0', 10) + 1);
    },

    /** Decrement the control value */
    dec: function () {
      this.setValue(parseInt(this.getValue() || '0', 10) - 1);
    }
  });
});
