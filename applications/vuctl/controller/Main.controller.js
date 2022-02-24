sap.ui.define([
  'samples/util/BaseController',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast',
  'samples/applications/vuctl/controller/Control.controller'
], function (BaseController, JSONModel, MessageToast) {
  return BaseController.extend('samples.applications.vuctl.controller.Main', {
    onInit: async function () {
      this.eventBus.subscribe('samples/vuctl', 'change', this.onValueChanged, this);
      this.firstControlLabel = await this.i18n('firstControl.label');
      this.firstControlModel = new JSONModel({
        id: 'firstControl',
        label: this.firstControlLabel,
        value: '0'
      });
      this.secondControlLabel = await this.i18n('secondControl.label');
      this.secondControlModel = new JSONModel({
        id: 'secondControl',
        label: this.secondControlLabel,
        value: '0'
      });
      this.byId('firstControl').setModel(this.firstControlModel);
      this.byId('secondControl').setModel(this.secondControlModel);
    },

    onExit: function () {
      this.eventBus.unsubscribe('samples/vuctl', 'change', this.onValueChanged, this);
    },

    onReset: function () {
      this.firstControlModel.setProperty('/value', '0');
      this.secondControlModel.setProperty('/value', '0');
    },

    onIncrement: function () {
      this.eventBus.publish('samples/vuctl', 'inc');
    },

    onDecrement: function () {
      this.eventBus.publish('samples/vuctl', 'dec');
    },

    onValueChanged: async function (channelId, eventId, data) {
      let firstChanged = '';
      let secondChanged = '';
      if (data.id === 'firstControl') {
        firstChanged = '*';
      } else {
        secondChanged = '*';
      }
      MessageToast.show(`${firstChanged}${this.firstControlLabel} : ${this.firstControlModel.getProperty('/value')}
${secondChanged}${this.secondControlLabel} : ${this.secondControlModel.getProperty('/value')}`);
    }
  });
});
