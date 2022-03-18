sap.ui.define([], function () {
  function wrap (methods, definition, member) {
    const filteredMethods = methods.filter(Boolean);
    if (filteredMethods.length) {
      definition[member] = function (...args) {
        filteredMethods.forEach((method) => method.apply(this, args));
      };
    }
  }

  return function controllerCompose (...parts) {
    const definition = {};
    const onInits = [];
    const onExits = [];
    parts.forEach(({ onInit, onExit, ...members }) => {
      onInits.push(onInit);
      onExits.push(onExit);
      Object.assign(definition, members);
    });
    wrap(onInits, definition, 'onInit');
    wrap(onExits, definition, 'onExit');
    return definition;
  };
});
