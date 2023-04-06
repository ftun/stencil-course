import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
export class StockPrice {
  constructor() {
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
  render() {
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
  static get is() { return "wc-stock-price"; }
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
  static get properties() {
    return {
      "stockSymbol": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "stock-symbol",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "fetchedPrice": {},
      "stockUserInput": {},
      "stockInputValid": {},
      "error": {},
      "loading": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "stockSymbol",
        "methodName": "stockSymbolChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "wcSymbolSelected",
        "method": "onStockSymbolSelected",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=index.js.map
