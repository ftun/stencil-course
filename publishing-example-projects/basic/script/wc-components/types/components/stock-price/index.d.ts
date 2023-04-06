export declare class StockPrice {
  stockInput: HTMLInputElement;
  el: HTMLElement;
  fetchedPrice: number;
  stockUserInput: string;
  stockInputValid: boolean;
  error: string;
  loading: boolean;
  stockSymbol: string;
  stockSymbolChanged(newValue: string, oldValue: string): void;
  onUserInput(e: Event): void;
  onFecthStockPrice(e: Event): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentWillUpdate(): void;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  onStockSymbolSelected(e: CustomEvent): void;
  fetchStockPrice(stockSymbol: string): void;
  hostData(): {
    class: string;
  };
  render(): any[];
}
