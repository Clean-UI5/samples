sap.ui.define([], function () {
  const renderer = sap.ushell.Container.getRenderer('fiori2');
  renderer.addUserAction({
    controlType: 'sap.m.Button',
    oControlProperties: {
      icon: 'sap-icon://source-code',
      text: 'Fork me on GitHub',
      press: () => {
        sap.m.URLHelper.redirect('https://github.com/Clean-UI5/samples', true);
      }
    },
    bIsVisible: true,
    bCurrentState: false
  });
});
