import { r as registerInstance, h, c as createEvent, g as getElement, H as Host } from './index-2e5d71f2.js';

const indexCss$2 = ".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid #3b013b;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:nth-child(1){animation-delay:-0.45s}.lds-ring div:nth-child(2){animation-delay:-0.3s}.lds-ring div:nth-child(3){animation-delay:-0.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Spinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null));
  }
};
Spinner.style = indexCss$2;

const AV_API_KEY = '32VATWT27K56Q99T';

const indexCss$1 = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;margin-bottom:0.5rem}form input:focus,form form input:focus:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white;cursor:pointer}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border:#ccc;color:white;cursor:not-allowed}ul{margin:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

const StockFinder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wcSymbolSelected = createEvent(this, "wcSymbolSelected", 7);
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
};
StockFinder.style = indexCss$1;

const indexCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:rgb(235, 153, 0)}form input{font:inherit;color:var(--color-primary, black);padding:0.1rem 0.25rem;margin-bottom:0.5rem}form input:focus,form form input:focus:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white);cursor:pointer}form button:hover,form button:active{background:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background:#ccc;border:#ccc;color:white;cursor:not-allowed}";

const StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fetchedPrice = undefined;
    this.stockUserInput = undefined;
    this.stockInputValid = false;
    this.error = undefined;
    this.loading = false;
    this.stockSymbol = undefined;
  }
  // establece un observador para este Prop::stockSymbol para ejecutar el metodo cuando cambia la misma
  // Este pasa al metodo el valor nuevo y anterior del mismo tipo definido 
  stockSymbolChanged(newValue, oldValue) {
    if (newValue != oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  onUserInput(e) {
    this.stockUserInput = e.target.value;
    this.stockInputValid = this.stockUserInput.trim() !== '';
  }
  onFecthStockPrice(e) {
    e.preventDefault();
    // Forma INCORRECTA de acceder al valor, por que TS detecta que no todos los elementos HTMl pueden tener este atributo
    // Y tambien por que al estar activo el shodow dom debemos acceder al atributo mediante el shadowRoot
    //this.el.querySelector('#stock-symbol').value;
    // FORMA CORRECTA, es decir que tipo de elemento es
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(stockSymbol); // Ya no es necesario por que al actualizar el valor se ejecuta el codigo del metodo stockSymbolChanged
  }
  // metodo ciclo de vida de componente stencil: Cuando el componente esta por cargarse
  componentWillLoad() {
    console.log('componentWillLoad', this.stockSymbol);
    this.fetchedPrice = 0;
  }
  // metodo ciclo de vida de componente stencil: cuando este se carga en el DOM
  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  // metodo ciclo de vida de componente stencil: se activa antes de procesar una actualizacion del componente 
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  // metodo ciclo de vida de componente stencil: se activa cuando se actualiza el componente
  componentDidUpdate() {
    console.log('componentDidUpdate');
    // if(this.stockSymbol !== this.initialStockSymbol) {
    //     this.initialStockSymbol = this.stockSymbol;
    //     this.fetchStockPrice(this.stockSymbol);
    // }
  }
  // metodo ciclo de vida de componente stencil: cuando el componente es removido del DOM
  // antes llamado => componentDidUnload()
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
  // Decorador para escuchar cualquier evento, recive como argumento el nombre del evento a captar para ejecutar el metodo
  // @Listen('wcSymbolSelected') // => de esta manera escucha eventos dentro del componente que esta en el shadow DOm
  onStockSymbolSelected(e) {
    // console.log('onStockSymbolSelected::wcSymbolSelected')
    if (e.detail && e.detail !== this.stockSymbol) {
      // stockSymbol tienen un watcher para ejecutar un metodo al modificar este valor de esta propiedad
      this.stockSymbol = e.detail;
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
      if (res.status !== 200)
        throw new Error('Invalid!');
      return res.json();
    })
      .then(res => {
      if (!res['Global Quote']['05. price'])
        throw new Error('Invalid Symbol!!');
      this.error = '';
      this.fetchedPrice = +res['Global Quote']['05. price']; // se castea a number
      this.loading = false;
    })
      .catch(err => {
      // console.log(err)
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }
  // Metodo stencil que ayuda a manimular atributos del componente mismo, retornand un objeto de los mismos!
  hostData() {
    // REVISAR por que no se esta retornando por si solo la clase: hydrated del componente
    return { class: this.error ? 'error hydrated' : 'hydrated' };
  }
  __stencil_render() {
    let dataContent = h("p", null, "Please enter a symbol");
    if (this.error)
      dataContent = h("p", null, this.error);
    if (this.fetchedPrice)
      dataContent = h("p", null, "Price: $", this.fetchedPrice);
    if (this.loading)
      dataContent = h("wc-spinner", null);
    return [
      h("form", { onSubmit: this.onFecthStockPrice.bind(this) }, h("input", { id: "stock-symbol", type: "text", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = indexCss;

export { Spinner as wc_spinner, StockFinder as wc_stock_finder, StockPrice as wc_stock_price };

//# sourceMappingURL=wc-spinner_3.entry.js.map