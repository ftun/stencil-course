class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
        <style>

        /* para poner el primer plano en negro/gris */
        #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.75);
            opacity: 0;
            pointer-events: none;
        }
        
        /* En vez de utilizar los metodos "attributeChangedCallback" "observedAttributes" */
        :host([opened]) #backdrop,
        :host([opened]) #modal {
            opacity: 1;
            pointer-events: all;
        }

        :host([opened]) #modal {
            top: 15vh;
        }

        /* contendor donde se mostrata la info */
        #modal {
            position: fixed;
            top: 10vh;
            left: 25%;
            width: 50%;
            /* height: 30rem; */
            z-index: 100;
            background: white;
            border-radius: 3px;
            box-shadow: 0 2 px 8px rgba(0, 0, 0, 0.26);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity: 0;
            pointer-events: none;
            /* para que aparesca poco a poco en pantalla */
            transition: all 0.3s ease-out;
        }

        header {
            padding: 1rem;
            border-bottom: 1px solid #ccc;
        }

        slotted(h1) {
            font-size: 1.25rem;
            margin: 0;
        }

        #main {
            padding: 1rem;
        }

        #actions {
            border-top: 1px solid #ccc;
            padding: 1rem;
            display: flex;
            justify-content: flex-end;
        }

        #actions button {
            margin: 0 0.25rem;
        }
                
        </style>

        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">Default Slot</slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Ok</button>
            </section>
        </div>
        `;
        
        // Acceder al contenido de los slots
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes())
        });

        const backdrop = this.shadowRoot.querySelector('#backdrop')
        const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
        const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');

        backdrop.addEventListener('click', this._cancel.bind(this))
        cancelBtn.addEventListener('click', this._cancel.bind(this));
        confirmBtn.addEventListener('click', this._confirm.bind(this));
        // cancelBtn.addEventListener('cancel', e => {
        //     console.log('cancel inside the component');
        // });

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'opened') {
            this.isOpen = this.hasAttribute('opened');
            // if (this.hasAttribute('opened')) {
            //     this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
            //     this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';

            //     this.shadowRoot.querySelector('#modal').style.opacity = 1;
            //     this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
            // }
        }
    }

    static get observedAttributes() {
        return ['opened']
    }

    open () {
        this.setAttribute('opened', '');
    }

    hide() {
        if (this.isOpen) this.removeAttribute('opened');
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        // se asocia un elemento del shadowDom por lo que hay que agregar configurciones al crear el evento
        const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm(event) {
        this.hide();
        // se asocia directamente al elemento (objecto/Class)
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent);
    }
}

customElements.define('ftun-modal', Modal);