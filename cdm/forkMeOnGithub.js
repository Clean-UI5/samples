sap.ui.define([], function () {
  const renderer = sap.ushell.Container.getRenderer('fiori2');
  // eslint-disable-next-line sap-no-hardcoded-url
  const baseUrl = 'https://github.com/Clean-UI5/samples';
  renderer.addUserAction({
    controlType: 'sap.m.Button',
    oControlProperties: {
      icon: 'sap-icon://source-code',
      text: 'Fork me on GitHub',
      press: () => {
        sap.m.URLHelper.redirect(baseUrl, true);
      }
    },
    bIsVisible: true,
    bCurrentState: false
  });
});
