sap.ui.define([
  'sap/m/MessageToast'
], function (MessageToast) {
  const OFFSET = -90;

  return {
    onInit: function () {
      this.message('part1.init', OFFSET);
    },

    onExit: function () {
      this.message('part1.exit', OFFSET);
    },

    onButton1: async function () {
      this.message('part1.click', OFFSET);
    }
  };
});
