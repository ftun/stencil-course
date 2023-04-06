'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e5d455d2.js');

/*
 Stencil Client Patch Esm v3.2.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["wc-spinner_3.cjs",[[1,"wc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"wc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"wcSymbolSelected","onStockSymbolSelected"]]],[1,"wc-spinner"]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map