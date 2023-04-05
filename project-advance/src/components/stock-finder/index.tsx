import { Component, Event, EventEmitter, State, h } from "@stencil/core";

import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'wc-stock-finder',
    styleUrl: './index.css',
    shadow: true,
})
export class StockFinder {

    stockNameInput: HTMLInputElement;

    @State() searchResults: { symbol: string, name: string}[] = [];
    @State() loading: boolean = false;

    @Event({bubbles: true, composed: true }) wcSymbolSelected: EventEmitter<string>;

    onFindStocks(e: Event) {
        e.preventDefault();
        this.loading = true;
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
        .then(res => res.json())
        .then(res => {
            // console.log('res', res)
            this.searchResults = res.bestMatches.map(row => {
                return {name: row['2. name'], symbol: row['1. symbol']};
            });
            this.loading = false;
        })
        .catch(err => {
            console.error(err);
            this.loading = false;
        })
    }

    onSelectSymbol(symbol: string) {
        // console.log(symbol)
        this.wcSymbolSelected.emit(symbol);
    }

    render() {
        let content = <ul>
                {this.searchResults.map(row =>
                    <li onClick={this.onSelectSymbol.bind(this, row.symbol)}><strong>{row.symbol}</strong> - {row.name}</li>
                )}
            </ul>;
        if (this.loading) content = <wc-spinner></wc-spinner>;
        
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input id="stock-symbol" type="text" ref={el => this.stockNameInput = el} />
                <button type="submit" >Find!</button>
            </form>,
            content
        ];
    }
}