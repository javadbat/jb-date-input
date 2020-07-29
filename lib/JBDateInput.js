import HTML from './JBDateInput.html';
import CSS from './JBDateInput.scss';
class JBDateInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    get value() {
        return this._value
    }
    set value(value) {
        this._value = value;
        if (this.internals_) {
            this.internals_.setFormValue(value);
        }
    }
    get _inputValue() {
        return this.inputElement.value;
    }
    set _inputValue(value) {
        this.inputElement.value = value;
    }
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser dont support attachInternals
            this.internals_ = this.attachInternals();
        }
        this.initWebComponent();
        this.initProp();
        // js standard input element to more assosicate it with form element
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._html = `<style>${CSS}</style>` + '\n' + HTML
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this.inputElement = this._shadowRoot.querySelector('.input-box input');
        this.registerEventListener();
    }
    registerEventListener() {
        this.inputElement.addEventListener('change', this.onInputChange.bind(this));
        this.inputElement.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.inputElement.addEventListener('keyup', this.onInputKeyup.bind(this))
        this.inputElement.addEventListener('keydown', this.onInputKeydown.bind(this))
    }
    initProp() {
        this.validationList = [];
        this.value = this.getAttribute('value') || '';
        this._valueObj = {
            year: null,
            month: null,
            day: null,
            jYear: null,
            jMonth: null,
            jDay: null,
            timeStamp: null,
        }
        this.inputRegex = /^(?<year>[\d,\s]{4})\/(?<month>[\d,\s]{2})\/(?<day>[\d,\s]{2})$/g;
        this._inputValue = '    /  /  ';
        this.validation = {
            isValid: null,
            message: null
        }
    }
    static get observedAttributes() {
        return ['label', 'type', 'message', 'value', 'name'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'label':
                this._shadowRoot.querySelector('label .label-value').innerHTML = value;
                break;
            case 'message':
                this._shadowRoot.querySelector('.message-box').innerHTML = value;
                break;
            case 'value':
                this.value = value;
                break;
            case 'name':
                this.inputElement.setAttribute('name', value);
                break;
        }

    }
    inputChar(char, pos) {
        let newValueArr = this._inputValue.split('');
        newValueArr[pos] = char;
        const newValue = newValueArr.join('');
        const res = this.inputRegex.test(newValue);
        this.inputRegex.lastIndex = 0;
        if (res) {
            this._inputValue = newValue;
        }
    }
    onInputKeyPress(e) {
        //TODO: raise keypress event
        let carretPos = e.target.selectionStart;
        const inputedChar = e.key;
        if(carretPos == 4 || carretPos ==7){
            // in / pos
            if(inputedChar == '/'){
                e.target.setSelectionRange(carretPos + 1, carretPos + 1);
            }
            if(!isNaN(inputedChar)){
                carretPos++;
            }
        }
        if(!isNaN(inputedChar)){
            if(carretPos == 5 && parseInt(inputedChar) >1){
                this.inputChar("0", carretPos);
                carretPos ++;  
            }
            if(carretPos == 8 && parseInt(inputedChar) >3){
                this.inputChar("0", carretPos);
                carretPos ++;  
            }
            this.inputChar(inputedChar, carretPos);
            e.target.setSelectionRange(carretPos + 1, carretPos + 1);
        }
        
        e.preventDefault();

    }
    onInputKeyup(e) {
        const inputText = e.target.value;
        this.triggerInputValidation(false);
        //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
        this._value = inputText;
    }
    onInputKeydown(e) {
        if (e.keyCode == 8) {
            const carretPos = e.target.selectionStart;
            this.inputChar(' ', carretPos-1);
            e.target.setSelectionRange(carretPos-1, carretPos-1);
            e.preventDefault();
        }
    }
    onInputChange(e) {
        const inputText = e.target.value;
        this.triggerInputValidation(true);
        //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
        this._value = inputText;
        const validationObject = this.checkInputValidation(inputText);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationObject.isAllValid,
                validationObject: validationObject,
            },
        });
        this.dispatchEvent(event);
    }
    triggerInputValidation(showError = true) {
        // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
        //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
        const inputText = this._shadowRoot.querySelector('.input-box input').value;

        const validationResult = this.checkInputValidation(inputText);

        if (showError == true && !validationResult.isAllValid) {
            const firstFault = validationResult.validationList.find(x => !x.isValid);
            this.showValidationError(firstFault.message);
        } else if (validationResult.isAllValid) {
            this.clearValidationError();
        }
        return validationResult;
    }
    checkInputValidation(value) {
        const validationResult = {
            validationList: [],
            isAllValid: true
        }
        this.validationList.forEach((validation) => {
            const res = this.checkValidation(value, validation);
            validationResult.validationList.push(res);
            if (!res.isValid) {
                validationResult.isAllValid = false;
            }
        });
        return validationResult;
    }
    checkValidation(text, validation) {
        var testRes
        if (validation.validator instanceof RegExp) {
            testRes = validation.validator.test(text);
            validation.validator.lastIndex = 0;
        }

        if (typeof validation.validator == "function") {
            testRes = validation.validator(text);
        }

        if (!testRes) {
            return {
                isValid: false,
                message: validation.message,
                validation: validation
            }
        }
        return {
            isValid: true,
            message: '',
            validation: validation
        };
    }
    showValidationError(error) {
        this.validation = {
            isValid: false,
            message: error
        }
        this._shadowRoot.querySelector('.message-box').innerHTML = error;
        this._shadowRoot.querySelector('.message-box').classList.add('error')
    }
    clearValidationError() {
        this.validation = {
            isValid: true,
            message: null
        }
        const text = this.getAttribute('message') || '';
        this._shadowRoot.querySelector('.message-box').innerHTML = text;
        this._shadowRoot.querySelector('.message-box').classList.remove('error')
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
    window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
