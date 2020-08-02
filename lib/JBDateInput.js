/* eslint-disable no-redeclare */
import HTML from './JBDateInput.html';
import CSS from './JBDateInput.scss';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
dayjs.extend(jalaliday);
class JBDateInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    get value() {
        return this.getDateValue();
    }
    set value(value) {
        if (this.internals_) {
            this.internals_.setFormValue(value);
        }
        this.setDateValue(value);
        this.updateinputTextFromValue();
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
        this.inputElement.addEventListener('blur', this.onInputBlur.bind(this));
        this.inputElement.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.inputElement.addEventListener('keyup', this.onInputKeyup.bind(this))
        this.inputElement.addEventListener('keydown', this.onInputKeydown.bind(this))
    }
    initProp() {
        this.validationList = [];
        this.valueType = this.getAttribute("value-type") || "GREGORIAN";//JALALI,TIME_STAMP
        this.setValueObjNull();
        this.inputFormat = 'YYYY/MM/DD';
        this.inputRegex = /^(?<year>[\d,\s]{4})\/(?<month>[\d,\s]{2})\/(?<day>[\d,\s]{2})$/g;
        this.format = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        this._inputValue = '    /  /  ';
        this.value = this.getAttribute('value') || '';
        this.validation = {
            isValid: null,
            message: null
        }
    }
    static get observedAttributes() {
        return ['label', 'value-type', 'message', 'value', 'name'];
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
            case 'value-type':
                this.valueType = value;
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
        if (carretPos == 4 || carretPos == 7) {
            // in / pos
            if (inputedChar == '/') {
                e.target.setSelectionRange(carretPos + 1, carretPos + 1);
            }
            if (!isNaN(inputedChar)) {
                carretPos++;
            }
        }
        if (!isNaN(inputedChar)) {
            if (carretPos == 5 && parseInt(inputedChar) > 1) {
                this.inputChar("0", carretPos);
                carretPos++;
            }
            if (carretPos == 8 && parseInt(inputedChar) > 3) {
                this.inputChar("0", carretPos);
                carretPos++;
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
            this.inputChar(' ', carretPos - 1);
            e.target.setSelectionRange(carretPos - 1, carretPos - 1);
            e.preventDefault();
        }
    }
    getDateValue() {
        //this function convert inputed date to expected format base on valueType
        switch (this.valueType) {
            case 'GREGORIAN':
                var { year, month, day } = this._valueObj.gregorian
                var yearStr = year<1000?( year<100?( year<10?"000"+year:"00"+year):"0"+year):year;
                var monthStr = month<10?"0"+month:month;
                var dayStr = day<10?"0"+day:day;
                var value = this.format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                    .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                    .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
                return value;
            case 'JALALI':
                var { year, month, day } = this._valueObj.jalali
                var yearStr = year<1000?( year<100?( year<10?"000"+year:"00"+year):"0"+year):year;
                var monthStr = month<10?"0"+month:month;
                var dayStr = day<10?"0"+day:day;
                var value = this.format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                    .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                    .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
                return value;
            case 'TIME_STAMP':
                return this._valueObj.timeStamp;
        }
    }
    setDateValue(value) {
        //when user change value this function called and update inner value object base on user value
        switch (this.valueType) {
            case "GREGORIAN":
                this.setDateValueFromgregorian(value);
                break;
            case "TIME_STAMP":
                this.setDateValueFromTimeStamp(value);
                break;
            case "JALALI":
                this.setDateValueFromJalali(value);
                break;

        }

    }
    setValueObjNull(){
        // mean we reset calendar value and set it to null
        this._valueObj={
            gregorian: {
                year: null,
                month: null,
                day: null
            },
            jalali: {
                year: null,
                month: null,
                day:null
            },
            timeStamp: null
        }
    }
    setDateValueFromJalali(value) {
        // we replace '[Z]','Ž' and replace it again to Z becuse we dont want Z inside [Z] get replaced with time zone and remain constant Z : `Z--[Z]`=>`+3:30--Z`
        const regexString = this.format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        if(res){
            const date = dayjs(`${res.groups.year}-${res.groups.month}-${res.groups.day}`, { jalali: true });
            const jalaliDate = date.calendar('jalali');
            this._valueObj.gregorian = {
                year: date.year(),
                month: date.month() + 1,
                day: date.date()
            }
            this._valueObj.jalali = {
                year: jalaliDate.year(),
                month: jalaliDate.month() + 1,
                day: jalaliDate.date()
            }
            this._valueObj.timeStamp = date.unix();
        }else{
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            }else{
                this.setValueObjNull()
            }
        }

    }
    setDateValueFromTimeStamp(value) {
        const timeStamp = parseInt(value)
        const date = dayjs(timeStamp);
        const jalaliDate = date.calendar('jalali');
        this._valueObj.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
        }
        this._valueObj.jalali = {
            year: jalaliDate.year(),
            month: jalaliDate.month() + 1,
            day: jalaliDate.date()
        }
        this._valueObj.timeStamp = date.unix();

    }
    setDateValueFromgregorian(value) {
        // we replace '[Z]','Ž' and replace it again to Z becuse we dont want Z inside [Z] get replaced with time zone and remain constant Z : `Z--[Z]`=>`+3:30--Z`
        const regexString = this.format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        if (res) {
            this._valueObj.gregorian = {
                day: res.groups.day,
                month: res.groups.month,
                year: res.groups.year
            }
            const date = new dayjs(`${res.groups.year}-${res.groups.month}-${res.groups.day}`);
            const jalaliDate = date.calendar('jalali');
            this._valueObj.jalali = {
                day: jalaliDate.date(),
                month: jalaliDate.month(),
                year: jalaliDate.year(),
            }
            this._valueObj.timeStamp = date.unix();
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            }else{
                this.setValueObjNull();
            }
        }
    }
    updateinputTextFromValue() {
        var str = this.inputFormat;
        let { year, month, day } = this._valueObj.jalali
        if (year < 1000) {
            year = "0" + year;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        str = str.replace('YYYY', year).replace('MM', month).replace('DD', day);
        this._inputValue = str;
    }
    updateValueObj(inputString) {
        const res = this.inputRegex.exec(inputString);
        this._valueObj.jalali = {
            day: parseInt(res.groups.day),
            month: parseInt(res.groups.month),
            year: parseInt(res.groups.year)
        }
        const date = dayjs(`${this._valueObj.jalali.year}-${this._valueObj.jalali.month}-${this._valueObj.jalali.day}`, { jalali: true });
        this._valueObj.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date(),
        }
        this._valueObj.timeStamp = date.unix();
    }
    onInputBlur(e) {
        const inputText = e.target.value;
        this.updateValueObj(inputText);
        this.triggerInputValidation(true);
        const validationObject = this.checkInputValidation(inputText);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationObject.isAllValid,
                validationObject: validationObject,
                valueObject: { ...this._valueObj }
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
            testRes = validation.validator(text, this._valueObj);
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
