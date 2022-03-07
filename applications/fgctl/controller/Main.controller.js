sap.ui.define([
  'samples/util/BaseController',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast'
], function (BaseController, JSONModel, MessageToast) {
  return BaseController.extend('samples.applications.fgctl.controller.Main', {
    onInit: function () {
      this.defaultModel = {
        firstValue: 0,
        secondValue: 0
      };
      this._firstControl = this.byId('firstControl');
      this._secondControl = this.byId('secondControl');
    },

    onReset: function () {
      this.defaultModel.setProperty('/firstValue', '0');
      this.defaultModel.setProperty('/secondValue', '0');
    },

    onIncrement: function () {
      this._firstControl.inc();
      this._secondControl.inc();
    },

    onDecrement: function () {
      this._firstControl.dec();
      this._secondControl.dec();
    },

    onFirstValueChange: async function () {
      MessageToast.show(`${await this.i18n('firstControl.label')} : ${this.defaultModel.getProperty('/firstValue')}`, {
        offset: '0 -90'
      });
    },

    onSecondValueChange: async function () {
      MessageToast.show(`${await this.i18n('secondControl.label')} : ${this.defaultModel.getProperty('/secondValue')}`, {
        offset: '0 -30'
      });
    }
  });
});
