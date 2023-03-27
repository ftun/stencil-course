class Tooltip extends HTMLElement {
    constructor() {
        super();
        // this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = 'This is the tooltip text';
        this.attachShadow({ mode: 'open' }); // activar/ abrir shadow DOM
        // Nota: debemos acceder al DOM Virtual mediante this.shadowRoot
        // console.log('Tooltip Component');
        // const template = document.querySelector('#tooltip-template');
        // this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
                }

                .highlight {
                    background-color: red;
                }

                /* se pasa un selector entre parentesis */
                ::slotted(.highlight) {
                    border-bottom: 2px dotted red;
                }

                .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }

                /* Estilos al mismo componente, se pasa un selector entre parentesis */
                :host(.important) {
                    /* se accede a la variable declarada en el html{}, y como segundo argumento se puede pasar un valor por default */
                    background: var(--color-primary, lightcoral);
                    padding: 0.15rem;
                }

                /* Estilos al componente dentro de un contexto para hubicarlo (parents), se pasa un selector entre parentesis */
                :host-context(p) {
                    font-weight: bold;
                }

                :host {
                    position: relative;
                }

            </style>
            <slot>Some default</slot>
            <span class="icon"> (?)</span>
        `;
    }

    // Cuando se momnta en el dom el componente
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')
        }


        // const tooltipIcon = document.createElement('span');
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.textContent = ' (?)';
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // this.shadowRoot.appendChild(this._tooltipIcon); // no es necesario por el slop implementado
        // this.style.position = 'relative';
        this._render()
    }

    // Se invoca/ejecuta cuando se realiza un cambio en los atributos
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log('attributeChangedCallback', name, oldValue, newValue)
        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            this._tooltipText = newValue;
        }
        
    }

    // Se ejecuta cuando se remueve del DOM
    disconnectedCallback() {
        console.log('disconnectedCallback')
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) this.shadowRoot.removeChild(tooltipContainer);
        }
    }

    // Se define que atributos se quieren observar en los cambios
    static get observedAttributes() {
        return ['text', 'class'];
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render()
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render()
    }

    // connectedCallback()
    // disconnectedCallback()
    // attributeChangedCallback()
}

customElements.define('ftun-tooltip', Tooltip);
