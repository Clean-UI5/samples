sap.ui.define([], function () {
  /**
   * Check if an object (or class) implements the interface
   *
   * @param {object|Function} object - The object or class to test
   * @param {Function} Interface - The interface to compare the object with
   * @return {boolean} true if the object implements the interface
   */
  return function (object, Interface) {
    if (typeof Interface !== 'function') {
      throw new Error('Expected interface');
    }
    let objectToCheck;
    if (typeof object === 'function') {
      objectToCheck = object.prototype;
    } else {
      objectToCheck = object;
    }
    const interfacePrototype = Interface.prototype;
    const interfaceMethods = interfacePrototype.getInterface();
    return Object.keys(interfaceMethods)
      .every((name) => {
        const method = interfacePrototype[name];
        return typeof objectToCheck[name] === 'function' && objectToCheck[name].length === method.length;
      });
  };
});
