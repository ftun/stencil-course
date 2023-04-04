import { Component, Method, Prop, State, h } from "@stencil/core";

@Component({
    tag: 'wc-side-drawer', // nombre de la etiqueta con la que se invocara el componente <wc-side-drawer />
    styleUrl: './side-drawer.css', // importar: "styleUrls:[]" "style:'' "
    // scoped: true, //paea que los stylos solo afecten a este componente usando un shadown DOM virtual/emulado no se puede usar el :host() {} selector
    shadow: true,  // usa el shadow DOM nativo, se puede usar el :host() {} selector
})
export class SideDrawer {
    @State() showContactInfo = false;

    // @Prop() es un decorador para declarar variables, stencil agrega un observador a estas declaraciones para validar si han cambiado
    // Si de configura la propiedad "reflec" si cambia los valores por programacion del componente esto se reflejaran en el DOM
    @Prop({ reflect: true }) title: string;

    @Prop({ reflect: true, mutable: true }) opened: boolean;

    @Method() // Se agrega el decorador para hacer publico el metodo y que se pueda acceder desde la instancia del componente
    open() {
        this.opened = true;
    }

    onClose() {
        // Los componentes son unidireccionales, sus propiedades no se pueden cambiar en codigo de esta manera, 
        // Al menos que sea configurada como "mutable"
        this.opened = false;
    }

    onContentChange(content: string) {
        // console.log('c>', content)
        // En react es el equivalente a realizar un setState() del status, pero no es necesario con stencil
        this.showContactInfo = content === 'contact';
    }

    render() {
        let mainContent = <slot />;
        if (this.showContactInfo) {
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email.</p>
                    <ul>
                        <li>Phone 987654321</li>
                        <li>Email: <a href="mailto:felipe.tun.cauich@gmail.com">felipe.tun.cauich@gmail.com</a></li>
                    </ul>
                </div>
            );
        }
        return [
            <div class="backdrop" onClick={this.onClose.bind(this)}></div>,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onClose.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button 
                        class={!this.showContactInfo ? 'active' : ''} 
                        onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button 
                        class={this.showContactInfo ? 'active' : ''} 
                        onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        ];
    }
}