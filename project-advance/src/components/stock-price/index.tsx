import { Component, Element, Listen, Prop, State, Watch, h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'wc-stock-price',
    styleUrl: './index.css',
    shadow: true,
})
export class StockPrice {
    // Es mas facil inicializar variables y estas seran las referencia al componente ref={ el => this.myAttr = el}
    stockInput: HTMLInputElement;
    // initialStockSymbol: string;

    // Decorador para acceder al elemento adyacente lo equivalente a :host() {} en CSS, considerando si tiene el shadow activo
    @Element() el:  HTMLElement

    @State() fetchedPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid:boolean = false;
    @State() error: string;
    @State() loading: boolean = false;

    // los props en notacion cammelCase deben ser atributos con nombres separados por guin medio en el componente
    // Ejemplo "stock-symbol"
    @Prop({ mutable:true, reflect: true }) stockSymbol: string;

    // establece un observador para este Prop::stockSymbol para ejecutar el metodo cuando cambia la misma
    // Este pasa al metodo el valor nuevo y anterior del mismo tipo definido 
    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
        if (newValue != oldValue) {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPrice(newValue);
        }
    }

    onUserInput(e: Event) {
        this.stockUserInput = (e.target as HTMLInputElement).value;
        this.stockInputValid = this.stockUserInput.trim() !== '';
    }

    onFecthStockPrice(e: Event) {
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
    @Listen('wcSymbolSelected', {target: 'body'}) // => esta forma se especifica a que nivel debe de escuchar loe eventos
    onStockSymbolSelected(e: CustomEvent) {
        // console.log('onStockSymbolSelected::wcSymbolSelected')
        if (e.detail && e.detail !== this.stockSymbol) {
            // stockSymbol tienen un watcher para ejecutar un metodo al modificar este valor de esta propiedad
            this.stockSymbol = e.detail;
        }
    }

    fetchStockPrice(stockSymbol: string) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
            if (res.status !== 200) throw new Error('Invalid!');
            return res.json();
        })
        .then( res => {
            if (!res['Global Quote']['05. price']) throw new Error('Invalid Symbol!!');
            this.error = '';
            this.fetchedPrice = +res['Global Quote']['05. price']; // se castea a number
            this.loading = false;
        })
        .catch(err => {
            // console.log(err)
            this.error = err.message;
            this.fetchedPrice = null;
            this.loading = false;
        })
        ;
    }

    // Metodo stencil que ayuda a manimular atributos del componente mismo, retornand un objeto de los mismos!
    hostData() {
        // REVISAR por que no se esta retornando por si solo la clase: hydrated del componente
        return { class: this.error ? 'error hydrated': 'hydrated'};
    }

    render() {
        let dataContent = <p>Please enter a symbol</p>;
        if (this.error) dataContent = <p>{this.error}</p>;
        if (this.fetchedPrice) dataContent = <p>Price: ${this.fetchedPrice}</p>;
        if (this.loading) dataContent = <wc-spinner></wc-spinner>;

        return [
            <form onSubmit={this.onFecthStockPrice.bind(this)}>
                <input id="stock-symbol" type="text" 
                    ref={el => this.stockInput = el} 
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)} // note: https://www.w3schools.com/tags/ev_oninput.asp
                />
                <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}