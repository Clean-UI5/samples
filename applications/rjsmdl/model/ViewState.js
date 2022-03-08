sap.ui.define([
  'sap/ui/model/json/JSONModel'
], function (JSONModel) {
  return class ViewState {
    #name;
    #year;
    #org;
    #model;

    get name () {
      if (this.#name) {
        return this.#name;
      }
      return `${this.#org} (${this.#year})`;
    }

    set name (value) {
      this.#name = value;
    }

    get year () {
      return this.#year;
    }

    set year (value) {
      this.#year = value;
      this.model.refresh();
    }

    get org () {
      return this.#org;
    }

    set org (value) {
      this.#org = value;
      this.model.refresh();
    }

    get model () {
      return this.#model;
    }

    constructor (org, year) {
      this.#org = org;
      this.#year = year;
      this.#model = new JSONModel(this);
    }
  };
});
