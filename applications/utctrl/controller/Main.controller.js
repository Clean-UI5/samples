sap.ui.define([
  'samples/util/BaseController'
], function (BaseController) {
  return BaseController.extend('samples.applications.utctrl.controller.Main', {
    _adjustSIControls: function ({ specialInstructionsVisible, finalizeReviewEnabled, acknowledgeSIVisible }) {
      this.byId('siContent').setVisible(specialInstructionsVisible);
      this.byId('finalizeReview').setEnabled(finalizeReviewEnabled);
      this.byId('ackSI').setVisible(acknowledgeSIVisible);
    },

    onSalesOrderLoaded: function (salesOrder) {
      const { threshold } = this.getSpecialInstructions();
      const specialInstructionsAcknowledged = salesOrder.specialInstruction !== null;
      const specialInstructionsAckInfo = this.byId('siAckInfo');
      specialInstructionsAckInfo.setVisible(specialInstructionsAcknowledged);
      if (salesOrder.amount > threshold && salesOrder.customer.vip) {
        if (specialInstructionsAcknowledged) {
          this._adjustSIControls({
            specialInstructionsVisible: false,
            finalizeReviewEnabled: true,
            acknowledgeSIVisible: false
          });
        } else {
          this._adjustSIControls({
            specialInstructionsVisible: true,
            finalizeReviewEnabled: false,
            acknowledgeSIVisible: true
          });
        }
      } else {
        this._adjustSIControls({
          specialInstructionsVisible: false,
          finalizeReviewEnabled: true,
          acknowledgeSIVisible: false
        });
      }
    }
  });
});
