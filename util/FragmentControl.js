sap.ui.define([
  'sap/ui/core/Control',
  'sap/ui/core/Fragment',
  'sap/ui/model/json/JSONModel'
], function (Control, Fragment, JSONModel) {
  // Make access to the $this model complicated (but not impossible)
  const $thisModel = Symbol('$thisModel');

  const FragmentControl = Control.extend('samples/util/FragmentControl', {
    metadata: {
      aggregations: {
        _fragment: { type: 'sap.ui.core.Control', multiple: false, visibility: 'hidden' }
      }
    },

    constructor: function (...args) {
      Control.apply(this, args);
      const PropertiesWrapper = getPropertiesWrapper(this.constructor);
      this[$thisModel] = new JSONModel(new PropertiesWrapper(this));
    },

    init: function () {
      return Fragment.load({
        id: this.getId(),
        name: this.getMetadata().getName(),
        controller: this
      })
        .then((fragment) => {
          fragment.setModel(this[$thisModel], '$this');
          this.setAggregation('_fragment', fragment);
          this.invalidate();
        });
    },

    // Delegate properties write to the $this model to refresh control state

    _inhSetProperty: Control.prototype.setProperty,

    _setProperty: function (name, value) {
      this._inhSetProperty(name, value, this._suppressInvalidate);
    },

    setProperty: function (name, value, suppressInvalidate) {
      this._suppressInvalidate = suppressInvalidate;
      this[$thisModel].setProperty('/' + name, value);
      delete this._suppressInvalidate;
    }
  });

  FragmentControl.render = function (rm, control) {
    const fragment = control.getAggregation('_fragment');
    if (fragment) {
      rm.renderControl(fragment);
    }
  };

  class FragmentControlPropertiesWrapper {
    _ctrl;

    constructor (ctrl) {
      this._ctrl = ctrl;
    }
  };

  const $PropertiesWrapper = Symbol('FragmentControlPropertiesWrapper');

  function buildPropertiesWrapper (Class) {
    const metadata = Class.getMetadata();
    const BasePropertiesWrapper = getPropertiesWrapper(Class.getMetadata().getParent().getClass());
    class PropertiesWrapper extends BasePropertiesWrapper {};
    if (metadata.getProperties) {
      Object.keys(metadata.getProperties()).forEach((name) =>
        Object.defineProperty(PropertiesWrapper.prototype, name, {
          get: function () {
            return this._ctrl.getProperty(name);
          },
          set: function (value) {
            this._ctrl._setProperty(name, value);
          }
        })
      );
    }
    return PropertiesWrapper;
  }

  function getPropertiesWrapper (Class) {
    if (Class === FragmentControl) {
      return FragmentControlPropertiesWrapper;
    }
    if (!Class[$PropertiesWrapper]) {
      Class[$PropertiesWrapper] = buildPropertiesWrapper(Class);
    }
    return Class[$PropertiesWrapper];
  }

  const nativeExtend = FragmentControl.extend;
  FragmentControl.extend = function (className, classInfo, metaImpl) {
    if (!classInfo.renderer) {
      classInfo.renderer = 'samples/util/FragmentControl';
    }
    return nativeExtend.call(this, className, classInfo, metaImpl);
  };

  const a = 1;
  alert(a);

  return FragmentControl;
});
