sap.ui.define([
  'sap/m/MessageBox'
], function (MessageBox) {
  return function messageBox (label, options) {
    return new Promise((resolve) => {
      MessageBox.show(label, {
        title: 'My application',
        icon: MessageBox.Icon.INFORMATION,
        ...options,
        closeOnNavigation: true,
        onClose: resolve
      });
   });
  };
});
