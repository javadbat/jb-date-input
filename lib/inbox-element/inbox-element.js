import { number } from 'prop-types';
import HTML from './inbox-element.html';
import CSS from './inbox-element.scss';
class JBDDateInputInboxElementWebComponent extends HTMLElement {


    constructor() {
        super();
        this.initWebComponent();
    }
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
        this.initProp();
        this.callOnInitEvent();

    }
    callOnLoadEvent() {
        var event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent() {
        var event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus:true,
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        this._shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            
        };
    }

    initProp() {

    }

    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        // switch (name) {
            
        // }

    }
}
const myElementNotExists = !customElements.get('jb-date-input-inbox-element');
if (myElementNotExists) {
    window.customElements.define('jb-date-input-inbox-element', JBDDateInputInboxElementWebComponent);
}
