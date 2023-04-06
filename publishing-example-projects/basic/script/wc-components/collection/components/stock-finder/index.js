import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
export class StockFinder {
  constructor() {
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(e) {
    e.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(res => {
      // console.log('res', res)
      this.searchResults = res.bestMatches.map(row => {
        return { name: row['2. name'], symbol: row['1. symbol'] };
      });
      this.loading = false;
    })
      .catch(err => {
      console.error(err);
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    // console.log(symbol)
    this.wcSymbolSelected.emit(symbol);
  }
  render() {
    let content = h("ul", null, this.searchResults.map(row => h("li", { onClick: this.onSelectSymbol.bind(this, row.symbol) }, h("strong", null, row.symbol), " - ", row.name)));
    if (this.loading)
      content = h("wc-spinner", null);
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", type: "text", ref: el => this.stockNameInput = el }), h("button", { type: "submit" }, "Find!")),
      content
    ];
  }
  static get is() { return "wc-stock-finder"; }
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
  static get states() {
    return {
      "searchResults": {},
      "loading": {}
    };
  }
  static get events() {
    return [{
        "method": "wcSymbolSelected",
        "name": "wcSymbolSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=index.js.map
