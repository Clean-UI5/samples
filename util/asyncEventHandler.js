sap.ui.define([
  'sap/base/Log'
], function (Log) {
  return function asyncEventHandler (callback) {
    return async function (event) {
      const source = event.getSource();
      const isAControl = source.isA('sap.ui.core.Control');
      if (isAControl) {
        source.setBusy(true);
      }
      try {
        await callback.call(this, event);
      } catch (e) {
        Log.error('An error occurred in an asynchronous event handler', e.toString(), 'sample.utils.asyncEventHandler', () => {
          return {
            ...event,
            callback
          };
        });
      } finally {
        if (isAControl) {
          source.setBusy(false);
        }
      }
    };
  };
});
