var HTML = "<div class=\"jb-date-input-web-component\">\r\n    <label><span class=\"label-value\"></span><span>:</span></label>\r\n    <div class=\"input-box\">\r\n        <input class=\"input-box\">\r\n        <div class=\"calendar-trigger\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" id=\"CalendarIcon\" viewBox=\"0 0 44.97 44.46\">\r\n                <defs>\r\n                    <style>.cls-1{fill:#34abc4;}.cls-2{fill:#2e2842;}</style>\r\n                </defs>\r\n                <g>\r\n                    <path id=\"Path_11948\" data-name=\"Path 11948\" class=\"cls-1\" d=\"M41.91,12H3.67C2,12,.61,12.59.61,13.37S2,14.78,3.67,14.78H41.91c1.69,0,3.06-.63,3.06-1.41S43.6,12,41.91,12Z\" transform=\"translate(0 0)\"/>\r\n                    <path id=\"Path_11946\" data-name=\"Path 11946\" class=\"cls-2\" d=\"M33.73,2.22H33V1.36A1.58,1.58,0,0,0,31.33,0a1.61,1.61,0,0,0-1.69,1.36v.86l-5.88,0V1.48A1.46,1.46,0,0,0,22.31,0h-.12a1.59,1.59,0,0,0-1.7,1.48v.74l-6.07,0V1.36A1.6,1.6,0,0,0,12.76,0C11.93,0,11,.61,11,1.36v.89C4.87,2.58,0,7.18,0,12.79v21.1c0,5.83,5.24,10.57,11.68,10.57h21.6C39.73,44.46,45,39.72,45,33.89V12.79C45,7,40.17,2.22,33.73,2.22ZM42,33.89c0,4.33-3.89,7.85-8.68,7.85H11.69C6.9,41.74,3,38.22,3,33.89V12.79C3,8.67,6.53,5.29,11,5v.68C11,6.4,12,7,12.76,7a1.63,1.63,0,0,0,1.67-1.36V4.93h6.06v.85c0,.75,1,1.23,1.71,1.23s1.56-.48,1.56-1.23V4.93h5.88v.72A1.62,1.62,0,0,0,31.33,7,1.59,1.59,0,0,0,33,5.65V4.93h.3c4.79,0,8.68,3.53,8.68,7.86Z\"/>\r\n                </g>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n    <div class=\"message-box\"></div>\r\n</div>";

var css_248z = ".jb-date-input-web-component {\n  width: 100%;\n  margin: 12px 0; }\n  .jb-date-input-web-component label {\n    width: 100%;\n    margin: 4px 0px;\n    display: block;\n    font-size: 0.8em;\n    color: #1f1735; }\n  .jb-date-input-web-component .input-box {\n    width: 100%;\n    box-sizing: border-box;\n    height: 40px;\n    border: solid 1px #f7f6f6;\n    background-color: #f7f6f6;\n    border-bottom: solid 3px #f7f6f6;\n    border-radius: 16px;\n    margin: 4px 0px;\n    display: block;\n    transition: ease 0.3s all;\n    overflow: hidden;\n    display: flex;\n    justify-content: space-between; }\n    .jb-date-input-web-component .input-box:focus-within {\n      border-color: #1e2832; }\n    .jb-date-input-web-component .input-box input {\n      border: none;\n      width: calc(100% - 36px);\n      box-sizing: border-box;\n      height: 100%;\n      background-color: transparent;\n      padding: 2px 12px 0 12px;\n      display: block;\n      font-family: inherit;\n      font-size: 1.1em;\n      color: #1f1735;\n      margin: 0;\n      border-radius: 0;\n      text-align: right;\n      direction: ltr; }\n      .jb-date-input-web-component .input-box input:focus {\n        outline: none; }\n    .jb-date-input-web-component .input-box .calendar-trigger {\n      display: block;\n      height: 28px;\n      width: 28px;\n      margin: 4px 0 4px 8px;\n      cursor: pointer; }\n      .jb-date-input-web-component .input-box .calendar-trigger svg {\n        width: 100%;\n        height: 100%; }\n  .jb-date-input-web-component .message-box {\n    font-size: 0.7em;\n    padding: 2px 8px;\n    color: #929292; }\n    .jb-date-input-web-component .message-box:empty {\n      padding: 0; }\n    .jb-date-input-web-component .message-box.error {\n      color: red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpCRGF0ZUlucHV0LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsY0FBYyxFQUFFO0VBQ2hCO0lBQ0UsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGNBQWMsRUFBRTtFQUNsQjtJQUNFLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsZ0NBQWdDO0lBQ2hDLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsY0FBYztJQUNkLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLDhCQUE4QixFQUFFO0lBQ2hDO01BQ0UscUJBQXFCLEVBQUU7SUFDekI7TUFDRSxZQUFZO01BQ1osd0JBQXdCO01BQ3hCLHNCQUFzQjtNQUN0QixZQUFZO01BQ1osNkJBQTZCO01BQzdCLHdCQUF3QjtNQUN4QixjQUFjO01BQ2Qsb0JBQW9CO01BQ3BCLGdCQUFnQjtNQUNoQixjQUFjO01BQ2QsU0FBUztNQUNULGdCQUFnQjtNQUNoQixpQkFBaUI7TUFDakIsY0FBYyxFQUFFO01BQ2hCO1FBQ0UsYUFBYSxFQUFFO0lBQ25CO01BQ0UsY0FBYztNQUNkLFlBQVk7TUFDWixXQUFXO01BQ1gscUJBQXFCO01BQ3JCLGVBQWUsRUFBRTtNQUNqQjtRQUNFLFdBQVc7UUFDWCxZQUFZLEVBQUU7RUFDcEI7SUFDRSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGNBQWMsRUFBRTtJQUNoQjtNQUNFLFVBQVUsRUFBRTtJQUNkO01BQ0UsVUFBVSxFQUFFIiwiZmlsZSI6IkpCRGF0ZUlucHV0LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuamItZGF0ZS1pbnB1dC13ZWItY29tcG9uZW50IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMTJweCAwOyB9XG4gIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgbGFiZWwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogNHB4IDBweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGNvbG9yOiAjMWYxNzM1OyB9XG4gIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2Y3ZjZmNjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmNmY2O1xuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDNweCAjZjdmNmY2O1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgbWFyZ2luOiA0cHggMHB4O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRyYW5zaXRpb246IGVhc2UgMC4zcyBhbGw7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuICAgIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveDpmb2N1cy13aXRoaW4ge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjMWUyODMyOyB9XG4gICAgLmpiLWRhdGUtaW5wdXQtd2ViLWNvbXBvbmVudCAuaW5wdXQtYm94IGlucHV0IHtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAzNnB4KTtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHBhZGRpbmc6IDJweCAxMnB4IDAgMTJweDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICBmb250LXNpemU6IDEuMWVtO1xuICAgICAgY29sb3I6ICMxZjE3MzU7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICBkaXJlY3Rpb246IGx0cjsgfVxuICAgICAgLmpiLWRhdGUtaW5wdXQtd2ViLWNvbXBvbmVudCAuaW5wdXQtYm94IGlucHV0OmZvY3VzIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxuICAgIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveCAuY2FsZW5kYXItdHJpZ2dlciB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGhlaWdodDogMjhweDtcbiAgICAgIHdpZHRoOiAyOHB4O1xuICAgICAgbWFyZ2luOiA0cHggMCA0cHggOHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XG4gICAgICAuamItZGF0ZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLmNhbGVuZGFyLXRyaWdnZXIgc3ZnIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTsgfVxuICAuamItZGF0ZS1pbnB1dC13ZWItY29tcG9uZW50IC5tZXNzYWdlLWJveCB7XG4gICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGNvbG9yOiAjOTI5MjkyOyB9XG4gICAgLmpiLWRhdGUtaW5wdXQtd2ViLWNvbXBvbmVudCAubWVzc2FnZS1ib3g6ZW1wdHkge1xuICAgICAgcGFkZGluZzogMDsgfVxuICAgIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLm1lc3NhZ2UtYm94LmVycm9yIHtcbiAgICAgIGNvbG9yOiByZWQ7IH1cbiJdfQ== */";

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
        this._html = `<style>${css_248z}</style>` + '\n' + HTML;
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this.inputElement = this._shadowRoot.querySelector('.input-box input');
        this.registerEventListener();
    }
    registerEventListener() {
        this.inputElement.addEventListener('change', this.onInputChange.bind(this));
        this.inputElement.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.inputElement.addEventListener('keyup', this.onInputKeyup.bind(this));
        this.inputElement.addEventListener('keydown', this.onInputKeydown.bind(this));
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
        };
        this.inputRegex = /^(?<year>[\d,\s]{4})\/(?<month>[\d,\s]{2})\/(?<day>[\d,\s]{2})$/g;
        this._inputValue = '    /  /  ';
        this.validation = {
            isValid: null,
            message: null
        };
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
        };
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
        var testRes;
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
        };
        this._shadowRoot.querySelector('.message-box').innerHTML = error;
        this._shadowRoot.querySelector('.message-box').classList.add('error');
    }
    clearValidationError() {
        this.validation = {
            isValid: true,
            message: null
        };
        const text = this.getAttribute('message') || '';
        this._shadowRoot.querySelector('.message-box').innerHTML = text;
        this._shadowRoot.querySelector('.message-box').classList.remove('error');
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
    window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
//# sourceMappingURL=JBDateInput.js.map
