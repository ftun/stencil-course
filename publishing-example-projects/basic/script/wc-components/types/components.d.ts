/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface WcSpinner {
    }
    interface WcStockFinder {
    }
    interface WcStockPrice {
        "stockSymbol": string;
    }
}
export interface WcStockFinderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLWcStockFinderElement;
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLWcSpinnerElement extends Components.WcSpinner, HTMLStencilElement {
    }
    var HTMLWcSpinnerElement: {
        prototype: HTMLWcSpinnerElement;
        new (): HTMLWcSpinnerElement;
    };
    interface HTMLWcStockFinderElement extends Components.WcStockFinder, HTMLStencilElement {
    }
    var HTMLWcStockFinderElement: {
        prototype: HTMLWcStockFinderElement;
        new (): HTMLWcStockFinderElement;
    };
    interface HTMLWcStockPriceElement extends Components.WcStockPrice, HTMLStencilElement {
    }
    var HTMLWcStockPriceElement: {
        prototype: HTMLWcStockPriceElement;
        new (): HTMLWcStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "wc-spinner": HTMLWcSpinnerElement;
        "wc-stock-finder": HTMLWcStockFinderElement;
        "wc-stock-price": HTMLWcStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface WcSpinner {
    }
    interface WcStockFinder {
        "onWcSymbolSelected"?: (event: WcStockFinderCustomEvent<string>) => void;
    }
    interface WcStockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "wc-spinner": WcSpinner;
        "wc-stock-finder": WcStockFinder;
        "wc-stock-price": WcStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "wc-spinner": LocalJSX.WcSpinner & JSXBase.HTMLAttributes<HTMLWcSpinnerElement>;
            "wc-stock-finder": LocalJSX.WcStockFinder & JSXBase.HTMLAttributes<HTMLWcStockFinderElement>;
            "wc-stock-price": LocalJSX.WcStockPrice & JSXBase.HTMLAttributes<HTMLWcStockPriceElement>;
        }
    }
}
