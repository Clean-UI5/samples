sap.ui.define([], function () {
  return function controllerCompose (...parts) {
    const definition = {};
    const onInits = [];
    const onExits = [];
    parts.forEach(({ onInit, onExit, ...members }) => {
      onInits.push(onInit);
      onExits.push(onExit);
      Object.assign(definition, members);
    });
    const initMethods = onInits.filter(Boolean);
    if (initMethods.length) {
      definition.onInit = function () {
        initMethods.forEach((onInit) => onInit.apply(this, arguments));
      };
    }
    const exitMethods = onExits.filter(Boolean);
    if (exitMethods.length) {
      definition.onExit = function () {
        exitMethods.forEach((onExit) => onExit.apply(this, arguments));
      };
    }
    return definition;
  };
});
