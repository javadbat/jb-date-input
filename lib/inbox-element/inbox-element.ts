import HTML from './inbox-element.html';
import CSS from './inbox-element.scss';
export class JBDDateInputInboxElementWebComponent extends HTMLElement {


    constructor() {
        super();
        this.initWebComponent();
    }
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
        this.callOnInitEvent();

    }
    callOnLoadEvent() {
        const event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent() {
        const event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true,
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
    }
    // static get observedAttributes() {
    //     return [];
    // }
    // attributeChangedCallback(name, oldValue, newValue) {
    //     // do something when an attribute has changed
    //     this.onAttributeChange(name, newValue);
    // }
    // onAttributeChange(name:string, value:string) {
    //     // switch (name) {

    //     // }

    // }
}
const myElementNotExists = !customElements.get('jb-date-input-inbox-element');
if (myElementNotExists) {
    window.customElements.define('jb-date-input-inbox-element', JBDDateInputInboxElementWebComponent);
}
