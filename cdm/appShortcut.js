sap.ui.define([], function () {
  if (window.location.search) {
    const sample = /\?(\w+)/.exec(window.location.search)[1];
    history.replaceState('', 'Clean-UI5 samples', 'index.html');
    sap.ushell.Container.getServiceAsync('CrossApplicationNavigation')
      .then((service) => service.toExternal({
        target: {
          semanticObject: 'sample',
          action: sample
        }
      }));
  }
});
