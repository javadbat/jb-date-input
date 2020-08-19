/* eslint-disable no-redeclare */
import HTML from './JBDateInput.html';
import CSS from './JBDateInput.scss';
import '../../../JBCalendar';
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
    get showCalendar() {
        return this._showCalendar;
    }
    set showCalendar(value) {
        this._showCalendar = value;
        if (value == true) {
            this._shadowRoot.querySelector('.calendar-wrapper').classList.add('--show');
            this._shadowRoot.querySelector('.calendar-trigger').classList.add('--active');
        } else {
            this._shadowRoot.querySelector('.calendar-wrapper').classList.remove('--show');
            this._shadowRoot.querySelector('.calendar-trigger').classList.remove('--active');
        }
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
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
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
            mode: 'open'
        });
        this._html = `<style>${CSS}</style>` + '\n' + HTML
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this.inputElement = this._shadowRoot.querySelector('.input-box input');
        this.calendarButtonElement = this._shadowRoot.querySelector('.calendar-trigger');
        this.calendarElement = this._shadowRoot.querySelector('jb-calendar');
        this.registerEventListener();
    }
    registerEventListener() {
        this.inputElement.addEventListener('blur', this.onInputBlur.bind(this));
        this.inputElement.addEventListener('focus', this.onInputFocus.bind(this));
        this.inputElement.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.inputElement.addEventListener('keyup', this.onInputKeyup.bind(this))
        this.inputElement.addEventListener('keydown', this.onInputKeydown.bind(this));
        this.calendarButtonElement.addEventListener('click', this.onCalendarButtonClicked.bind(this))
        this.calendarElement.addEventListener('select', this.onCalendarSelect.bind(this));
        this.calendarElement.addEventListener('init', this.onCalendarElementinitiated.bind(this));
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
        this._showCalendar = false;
        this.dateRestrictions = {
            min: null,
            max: null
        }
        this.required = false;
        this.callOnInitEvent();
    }
    static get observedAttributes() {
        return ['label', 'value-type', 'message', 'value', 'name', 'format', 'min', 'max', 'required'];
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
            case 'format':
                this.format = value;
                break;
            case 'min':
                this.setMinDate(value);
                break;
            case 'max':
                this.setMaxDate(value);
                break;
            case 'required':
                if (value == "" || value == true || value == "true") {
                    this.required = true;
                } else {
                    this.required = false;
                }
                break;
        }

    }
    setMinDate(dateString) {
        let minDate;
        //create min date base on input value type
        if (this.valueType == "GREGORIAN") {
            const dateValueObj = this.getDateObjectValueBaseOnFormat(dateString, this.format);
            minDate = dayjs(`${dateValueObj.groups.year}-${dateValueObj.groups.month}-${dateValueObj.groups.day}`);
        }
        if (this.valueType == "JALALI") {
            const dateValueObj = this.getDateObjectValueBaseOnFormat(dateString, this.format);
            minDate = dayjs(`${dateValueObj.groups.year}-${dateValueObj.groups.month}-${dateValueObj.groups.day}`, { jalali: true });

        }
        if (this.valueType == "TIME_STAMP") {
            minDate = dayjs(parseInt(dateString));
        }
        this.dateRestrictions.min = minDate;
        if (this.calendarElement.dateRestrictions) {
            this.calendarElement.dateRestrictions.min = minDate;
        }
    }
    setMaxDate(dateString) {
        let maxDate;
        if (this.valueType == "GREGORIAN") {
            const dateValueObj = this.getDateObjectValueBaseOnFormat(dateString, this.format);
            maxDate = dayjs(`${dateValueObj.groups.year}-${dateValueObj.groups.month}-${dateValueObj.groups.day}`)
        }
        if (this.valueType == "JALALI") {
            const dateValueObj = this.getDateObjectValueBaseOnFormat(dateString, this.format);
            maxDate = dayjs(`${dateValueObj.groups.year}-${dateValueObj.groups.month}-${dateValueObj.groups.day}`, { jalali: true })
        }
        if (this.valueType == "TIME_STAMP") {
            maxDate = dayjs(parseInt(dateString));
        }
        this.dateRestrictions.max = maxDate;
        if (this.calendarElement.dateRestrictions) {
            this.calendarElement.dateRestrictions.max = maxDate;
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
        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();
        }
    }
    onInputKeydown(e) {
        if (e.keyCode == 8) {
            const carretPos = e.target.selectionStart;
            this.inputChar(' ', carretPos - 1);
            e.target.setSelectionRange(carretPos - 1, carretPos - 1);
            e.preventDefault();
        }
        if (e.keyCode == 38 || e.keyCode == 40) {
            //up and down button
            const carretPos = e.target.selectionStart;
            if (carretPos < 5) {
                e.keyCode == 38 ? this.addYear(1) : this.addYear(-1);
                e.target.setSelectionRange(0, 4);
            }
            if (carretPos > 4 && carretPos < 8) {
                e.keyCode == 38 ? this.addMonth(1) : this.addMonth(-1);
                e.target.setSelectionRange(5, 7);
            }
            if (carretPos > 7) {
                e.keyCode == 38 ? this.addDay(1) : this.addDay(-1);
                e.target.setSelectionRange(8, 10);
            }
            e.preventDefault();
        }

    }
    addYear(interval) {
        const currentYear = this._valueObj.jalali.year;
        this.setDateValueFromJalali(currentYear + interval, this._valueObj.jalali.month, this._valueObj.jalali.day);
        this.updateinputTextFromValue();
    }
    addMonth(interval) {
        const currentMonth = this._valueObj.jalali.month;
        this.setDateValueFromJalali(this._valueObj.jalali.year, currentMonth + interval, this._valueObj.jalali.day);
        this.updateinputTextFromValue();
    }
    addDay(interval) {
        const currentDay = this._valueObj.jalali.day;
        this.setDateValueFromJalali(this._valueObj.jalali.year, this._valueObj.jalali.month, currentDay + interval);
        this.updateinputTextFromValue();
    }
    getDateValue() {
        //this function convert inputed date to expected format base on valueType
        switch (this.valueType) {
            case 'GREGORIAN':
                var { year, month, day } = this._valueObj.gregorian
                var yearStr = year < 1000 ? (year < 100 ? (year < 10 ? "000" + year : "00" + year) : "0" + year) : year;
                var monthStr = month < 10 ? "0" + month : month;
                var dayStr = day < 10 ? "0" + day : day;
                var value = this.format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                    .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                    .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
                return value;
            case 'JALALI':
                var { year, month, day } = this._valueObj.jalali
                var yearStr = year < 1000 ? (year < 100 ? (year < 10 ? "000" + year : "00" + year) : "0" + year) : year;
                var monthStr = month < 10 ? "0" + month : month;
                var dayStr = day < 10 ? "0" + day : day;
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
                this.setDateValueFromJalaliString(value);
                break;
        }

    }
    setValueObjNull() {
        // mean we reset calendar value and set it to null
        this._valueObj = {
            gregorian: {
                year: null,
                month: null,
                day: null
            },
            jalali: {
                year: null,
                month: null,
                day: null
            },
            timeStamp: null
        }
    }
    getDateObjectValueBaseOnFormat(value, format) {
        const regexString = format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        return res
    }
    setDateValueFromJalaliString(value) {
        // we replace '[Z]','Ž' and replace it again to Z becuse we dont want Z inside [Z] get replaced with time zone and remain constant Z : `Z--[Z]`=>`+3:30--Z`
        const res = this.getDateObjectValueBaseOnFormat(value, this.format)
        if (res) {
            this.setDateValueFromJalali(res.groups.year, res.groups.month, res.groups.day);
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            } else {
                this.setValueObjNull()
            }
        }
    }
    checkJalaliDateValidation(jalaliYear, jalaliMonth, jalaliDay) {
        const result = {
            isValid: true,
            error: null
        }
        //this function check date itself validation not user setted validation
        if (jalaliYear > 9000 || jalaliYear < 1000) {
            result.isValid = false;
            result.error = "INVALID_YEAR";
        }
        if (jalaliMonth < 1 || jalaliMonth > 12) {
            result.isValid = false;
            result.error = "INVALID_MONTH";
        }
        if (jalaliMonth < 7) {
            if (jalaliDay > 31) {
                result.isValid = false;
                result.error = "INVALID_DAY";
            }
        }
        if (jalaliMonth > 6 && jalaliMonth < 12) {
            if (jalaliDay > 30) {

                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }
        }
        if (jalaliMonth == 12) {
            if (jalaliDay > 30) {
                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }
        }
        let date = dayjs(`${jalaliYear}-${jalaliMonth}-${jalaliDay}`, { jalali: true });
        let jalaliDate = date.calendar('jalali');
        if (jalaliDate.year() !== jalaliYear) {
            result.isValid = false;
            result.error = "INVALID_DAY_FOR_LEAP";
        }
        return result;

    }
    setDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay) {
        const dateValidationResult = this.checkJalaliDateValidation(jalaliYear, jalaliMonth, jalaliDay);

        if (!dateValidationResult.isValid) {
            if (dateValidationResult.error == "INVALID_DAY_IN_MONTH") {
                if (this._valueObj.jalali.month != jalaliMonth && jalaliDay == 31) {
                    //if we update to 30days month when day set to 31 we substrc day to 30 instead of prevent user from updating month
                    return this.setDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay - 1);
                }
            }
            if (dateValidationResult.error == "INVALID_DAY_FOR_LEAP") {
                //if it was leap year and calender go to next year in 30 esfand
                if (this._valueObj.jalali.year != jalaliYear && jalaliDay == 30) {
                    //if we update year and prev year was kabiseh so new year cant update, we update day to 39 esfand and let user change year smootly without block
                    return this.setDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay - 1);
                }
            }
            return false;
        }
        let date = dayjs(`${jalaliYear}-${jalaliMonth}-${jalaliDay}`, { jalali: true });
        let jalaliDate = date.calendar('jalali');
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
        const res = this.getDateObjectValueBaseOnFormat(value, this.format);
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
                month: jalaliDate.month() + 1,
                year: jalaliDate.year(),
            }
            this._valueObj.timeStamp = date.unix();
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            } else {
                this.setValueObjNull();
            }
        }
    }
    updateinputTextFromValue() {
        var str = this.inputFormat;
        let { year, month, day } = this._valueObj.jalali
        
        
        if (year < 1000 && year !=null) {
            year = "0" + year;
        }
        if (month < 10 && month != null) {
            month = "0" + month;
        }
        if (day < 10 && day != null) {
            day = "0" + day;
        }
        if(year == null){
            year = '    ';
        }
        if(month == null){
            month = '  ';
        }
        if(day == null){
            day = '  ';
        }
        str = str.replace('YYYY', year).replace('MM', month).replace('DD', day);
        this._inputValue = str;
    }
    updateValueObjFromInput(inputString) {
        const res = this.inputRegex.exec(inputString);
        if (res && res.groups) {
            this.setDateValueFromJalali(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
        }
    }
    onInputFocus() {
        this.showCalendar = true;
    }
    onInputBlur(e) {
        const inputText = e.target.value;
        this.updateValueObjFromInput(inputText, this.format);
        this.callOnChange();
        let focusedElement = e.relatedTarget;
        if (focusedElement !== this.calendarElement) {
            this.showCalendar = false;
        }
    }
    callOnChange() {
        const validationResult = this.triggerInputValidation(true);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationResult.isAllValid,
                validationObject: validationResult,
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
    checkDateRestrictions(jalaliYear, jalaliMonth, jalaliDay) {
        //this function check if inputed date is valid date in min and max range
        const result = {
            get isAllValid() { return (this.min.isValid && this.max.isValid) },
            min: {
                isValid: true,
                message: null
            },
            max: {
                isValid: true,
                message: null
            }
        }
        const date = dayjs(`${jalaliYear}-${jalaliMonth}-${jalaliDay}`, { jalali: true });
        if (this.dateRestrictions.min) {
            const minValid = date.isAfter(this.dateRestrictions.min) || date.isSame(this.dateRestrictions.min);
            if (!minValid) {
                result.min = {
                    isValid: false,
                    message: 'تاریخ انتخابی کمتر از بازه مجاز است'
                }
            }
        }
        if (this.dateRestrictions.max) {
            const maxValid = date.isBefore(this.dateRestrictions.max) || date.isSame(this.dateRestrictions.max);
            if (!maxValid) {
                result.max = {
                    isValid: false,
                    message: 'تاریخ انتخابی بیشنر از بازه مجاز است'
                }
            }
        }
        return result;
    }
    checkInputValidation(value) {
        //check validation in date has 3 step: 1-check required 2- check restrictions like min and max 3- check user manual validation list(regex or function)
        const dateObjValue = this.getDateObjectValueBaseOnFormat(value, this.inputFormat);
        const validationResult = {
            validationList: [],
            isAllValid: true,
        }
        //check Min and max DateValidation
        if (!dateObjValue && this.required) {
            validationResult.isAllValid = false;
            validationResult.validationList.push({
                isValid: false,
                message: 'لطفا مقدار تاریخ را کامل وارد کنید',
                validation: "required"
            })
        }
        if (dateObjValue) {
            const restrictionResult = this.checkDateRestrictions(dateObjValue.groups.year, dateObjValue.groups.month, dateObjValue.groups.day);
            validationResult.isAllValid = validationResult.isAllValid && restrictionResult.isAllValid;
            if (!restrictionResult.isAllValid) {
                if (!restrictionResult.min.isValid) {
                    validationResult.validationList.push({
                        isValid: false,
                        message: restrictionResult.min.message,
                        validation: "min"
                    })
                }
                if (!restrictionResult.max.isValid) {
                    validationResult.validationList.push({
                        isValid: false,
                        message: restrictionResult.max.message,
                        validation: "max"
                    })
                }
            }
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
    onCalendarElementinitiated(e) {
        this.calendarElement.dateRestrictions.min = this.dateRestrictions.min;
        this.calendarElement.dateRestrictions.max = this.dateRestrictions.max;
    }
    onCalendarButtonClicked() {
        this.showCalendar = !this.showCalendar;
    }
    onCalendarSelect(e) {
        const { year, month, day } = e.target.value;
        this.setDateValueFromJalali(year, month, day);
        this.updateinputTextFromValue();
        this.showCalendar = false;
        this.callOnChange();
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
    window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
