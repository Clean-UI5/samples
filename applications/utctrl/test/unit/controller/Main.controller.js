sap.ui.require([
  'samples/applications/utctrl/controller/Main.controller'
], function (MainController) {
  class MockControl {
    constructor () {
      this.visible = true;
      this.enabled = true;
    }

    setVisible (value) {
      this.visible = value;
    }

    setEnabled (value) {
      this.enabled = value;
    }
  };

  const TestController = MainController.extend('TestController', {
    constructor: function () {
      // DO NOT CALL PARENT CONSTRUCTOR
      this.finalizeReview = new MockControl();
      this.specialInstructions = new MockControl();
      this.acknowledgeSI = new MockControl();
      this.specialInstructionsAckInfo = new MockControl();

      const controls = {
        finalizeReview: this.finalizeReview,
        siContent: this.specialInstructions,
        ackSI: this.acknowledgeSI,
        siAckInfo: this.specialInstructionsAckInfo
      };

      this.byId = (id) => controls[id];
    },

    getSpecialInstructions: function () {
      return {
        threshold: 100
      };
    }
  });

  QUnit.module('Special instructions handling', {
    beforeEach: function (assert) {
      this.controller = new TestController();
    }
  });

  function checkUIState (assert, controller, {
    specialInstructionsIsVisible,
    finalizeReviewIsEnabled,
    acknowledgeSIIsVisible,
    specialInstructionsAckInfoIsVisible
  }) {
    assert.strictEqual(controller.specialInstructions.visible, specialInstructionsIsVisible, 'Special instructions message strip');
    assert.strictEqual(controller.finalizeReview.enabled, finalizeReviewIsEnabled, 'Finalize review button');
    assert.strictEqual(controller.acknowledgeSI.visible, acknowledgeSIIsVisible, 'Acknowledge button');
    assert.strictEqual(controller.specialInstructionsAckInfo.visible, specialInstructionsAckInfoIsVisible, 'Acknowledged info message strip');
  }

  QUnit.test('Not a VIP customer', function (assert) {
    this.controller.onSalesOrderLoaded({
      amount: 101,
      customer: {
        vip: false
      },
      specialInstruction: null
    });
    checkUIState(assert, this.controller, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: false
    });
  });

  QUnit.test('Not a high amount', function (assert) {
    this.controller.onSalesOrderLoaded({
      amount: 99,
      customer: {
        vip: true
      },
      specialInstruction: null
    });
    checkUIState(assert, this.controller, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: false
    });
  });

  QUnit.test('VIP customer and high amount', function (assert) {
    this.controller.onSalesOrderLoaded({
      amount: 101,
      customer: {
        vip: true
      },
      specialInstruction: null
    });
    checkUIState(assert, this.controller, {
      specialInstructionsIsVisible: true,
      finalizeReviewIsEnabled: false,
      acknowledgeSIIsVisible: true,
      specialInstructionsAckInfoIsVisible: false
    });
  });

  QUnit.test('VIP customer and high amount, special instructions acknowledged', function (assert) {
    this.controller.onSalesOrderLoaded({
      amount: 101,
      customer: {
        vip: true
      },
      specialInstruction: {}
    });
    checkUIState(assert, this.controller, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: true
    });
  });

  QUnit.test('Special instructions acknowledged', function (assert) {
    this.controller.onSalesOrderLoaded({
      amount: 99,
      customer: {
        vip: false
      },
      specialInstruction: {}
    });
    checkUIState(assert, this.controller, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: true
    });
  });
});
