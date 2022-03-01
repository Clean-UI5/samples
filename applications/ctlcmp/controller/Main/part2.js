sap.ui.define([
  'sap/m/MessageToast'
], function (MessageToast) {
  const OFFSET = -30;

  return {
    onInit: function () {
      this.message('part2.init', OFFSET);
    },

    onExit: function () {
      this.message('part2.exit', OFFSET);
    },

    onButton2: async function () {
      this.message('part2.click', OFFSET);
    }
  };
});
  