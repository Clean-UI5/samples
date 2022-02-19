sap.ui.require([
], function () {
  const shellHeader = document.getElementById('shell-header');
  function setLogo () {
    if (!setLogo.inProgress) {
      setLogo.inProgress = true
      const companyLogo = document.getElementById('shell-header-icon');
      if (companyLogo) {
        companyLogo.setAttribute('src', '/ui5_orange.svg');
        companyLogo.setAttribute('width', '32px');
      }
      setTimeout(() => delete setLogo.inProgress, 0);
    }
  }
  const shellHeaderObserver = new MutationObserver(setLogo);
  shellHeaderObserver.observe(shellHeader, { attributes: true, childList: true, subtree: true });

  if (window.location.search) {
    const sample = /\?(\w+)/.exec(window.location.search)[1];
    history.replaceState('', 'Clean-UI5 samples', '/index.html')
    sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")
      .then(service => service.toExternal({
        target: {
          semanticObject: 'sample',
          action: sample
        }
      }));
  }
});