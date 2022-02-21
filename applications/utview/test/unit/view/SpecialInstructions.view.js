sap.ui.require([
  'sap/ui/core/mvc/XMLView',
  'sap/ui/model/json/JSONModel'
], function (XMLView, JSONModel) {
  QUnit.module('Special instructions handling', {
    beforeEach: function (assert) {
      const done = assert.async();
      XMLView.create({
        viewName: 'samples/applications/utview/view/SpecialInstructions'
      }).then((view) => {
        this.view = view;
        this.defaultModel = new JSONModel({
          amount: 0,
          customer: {
            vip: false
          },
          specialInstruction: null
        });
        view.setModel(this.defaultModel);
        view.bindElement('/');
        this.siModel = new JSONModel({
          threshold: 100
        });
        view.setModel(this.siModel, 'si');
        done();
      });
    }
  });

  function setModelsState (amount, vip, specialInstruction = null) {
    this.defaultModel.setProperty('/amount', amount);
    this.defaultModel.setProperty('/customer/vip', vip);
    this.defaultModel.setProperty('/specialInstruction', specialInstruction);
  }

  function checkUIState (assert, view, {
    specialInstructionsIsVisible,
    finalizeReviewIsEnabled,
    acknowledgeSIIsVisible,
    specialInstructionsAckInfoIsVisible
  }) {
    assert.strictEqual(view.byId('siContent').getVisible(), specialInstructionsIsVisible, 'Special instructions message strip');
    assert.strictEqual(view.byId('finalizeReview').getEnabled(), finalizeReviewIsEnabled, 'Finalize review button');
    assert.strictEqual(view.byId('ackSI').getVisible(), acknowledgeSIIsVisible, 'Acknowledge button');
    assert.strictEqual(view.byId('siAckInfo').getVisible(), specialInstructionsAckInfoIsVisible, 'Acknowledged info message strip');
  }

  QUnit.test('View and controls are loaded', function (assert) {
    assert.notStrictEqual(this.view, undefined, 'View object exists');
    const finalizeReview = this.view.byId('finalizeReview');
    assert.notStrictEqual(finalizeReview, undefined, 'Finalize review button is available');
    assert.ok(finalizeReview.isA('sap.m.Button'), 'Finalize review button is a sap.m.Button');
  });

  QUnit.test('Not a VIP customer', function (assert) {
    setModelsState.call(this, 101, false);
    checkUIState(assert, this.view, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: false
    });
  });

  QUnit.test('Not a high amount', function (assert) {
    setModelsState.call(this, 99, true);
    checkUIState(assert, this.view, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: false
    });
  });

  QUnit.test('VIP customer and high amount', function (assert) {
    setModelsState.call(this, 101, true);
    checkUIState(assert, this.view, {
      specialInstructionsIsVisible: true,
      finalizeReviewIsEnabled: false,
      acknowledgeSIIsVisible: true,
      specialInstructionsAckInfoIsVisible: false
    });
  });

  QUnit.test('VIP customer and high amount, special instructions acknowledged', function (assert) {
    setModelsState.call(this, 101, true, {});
    checkUIState(assert, this.view, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: true
    });
  });

  QUnit.test('Special instructions acknowledged', function (assert) {
    setModelsState.call(this, 99, false, {});
    checkUIState(assert, this.view, {
      specialInstructionsIsVisible: false,
      finalizeReviewIsEnabled: true,
      acknowledgeSIIsVisible: false,
      specialInstructionsAckInfoIsVisible: true
    });
  });
});
