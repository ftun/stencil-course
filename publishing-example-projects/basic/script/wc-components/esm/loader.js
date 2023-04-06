import { p as promiseResolve, b as bootstrapLazy } from './index-2e5d71f2.js';
export { s as setNonce } from './index-2e5d71f2.js';

/*
 Stencil Client Patch Esm v3.2.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["wc-spinner_3",[[1,"wc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"wc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"wcSymbolSelected","onStockSymbolSelected"]]],[1,"wc-spinner"]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map