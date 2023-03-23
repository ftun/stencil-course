class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm('Do you really want to leave??')) {
                event.preventDefault();

            }
        });
    }
}

// Nota: cuando se extiende de un elemento en espeficio se pasa un tercer algumento especificando
//      al igual que para utilizar el mismo se define un nuevo atributo al mismo, por ejemplo: 
//              <a is="ftun-confirm-link" href="https://www.google.com/">Google</a>
customElements.define('ftun-confirm-link', ConfirmLink, {
    extends: 'a',
});