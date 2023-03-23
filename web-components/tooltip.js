class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'This is the tooltip text';
        this.attachShadow({ mode: 'open' }); // activar/ abrir shadow DOM
        // Nota: debemos acceder al DOM Virtual mediante this.shadowRoot
        // console.log('Tooltip Component');
        // const template = document.querySelector('#tooltip-template');
        // this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }
            </style>
            <slot>Some default</slot>
            <span> (?)</span>
        `;
    }

    // Cuando se momnta en el dom el componente
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')
        }


        // const tooltipIcon = document.createElement('span');
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.shadowRoot.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        // console.log(this._tooltipContainer.style);
        // this._tooltipContainer.style.backgroundColor = 'black';
        // this._tooltipContainer.style.color = 'white';
        // this._tooltipContainer.style.position = 'absolute';
        // this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.appendChild(this._tooltipContainer);

    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }

    // connectedCallback()
    // disconnectedCallback()
    // attributeChangedCallback()
}

customElements.define('ftun-tooltip', Tooltip);
