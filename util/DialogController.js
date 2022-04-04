sap.ui.define([
  'sap/ui/base/ManagedObject',
  'samples/util/i18n',
  'sap/ui/core/Fragment',
  'samples/util/classModifiers/models',
  'samples/util/classModifiers/eventBus',
  'samples/util/classModifiers/readOnlyProperties',
  'samples/util/asyncEventHandler'
// eslint-disable-next-line max-params
], function (ManagedObject, i18n, Fragment, models, eventBus, readOnlyProperties, asyncEventHandler) {
  const $dialog = Symbol('dialog');
  const $closed = Symbol('closed');
  const $result = Symbol('result');

  const DialogController = ManagedObject.extend('samples.util.DialogController', {
    metadata: {
      properties: {
        view: { type: 'sap.ui.core.mvc.View' },
        contentWidth: { type: 'sap.ui.core.CSSSize' },
        contentHeight: { type: 'sap.ui.core.CSSSize' }
      }
    },
    i18n,

    _fwdProperties: function (dialog) {
      if (this.getContentWidth()) {
        dialog.setContentWidth(this.getContentWidth());
      }
      if (this.getContentHeight()) {
        dialog.setContentHeight(this.getContentHeight());
      }
    },

    _attachEvents: function (dialog) {
      dialog.attachBeforeOpen(asyncEventHandler(async () => {
        await this.onBeforeOpen();
      }));
      dialog.attachAfterOpen(asyncEventHandler(async () => {
        await this.onAfterOpen();
      }));
      dialog.attachBeforeClose(asyncEventHandler(async () => {
        await this.onBeforeClose();
      }));
      dialog.attachAfterClose(asyncEventHandler(async () => {
        this[$closed](this[$result]);
        this.onAfterClose();
      }));
      const inheritedExit = dialog.exit;
      dialog.exit = () => {
        this.onExit();
        return inheritedExit.call(dialog);
      };
    },

    _setup: async function (dialog) {
      this.getView().addDependent(dialog);
      await this.onInit();
      this._fwdProperties(dialog);
      this._attachEvents(dialog);
    },

    _load: function () {
      if (this[$dialog] === undefined) {
        return Fragment.load({
          id: this.getId(),
          name: this.getMetadata().getName(),
          controller: this
        }).then(async (dialog) => {
          this[$dialog] = dialog;
          return this._setup(dialog)
            .then(() => dialog);
        });
      }
      return this[$dialog];
    },

    onInit: function () {},

    onBeforeOpen: function () {},

    onAfterOpen: function () {},

    onBeforeClose: function () {},

    onAfterClose: function () {},

    open: async function () {
      const dialog = await this._load();
      if (dialog.isOpen()) {
        throw new Error('Already opened');
      }
      const promise = new Promise((resolve) => {
        this[$closed] = resolve;
      });
      delete this[$result];
      dialog.open();
      return promise;
    },

    close: function () {
      return this.dialog.close();
    },

    byId: function (id) {
      return Fragment.byId(this.getId(), id);
    },

    setResult: function (value) {
      this[$result] = value;
    }
  });

  models(DialogController, function () { return this.dialog || this.view; });
  eventBus(DialogController);
  readOnlyProperties(DialogController, {
    dialog: function () {
      return this[$dialog];
    },
    view: function () {
      return this.getView();
    }
  });

  return DialogController;
});
