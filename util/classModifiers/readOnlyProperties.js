sap.ui.define([], function () {
  return function (Class, properties) {
    Object.defineProperties(Class.prototype, Object.keys(properties)
      .reduce((dictionary, name) => {
        dictionary[name] = {
          get: properties[name]
        };
        return dictionary;
      }, {})
    );
  };
});
