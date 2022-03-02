sap.ui.define([
  'sap/ui/base/ManagedObject',
  'samples/util/i18n',
  'sap/ui/core/Fragment'

], function (ManagedObject, i18n, Fragment) {
  const DialogController = ManagedObject.extend('samples.util.DialogController', {
    ...i18n,

    constructor: function (parentView) {
      this._parentView = parentView;
    },

    _setup: function (dialog) {
      this._parentView.addDependent(dialog);
      dialog.attachAfterClose(this._onAfterClose, this);
    },

    _onAfterClose: function () {
      this._closed(this._result);
    },

    _load: function () {
      if (this._dialog === undefined) {
        return Fragment.load({
          name: this.getMetadata().getName(),
          controller: this
        }).then((dialog) => {
          this._dialog = dialog;
          this._setup(dialog);
          return dialog;
        });
      }
      return this._dialog;
    },

    open: async function (settings) {
      const dialog = await this._load();
      const promise = new Promise((resolve) => {
        this._closed = resolve;
      });
      this._result = undefined;
      dialog.open();
      return promise;
    },

    setResult: function (value) {
      this._result = value;
    }
  });

  Object.defineProperties(DialogController.prototype, {
    dialog: {
      get: function () {
        return this._dialog;
      }
    },
    defaultModel: {
      get: function () {
        return this.dialog.getModel();
      },
      set: function (model) {
        this.dialog.setModel(model);
      }
    },
    eventBus: {
      get: function () {
        return sap.ui.getCore().getEventBus();
      }
    }
  });

  return DialogController;
});
