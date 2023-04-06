import { EventEmitter } from "../../stencil-public-runtime";
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  searchResults: {
    symbol: string;
    name: string;
  }[];
  loading: boolean;
  wcSymbolSelected: EventEmitter<string>;
  onFindStocks(e: Event): void;
  onSelectSymbol(symbol: string): void;
  render(): any[];
}
