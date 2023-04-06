import { h } from "@stencil/core";
export class Spinner {
  render() {
    return h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null));
  }
  static get is() { return "wc-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["./index.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["index.css"]
    };
  }
}
//# sourceMappingURL=index.js.map
