sap.ui.define([
  'samples/util/BaseController'
], function (BaseController) {
  return BaseController.extend('samples.applications.utctrl.controller.Main', {
    onSalesOrderLoaded: function (salesOrder) {
      const { threshold } = this.getSpecialInstructions();
      const finalizeReview = this.byId('finalizeReview');
      const specialInstructions = this.byId('siContent');
      const acknowledgeSI = this.byId('ackSI');
      const specialInstructionsAcknowledged = salesOrder.specialInstruction !== null;
      const specialInstructionsAckInfo = this.byId('siAckInfo');
      specialInstructionsAckInfo.setVisible(specialInstructionsAcknowledged);
      if (salesOrder.amount > threshold && salesOrder.customer.vip) {
        if (specialInstructionsAcknowledged) {
          specialInstructions.setVisible(false);
          finalizeReview.setEnabled(true);
          acknowledgeSI.setVisible(false);
        } else {
          specialInstructions.setVisible(true);
          finalizeReview.setEnabled(false);
          acknowledgeSI.setVisible(true);
        }
      } else {
        specialInstructions.setVisible(false);
        finalizeReview.setEnabled(true);
        acknowledgeSI.setVisible(false);
      }
    }
  });
});
