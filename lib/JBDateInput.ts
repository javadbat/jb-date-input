import HTML from './JBDateInput.html';
import CSS from './JBDateInput.scss';
import 'jb-calendar';
// eslint-disable-next-line no-duplicate-imports
import { JBCalendarWebComponent } from 'jb-calendar';

import './inbox-element/inbox-element';
import cloneDeep from 'lodash.clonedeep';

import { InputTypes, ValueTypes, ElementsObject, ValidationResultSummary, DateRestrictions, JBDateInputValueObject, ValidationResultItem, JBDateInputValidationItem, DateValidResult, DateRestrictionsValidResult, ValidationResult } from './Types';
import { DateFactory } from './DateFactory';

export class JBDateInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    internals_?: ElementInternals;
    elements!: ElementsObject;
    #showCalendar = false;
    #inputType: InputTypes = (this.getAttribute("value-type") as InputTypes) || InputTypes.jalali;//JALALI,GREGORIAN;
    valueType: ValueTypes = this.getAttribute("value-type") as ValueTypes || ValueTypes.gregorian;//JALALI,TIME_STAMP,GREGORIAN;
    inputFormat = 'YYYY/MM/DD';
    #inputRegex = /^(?<year>[\d,\s]{4})\/(?<month>[\d,\s]{2})\/(?<day>[\d,\s]{2})$/g;
    #format = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    get format(){
        return this.#format;
    }
    validation: ValidationResultSummary = {
        isValid: null,
        message: '',
        detail: null
    };
    dateRestrictions: DateRestrictions = {
        min: null,
        max: null
    };;
    required = false;
    DefaultValidationErrorMessage = "مقدار وارد شده نا معتبر است"
    #valueObject: JBDateInputValueObject = {
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
    };
    get value(): string {
        const value = this.getDateValue();
        return value;
    }
    set value(value: string) {
        if (this.internals_ && typeof this.internals_.setFormValue == "function") {
            this.internals_.setFormValue(value);
        }
        this.setDateValue(value);
        this.updateinputTextFromValue();
    }
    get inputValue() {
        return this._inputValue;
    }
    get _inputValue() {
        return this.elements!.input.value;
    }
    set _inputValue(value) {
        this.elements!.input.value = value;
    }
    get showCalendar() {
        return this.#showCalendar;
    }
    set showCalendar(value) {
        this.#showCalendar = value;
        if (value == true) {
            this.elements.calendarWrapper.classList.add('--show');
            this.elements.calendarTriggerButton.classList.add('--active');
        } else {
            this.elements.calendarWrapper.classList.remove('--show');
            this.elements.calendarTriggerButton.classList.remove('--active');
        }
    }
    get inputType() {
        return this.#inputType;
    }
    set inputType(value) {
        this.#inputType = value;
        this.onInputTypeChange();
    }
    #validationList: JBDateInputValidationItem[] = [];
    get validationList() {
        return this.#validationList;
    }
    set validationList(value) {
        this.#validationList = value;
        this.triggerInputValidation(false);
    }
    #dateFactory: DateFactory
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser dont support attachInternals
            this.internals_ = this.attachInternals();
        }
        this.#dateFactory = new DateFactory();
        this.initWebComponent();
        this.initProp();
        // js standard input element to more assosicate it with form element
    }
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
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
            delegatesFocus: true
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            input: shadowRoot.querySelector('.input-box input')!,
            calendarTriggerButton: shadowRoot.querySelector('.calendar-trigger')!,
            calendar: shadowRoot.querySelector('jb-calendar')!,
            calendarWrapper: shadowRoot.querySelector('.calendar-wrapper')!,
            labelValue: shadowRoot.querySelector('label .label-value')!,
            label: shadowRoot.querySelector('label')!,
            messageBox: shadowRoot.querySelector('.message-box')!
        };
        this.registerEventListener();
        this.initDeviceSpecifics();
    }
    /**
     * @description activate some features specially on mobile or other specific devices
     * @private
     */
    private initDeviceSpecifics() {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // on mobile
            this.elements.input.setAttribute('readonly', 'true');
        } else {
            // on non-mobile
            this.elements.input.removeAttribute('readonly');
        }
    }
    registerEventListener() {
        this.elements.input.addEventListener('blur', this.onInputBlur.bind(this));
        this.elements.input.addEventListener('focus', this.onInputFocus.bind(this));
        this.elements.input.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.elements.input.addEventListener('keyup', this.onInputKeyup.bind(this));
        this.elements.input.addEventListener('keydown', this.onInputKeydown.bind(this));
        this.elements.calendarTriggerButton.addEventListener('click', this.onCalendarButtonClicked.bind(this));
        this.elements.calendar.addEventListener('select', (e) => this.onCalendarSelect(e as CustomEvent));
        this.elements.calendar.addEventListener('init', this.onCalendarElementinitiated.bind(this));
        this.elements.calendar.addEventListener('blur', this.onCalendarBlur.bind(this));
    }
    initProp() {
        this.setValueObjNull();
        this._inputValue = '    /  /  ';
        this.value = this.getAttribute('value') || '';
        this.validation = {
            isValid: null,
            message: null,
            detail: null
        };
        this.callOnInitEvent();
    }
    static get observedAttributes() {
        return ['label', 'value-type', 'message', 'value', 'name', 'format', 'min', 'max', 'required', 'input-type', 'direction'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // do something when an attribute has changed
        console.log(name, newValue);

        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name: string, value: string) {
        switch (name) {
            case 'label':
                this.elements.labelValue.innerHTML = value;
                if (value == null || value == undefined || value == "") {
                    this.elements.label.classList.add('--hide');
                } else {
                    this.elements.label.classList.remove('--hide');
                }
                break;
            case 'message':
                this.elements.messageBox.innerHTML = value;
                break;
            case 'value':
                this.value = value;
                break;
            case 'name':
                this.elements.input.setAttribute('name', value);
                break;
            case 'value-type':
                if (Object.values(ValueTypes).includes(value as ValueTypes)) {
                    this.valueType = value as ValueTypes;
                }
                break;
            case 'format':
                this.setFormat(value);
                break;
            case 'min':
                this.setMinDate(value);
                break;
            case 'max':
                this.setMaxDate(value);
                break;
            case 'required':
                if (value == "" || value == "true") {
                    this.required = true;
                } else {
                    this.required = false;
                }
                break;
            case 'input-type':
                this.inputType = value as InputTypes;
                break;
            case 'direction':
                this.elements.calendar.setAttribute('direction', value);
                break;
        }

    }
    setFormat(newFormat: string) {
        //override new format base on user config
        this.#format = newFormat;
        //if we have min and max  date setted before format set we set them again so it works
        const minDate = this.getAttribute('min');
        if (minDate) {
            this.setMinDate(minDate);
        }
        const maxDate = this.getAttribute('max');
        if (maxDate) {
            this.setMaxDate(maxDate);
        }
    }
    setMinDate(dateString: string) {
        let minDate: Date | null = null;
        //create min date base on input value type
        if (this.valueType == "TIME_STAMP") {
            minDate = DateFactory.getDateFromTimestamp(parseInt(dateString));
        } else {
            const dateValueObj = this.getDateObjectValueBaseOnFormat(dateString, this.#format);
            //sometimes format set after min value restriction set by user so this object returned null in these scenario we set min after format set again
            if (dateValueObj !== null && dateValueObj !== undefined && dateValueObj.groups !== null && dateValueObj.groups !== undefined) {
                if (this.valueType == ValueTypes.gregorian) {
                    minDate = DateFactory.getDateFromGregorian(parseInt(dateValueObj.groups.year), parseInt(dateValueObj.groups.month), parseInt(dateValueObj.groups.day));
                }
                if (this.valueType == ValueTypes.jalali) {
                    minDate = DateFactory.getDateFromJalali(parseInt(dateValueObj.groups.year), parseInt(dateValueObj.groups.month), parseInt(dateValueObj.groups.day));
                }
            }
        }

        if (minDate) {
            this.dateRestrictions.min = minDate;
            if (this.elements.calendar.dateRestrictions) {
                this.elements.calendar.dateRestrictions.min = minDate;
            }
        } else {
            console.error(`min date ${dateString} is not valid and it will be ignored`, '\n', 'please provide min date in format : ' + this.#format);
        }

    }
    setMaxDate(dateString: string) {
        let maxDate: Date | null = null;
        if (this.valueType == "TIME_STAMP") {
            maxDate = DateFactory.getDateFromTimestamp(parseInt(dateString));
        } else {
            const dateValueObj = this.getDateObjectValueBaseOnFormat(dateString, this.#format);
            //sometimes format set after min value restriction set by user so this object returned null in these scenario we set min after format set again
            if (dateValueObj !== null && dateValueObj !== undefined && dateValueObj.groups !== null && dateValueObj.groups !== undefined) {
                if (this.valueType == ValueTypes.gregorian) {
                    maxDate = DateFactory.getDateFromGregorian(parseInt(dateValueObj.groups.year), parseInt(dateValueObj.groups.month), parseInt(dateValueObj.groups.day));
                }
                if (this.valueType == ValueTypes.jalali) {
                    maxDate = DateFactory.getDateFromJalali(parseInt(dateValueObj.groups.year), parseInt(dateValueObj.groups.month), parseInt(dateValueObj.groups.day));
                }
            }
        }
        if (maxDate) {
            this.dateRestrictions.max = maxDate;
            if (this.elements.calendar.dateRestrictions) {
                this.elements.calendar.dateRestrictions.max = maxDate;
            }
        }else{
            console.error(`max date ${dateString} is not valid and it will be ignored`, '\n', 'please provide max date in format : ' + this.#format);
        }


    }
    inputChar(char: string, pos: number) {
        this.#inputRegex.lastIndex = 0;
        const newValueArr = this._inputValue.split('');
        newValueArr[pos] = char;
        const newValue = newValueArr.join('');
        const res = this.#inputRegex.test(newValue);
        if (res) {
            this._inputValue = newValue;
        }
    }
    onInputKeyPress(e: KeyboardEvent) {
        //TODO: raise keypress event
        let carretPos = (e.target as HTMLInputElement).selectionStart!;
        const inputedChar: string = e.key;
        if (carretPos == 4 || carretPos == 7) {
            // in / pos
            if (inputedChar == '/') {
                (e.target as HTMLInputElement).setSelectionRange(carretPos + 1, carretPos + 1);
            }
            if (!Number.isNaN(inputedChar)) {
                carretPos++;
            }
        }
        if (!Number.isNaN(inputedChar)) {
            // we want user typed char ignored in some scenario
            let isIgnoreChar = false;
            const TypedTumber = parseInt(inputedChar);
            if (carretPos == 5 && TypedTumber > 1) {
                this.inputChar("0", carretPos);
                carretPos++;
            }
            if (carretPos == 6 && TypedTumber > 2 && this.elements.input.value[5] == "1") {
                //prevent month input bigger than 12 for example 19 or 16
                isIgnoreChar = true;
            }
            if (carretPos == 8 && TypedTumber > 3) {
                this.inputChar("0", carretPos);
                carretPos++;
            }
            if (carretPos == 9 && TypedTumber > 1 && this.elements.input.value[8] == "3") {
                //prevent month input bigger than 12 for example 19 or 16
                isIgnoreChar = true;
            }
            if (!isIgnoreChar) {
                this.inputChar(inputedChar, carretPos);
                (e.target as HTMLInputElement).setSelectionRange(carretPos + 1, carretPos + 1);
            }

        }
        e.preventDefault();


    }
    onInputKeyup(e: KeyboardEvent) {
        //update value if it is valid
        const validationResult = this.triggerInputValidation(false);
        if (validationResult.isAllValid) {
            this.updateValueObjFromInput((e.target as HTMLInputElement).value);
        }
        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();
        }
        this.callOnInputKeyup(e);
    }
    callOnInputKeyup(e: KeyboardEvent) {
        const keyUpInitObj = {
            key: e.key,
            keyCode: e.keyCode,
            code: e.code,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            charCode: e.charCode,
            which: e.which,
        };
        const event = new KeyboardEvent('keyup', keyUpInitObj);
        this.dispatchEvent(event);
    }
    onInputKeydown(e: KeyboardEvent) {
        const target = (e.target as HTMLInputElement);
        if (e.keyCode == 8) {
            const carretPos = target.selectionStart!;
            this.inputChar(' ', carretPos - 1);
            target.setSelectionRange(carretPos - 1, carretPos - 1);
            e.preventDefault();
        }
        if (e.keyCode == 38 || e.keyCode == 40) {
            //up and down button
            const carretPos = target.selectionStart!;
            if (carretPos < 5) {
                e.keyCode == 38 ? this.addYear(1) : this.addYear(-1);
                target.setSelectionRange(0, 4);
            }
            if (carretPos > 4 && carretPos < 8) {
                e.keyCode == 38 ? this.addMonth(1) : this.addMonth(-1);
                target.setSelectionRange(5, 7);
            }
            if (carretPos > 7) {
                e.keyCode == 38 ? this.addDay(1) : this.addDay(-1);
                target.setSelectionRange(8, 10);
            }
            e.preventDefault();
        }

    }
    addYear(interval: number) {
        if (this.inputType == InputTypes.jalali) {
            //TODO: change 1300 to something more reasonable
            const currentYear = this.#valueObject.jalali.year ? this.#valueObject.jalali.year : 1300;
            this.setDateValueFromJalali(currentYear + interval, this.#valueObject.jalali.month || 1, this.#valueObject.jalali.day || 1);
        }
        if (this.inputType == InputTypes.gregorian) {
            //TODO: change 2000 to something more reasonable
            const currentYear = this.#valueObject.gregorian.year ? this.#valueObject.gregorian.year : 2000;
            this.setDateValueFromGregorian(currentYear + interval, this.#valueObject.gregorian.month || 1, this.#valueObject.gregorian.day || 1);
        }
        this.updateinputTextFromValue();
    }
    addMonth(interval: number) {
        if (this.inputType == InputTypes.jalali) {
            const currentMonth = this.#valueObject.jalali.month ? this.#valueObject.jalali.month : 0;
            //TODO: change 1300 to something more reasonable
            this.setDateValueFromJalali(this.#valueObject.jalali.year || 1300, currentMonth + interval, this.#valueObject.jalali.day || 1);
        }
        if (this.inputType == InputTypes.gregorian) {
            const currentMonth = this.#valueObject.gregorian.month ? this.#valueObject.gregorian.month : 0;
            //TODO: change 2000 to something more reasonable
            this.setDateValueFromGregorian(this.#valueObject.gregorian.year || 2000, currentMonth + interval, this.#valueObject.gregorian.day || 1);
        }
        this.updateinputTextFromValue();
    }
    addDay(interval: number) {
        if (this.inputType == InputTypes.jalali) {
            const currentDay = this.#valueObject.jalali.day ? this.#valueObject.jalali.day : 0;
            this.setDateValueFromJalali(this.#valueObject.jalali.year || 1300, this.#valueObject.jalali.month || 1, currentDay + interval);
        }
        if (this.inputType == InputTypes.gregorian) {
            const currentDay = this.#valueObject.gregorian.day ? this.#valueObject.gregorian.day : 0;
            this.setDateValueFromGregorian(this.#valueObject.gregorian.year || 2000, this.#valueObject.gregorian.month || 1, currentDay + interval);
        }
        this.updateinputTextFromValue();
    }
    /**
     * will convert current valueObject to expected value string
     * @param {String} type 
     * @return {String} value base on format and date type
     */
    getDateValue(type = this.valueType) {
        return this.getDateValueFromValueObject(this.#valueObject, type);
    }
    getDateValueFromValueObject(valueObject, type = this.valueType) {
        //this function convert inputed date to expected format base on valueType
        const emptyYearString = '0000';
        const emptyMonthString = '00';
        const emptyDayString = '00';
        const getGregorianValue = () => {
            const { year, month, day } = valueObject.gregorian;
            const yearStr = year == null ? emptyYearString : (year < 1000 ? (year < 100 ? (year < 10 ? "000" + year : "00" + year) : "0" + year) : year);
            const monthStr = month == null ? emptyMonthString : month < 10 ? "0" + month : month;
            const dayStr = day == null ? emptyDayString : day < 10 ? "0" + day : day;
            const value = this.#format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
            return value;
        };
        const getJalaliValue = () => {
            const { year, month, day } = valueObject.jalali;
            const yearStr = year == null ? emptyYearString : (year < 1000 ? (year < 100 ? (year < 10 ? "000" + year : "00" + year) : "0" + year) : year);
            const monthStr = month == null ? emptyMonthString : month < 10 ? "0" + month : month;
            const dayStr = day == null ? emptyDayString : day < 10 ? "0" + day : day;
            const value = this.#format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
            return value;
        };
        if (typeof valueObject == "object") {
            switch (type) {
                case 'GREGORIAN':
                    return getGregorianValue();
                case 'JALALI':
                    return getJalaliValue();
                case 'TIME_STAMP':
                    return valueObject.timeStamp;
            }
        } else {
            //when date is not completely valid
            return "";
        }

    }
    setDateValue(value: string) {
        //when user change value this function called and update inner value object base on user value
        switch (this.valueType) {
            case "GREGORIAN":
                this.setDateValueFromGregorianString(value);
                break;
            case "TIME_STAMP":
                this.setDateValueFromTimeStamp(value);
                break;
            case "JALALI":
                this.setDateValueFromJalaliString(value);
                break;
        }

    }
    #emptyValueObject: JBDateInputValueObject = {
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
    setValueObjNull() {
        // mean we reset calendar value and set it to null
        this.#valueObject = cloneDeep(this.#emptyValueObject);
    }
    getDateObjectValueBaseOnFormat(value: string, format: string) {
        const regexString = format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        return res;
    }
    setDateValueFromJalaliString(value: string) {
        // we replace '[Z]','Ž' and replace it again to Z becuse we dont want Z inside [Z] get replaced with time zone and remain constant Z : `Z--[Z]`=>`+3:30--Z`
        const res = this.getDateObjectValueBaseOnFormat(value, this.#format);
        if (res && res.groups) {
            this.setDateValueFromJalali(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            } else {
                this.setValueObjNull();
            }
        }
    }
    checkJalaliDateValidation(jalaliYear: number, jalaliMonth: number, jalaliDay: number) {
        //check if jalali date is valid
        const result: DateValidResult = {
            isValid: true,
            error: null
        };
        //this function check date itself validation not user setted validation
        if (isNaN(jalaliYear)) {
            result.isValid = false;
            result.error = "INVALID_YEAR";
        }
        if (isNaN(jalaliMonth)) {
            result.isValid = false;
            result.error = "INVALID_MONTH";
        }
        if (isNaN(jalaliDay)) {
            result.isValid = false;
            result.error = "INVALID_DAY";
        }
        if (jalaliMonth < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_MONTH_NUMBER";
        }
        if (jalaliDay < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_DAY_NUMBER";
        }
        if (jalaliMonth > 12) {
            result.isValid = false;
            result.error = "INVALID_MAX_MONTH_NUMBER";
        }
        if (jalaliDay > 31) {
            result.isValid = false;
            result.error = "INVALID_MAX_DAY_NUMBER";
        }
        if (jalaliYear < 1000) {
            result.isValid = false;
            result.error = "INVALID_MIN_YEAR_NUMBER";
        }
        if (jalaliYear > 9999) {
            result.isValid = false;
            result.error = "INVALID_MAX_YEAR_NUMBER";
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
        if (result.isValid && jalaliMonth == 12) {
            //if everything was ok then we check for leap year
            const date = DateFactory.getDayjsFromJalali(jalaliYear, jalaliMonth, jalaliDay);
            const jalaliDate = date.calendar('jalali');
            if (jalaliDate.year() !== jalaliYear) {
                result.isValid = false;
                result.error = "INVALID_DAY_FOR_LEAP";
            }
        }

        return result;

    }
    checkGregorianDateValidation(gregorianYear: number, gregorianMonth: number, gregorianDay: number) {
        const result: DateValidResult = {
            isValid: true,
            error: null
        };
        //this function check date itself validation not user setted validation
        if (isNaN(gregorianYear)) {
            result.isValid = false;
            result.error = "INVALID_YEAR";
        }
        if (isNaN(gregorianMonth)) {
            result.isValid = false;
            result.error = "INVALID_MONTH";
        }
        if (isNaN(gregorianDay)) {
            result.isValid = false;
            result.error = "INVALID_DAY";
        }
        if (gregorianMonth < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_MONTH_NUMBER";
        }
        if (gregorianDay < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_DAY_NUMBER";
        }
        if (gregorianMonth > 12) {
            result.isValid = false;
            result.error = "INVALID_MAX_MONTH_NUMBER";
        }
        if (gregorianDay > 31) {
            result.isValid = false;
            result.error = "INVALID_MAX_DAY_NUMBER";
        }
        if (gregorianYear < 1000) {
            result.isValid = false;
            result.error = "INVALID_MIN_YEAR_NUMBER";
        }
        if (gregorianYear > 9999) {
            result.isValid = false;
            result.error = "INVALID_MAX_YEAR_NUMBER";
        }

        if ([2, 4, 6, 9, 11].includes(gregorianDay)) {
            //month has less than 31 day
            if (gregorianDay > 30) {

                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }
        }
        if (gregorianMonth == 2 && gregorianDay > 28) {
            if (gregorianDay == 29) {
                const date = DateFactory.getDayjsFromGregorian(gregorianYear, gregorianMonth, gregorianDay);
                if (!date.isLeapYear()) {
                    result.isValid = false;
                    result.error = "INVALID_DAY_FOR_LEAP";
                }
            } else {
                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }

        }

        return result;

    }
    getDateValueFromJalali(jalaliYear: number, jalaliMonth: number, jalaliDay: number): JBDateInputValueObject {
        const valueObject = cloneDeep(this.#emptyValueObject);
        const dateValidationResult = this.checkJalaliDateValidation(jalaliYear, jalaliMonth, jalaliDay);
        if (!dateValidationResult.isValid) {
            if (dateValidationResult.error == "INVALID_MIN_DAY_NUMBER") {
                return this.getDateValueFromJalali(jalaliYear, jalaliMonth, 1);
            }
            if (dateValidationResult.error == "INVALID_MIN_MONTH_NUMBER") {
                return this.getDateValueFromJalali(jalaliYear, 1, jalaliDay);
            }
            if (dateValidationResult.error == "INVALID_MIN_YEAR_NUMBER") {
                return this.getDateValueFromJalali(1300, jalaliMonth, jalaliDay);
            }
            if (dateValidationResult.error == "INVALID_MAX_DAY_NUMBER") {
                return this.getDateValueFromJalali(jalaliYear, jalaliMonth, 31);
            }
            if (dateValidationResult.error == "INVALID_MAX_MONTH_NUMBER") {
                return this.getDateValueFromJalali(jalaliYear, 12, jalaliDay);
            }
            if (dateValidationResult.error == "INVALID_MAX_YEAR_NUMBER") {
                return this.getDateValueFromJalali(9999, jalaliMonth, jalaliDay);
            }
            if (dateValidationResult.error == "INVALID_DAY_IN_MONTH") {
                if (this.#valueObject.jalali.month != jalaliMonth && jalaliDay == 31) {
                    //if we update to 30days month when day set to 31 we substrc day to 30 instead of prevent user from updating month
                    return this.getDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay - 1);
                }
            }
            if (dateValidationResult.error == "INVALID_DAY_FOR_LEAP") {
                //if it was leap year and calender go to next year in 30 esfand
                if (this.#valueObject.jalali.year != jalaliYear && jalaliDay == 30) {
                    //if we update year and prev year was kabiseh so new year cant update, we update day to 39 esfand and let user change year smootly without block
                    return this.getDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay - 1);
                }
            }
            return cloneDeep(this.#emptyValueObject);
        }
        const date = DateFactory.getDayjsFromJalali(jalaliYear, jalaliMonth, jalaliDay);
        const jalaliDate = date.calendar('jalali');
        valueObject.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
        };
        valueObject.jalali = {
            year: jalaliDate.year(),
            month: jalaliDate.month() + 1,
            day: jalaliDate.date()
        };
        valueObject.timeStamp = date.unix();
        return valueObject;
    }
    private updateCalendarView() {
        //update jb-calendr view base on current data
        if (this.#inputType == InputTypes.jalali) {
            if (this.#valueObject.jalali.year) {
                this.elements.calendar.data.selectedYear = this.#valueObject.jalali.year;
            }
            if (this.#valueObject.jalali.month) {
                this.elements.calendar.data.selectedMonth = this.#valueObject.jalali.month;
            }
        }
        if (this.#inputType == InputTypes.gregorian) {
            if (this.#valueObject.gregorian.year) {
                this.elements.calendar.data.selectedYear = this.#valueObject.gregorian.year;
            }
            if (this.#valueObject.gregorian.month) {
                this.elements.calendar.data.selectedMonth = this.#valueObject.gregorian.month;
            }
        }
    }
    setDateValueFromJalali(jalaliYear: number, jalaliMonth: number, jalaliDay: number) {
        const valueObj: JBDateInputValueObject = this.getDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay);
        this.#valueObject = valueObj;
        this.updateCalendarView();

    }
    setDateValueFromTimeStamp(value: string) {
        const timeStamp = parseInt(value);
        const date = DateFactory.getDayjsFromTimestamp(timeStamp);
        const jalaliDate = date.calendar('jalali');
        this.#valueObject.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
        };
        this.#valueObject.jalali = {
            year: jalaliDate.year(),
            month: jalaliDate.month() + 1,
            day: jalaliDate.date()
        };
        this.#valueObject.timeStamp = date.unix();
        this.updateCalendarView();
    }
    setDateValueFromGregorianString(value: string) {
        const res = this.getDateObjectValueBaseOnFormat(value, this.#format);
        if (res && res.groups) {
            this.setDateValueFromGregorian(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            } else {
                this.setValueObjNull();
            }
        }
    }
    setDateValueFromGregorian(gregorianYear: number, gregorianMonth: number, gregorianDay: number) {
        const result: JBDateInputValueObject = this.getDateValueFromGregorian(gregorianYear, gregorianMonth, gregorianDay);
        this.#valueObject = result;
        this.updateCalendarView();
    }
    getDateValueFromGregorian(gregorianYear: number, gregorianMonth: number, gregorianDay: number): JBDateInputValueObject {

        const valueObject: JBDateInputValueObject = cloneDeep(this.#emptyValueObject);
        const dateValidationResult = this.checkGregorianDateValidation(gregorianYear, gregorianMonth, gregorianDay);
        if (!dateValidationResult.isValid) {
            if (dateValidationResult.error == "INVALID_MIN_DAY_NUMBER") {
                return this.getDateValueFromGregorian(gregorianYear, gregorianMonth, 1);
            }
            if (dateValidationResult.error == "INVALID_MIN_MONTH_NUMBER") {
                return this.getDateValueFromGregorian(gregorianYear, 1, gregorianDay);
            }
            if (dateValidationResult.error == "INVALID_MIN_YEAR_NUMBER") {
                return this.getDateValueFromGregorian(1900, gregorianMonth, gregorianDay);
            }
            if (dateValidationResult.error == "INVALID_MAX_DAY_NUMBER") {
                return this.getDateValueFromGregorian(gregorianYear, gregorianMonth, 31);
            }
            if (dateValidationResult.error == "INVALID_MAX_MONTH_NUMBER") {
                return this.getDateValueFromGregorian(gregorianYear, 12, gregorianDay);
            }
            if (dateValidationResult.error == "INVALID_MAX_YEAR_NUMBER") {
                return this.getDateValueFromGregorian(9000, gregorianMonth, gregorianDay);
            }
            if (dateValidationResult.error == "INVALID_DAY_IN_MONTH") {
                if (this.#valueObject.gregorian.month != gregorianMonth && gregorianMonth > 29) {
                    //if we update to 30days month when day set to 31 we substrc day to 30 instead of prevent user from updating month
                    return this.getDateValueFromGregorian(gregorianYear, gregorianMonth, gregorianDay - 1);
                }
            }
            if (dateValidationResult.error == "INVALID_DAY_FOR_LEAP") {
                //if it was leap year and calender go to next year in 30 esfand
                if (this.#valueObject.gregorian.year != gregorianYear && gregorianDay == 29) {
                    //if we update year and prev year was kabiseh so new year cant update, we update day to 39 esfand and let user change year smootly without block
                    return this.getDateValueFromGregorian(gregorianYear, gregorianMonth, gregorianDay - 1);
                }
            }
            return cloneDeep(this.#emptyValueObject);
        }
        const date = DateFactory.getDayjsFromGregorian(gregorianYear, gregorianMonth, gregorianDay);
        const jalaliDate = date.calendar('jalali');
        valueObject.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
        };
        valueObject.jalali = {
            year: jalaliDate.year(),
            month: jalaliDate.month() + 1,
            day: jalaliDate.date()
        };
        valueObject.timeStamp = date.unix();
        return valueObject;
    }
    updateinputTextFromValue() {
        let str = this.inputFormat;

        const { year, month, day } = this.inputType == InputTypes.jalali ? this.#valueObject.jalali : this.#valueObject.gregorian;
        let yearString: string, monthString: string, dayString: string;
        if (year != null && !isNaN(year)) {
            if (year < 1000) {
                yearString = '0' + year;
            } else {
                yearString = year.toString();
            }
        }
        if (month != null && !isNaN(month)) {
            if (month < 10) {
                monthString = '0' + month;
            } else {
                monthString = month.toString();
            }
        }
        if (day != null && !isNaN(day)) {
            if (day < 10) {
                dayString = '0' + day;
            } else {
                dayString = day.toString();
            }
        }
        if (year == null || isNaN(year)) {
            yearString = '    ';
        }
        if (month == null || isNaN(month)) {
            monthString = '  ';
        }
        if (day == null || isNaN(day)) {
            dayString = '  ';
        }
        str = str.replace('YYYY', yearString!).replace('MM', monthString!).replace('DD', dayString!);
        this._inputValue = str;
    }
    getValueObjectFromInputText(inputText: string): JBDateInputValueObject {
        this.#inputRegex.lastIndex = 0;
        const res = this.#inputRegex.exec(inputText);
        if (res && res.groups) {
            if (this.inputType == InputTypes.jalali) {
                return this.getDateValueFromJalali(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
            }
            if (this.inputType == InputTypes.gregorian) {
                return this.getDateValueFromGregorian(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
            }
        }
        const emptyValue: JBDateInputValueObject = cloneDeep(this.#emptyValueObject);
        return emptyValue;
    }
    updateValueObjFromInput(inputString: string) {
        const res = this.#inputRegex.exec(inputString);
        if (res && res.groups) {
            if (this.inputType == InputTypes.jalali) {
                this.setDateValueFromJalali(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
            }
            if (this.inputType == InputTypes.gregorian) {
                this.setDateValueFromGregorian(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
            }
        }
    }
    focus() {
        //public
        this.elements.input.focus();
        this.showCalendar = true;
    }
    handleCarretPosOnInputFocus() {
        const carretPos = this.elements.input.selectionStart;
        if (carretPos) {
            if (this.elements.input.value.slice(0, 4) == "    " && carretPos <= 4) {
                //if year was null we move cursor to first char of year
                this.elements.input.setSelectionRange(0, 0);
                return;
            }
            if (this.elements.input.value.slice(5, 7) == "  " && carretPos > 4 && carretPos <= 7) {
                //if month was null we move cursor to first char of month
                this.elements.input.setSelectionRange(5, 5);
                return;
            }
            if (this.elements.input.value.slice(8, 10) == "  " && carretPos > 7 && carretPos <= 10) {
                //if day was null we move cursor to first char of day
                this.elements.input.setSelectionRange(8, 8);
                return;
            }
        }

    }
    onInputFocus() {
        this.focus();
        document.addEventListener('selectionchange', this.handleCarretPosOnInputFocus.bind(this));
    }
    onInputBlur(e: FocusEvent) {
        document.removeEventListener('selectionchange', this.handleCarretPosOnInputFocus.bind(this));
        const inputText = (e.target as HTMLInputElement).value;
        this.updateValueObjFromInput(inputText);
        this.callOnChange();
        const focusedElement = e.relatedTarget;
        if (focusedElement !== this.elements.calendar) {
            this.showCalendar = false;
        }
    }
    onCalendarBlur(e: FocusEvent) {
        const focusedElement = e.relatedTarget;
        if (focusedElement !== this.elements.input) {
            this.showCalendar = false;
        }
    }
    callOnChange() {
        const validationResult = this.triggerInputValidation(true);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationResult.isAllValid,
                validationObject: validationResult,
                valueObject: { ...this.#valueObject }
            },
        });
        this.dispatchEvent(event);
    }
    triggerInputValidation(showError = true) {
        // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
        //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
        const inputText = this.elements.input.value;

        const validationResult = this.checkInputValidation(inputText);
        const firstFault = validationResult.validationList.find(x => !x.isValid);
        if (showError == true && !validationResult.isAllValid && firstFault) {

            this.showValidationError(firstFault.message ? firstFault.message : this.DefaultValidationErrorMessage);
        } else if (validationResult.isAllValid) {
            this.clearValidationError();
        }
        this.validation = {
            isValid: validationResult.isAllValid,
            message: firstFault ? firstFault.message : null,
            detail: validationResult
        };
        return validationResult;
    }
    /**
     * check if date is in min and max and other user specified valid date range.
     * @param  {Number} year year of date.
     * @param  {Number} month month of date.
     * @param  {Number} day day of date.
     * @param  {String} dateInputType what is the date type of this number jalali or gregorian
     * @return {Object}
     */
    checkDateRestrictions(year: number, month: number, day: number, dateInputType: InputTypes): DateRestrictionsValidResult {
        return DateFactory.checkDateRestrictions(year, month, day, dateInputType, this.dateRestrictions);

    }
    checkInputValidation(value: string) {
        //check validation in date has 3 step: 1-check required 2- check restrictions like min and max 3- check user manual validation list(regex or function)
        const dateObjValue = this.getDateObjectValueBaseOnFormat(value, this.inputFormat);
        const validationResult: ValidationResult = {
            validationList: [],
            isAllValid: true,
        };
        //check Min and max DateValidation
        if (!dateObjValue && this.required) {
            validationResult.isAllValid = false;
            validationResult.validationList.push({
                isValid: false,
                message: 'لطفا مقدار تاریخ را کامل وارد کنید',
                validation: "REQUIRED"
            });
        }
        if (dateObjValue && dateObjValue.groups) {
            const restrictionResult = this.checkDateRestrictions(parseInt(dateObjValue.groups.year), parseInt(dateObjValue.groups.month), parseInt(dateObjValue.groups.day), this.inputType);
            validationResult.isAllValid = validationResult.isAllValid && restrictionResult.isAllValid;
            if (!restrictionResult.isAllValid) {
                if (!restrictionResult.min.isValid) {
                    validationResult.validationList.push({
                        isValid: false,
                        message: restrictionResult.min.message,
                        validation: "MIN"
                    });
                }
                if (!restrictionResult.max.isValid) {
                    validationResult.validationList.push({
                        isValid: false,
                        message: restrictionResult.max.message,
                        validation: "MAX"
                    });
                }
            }
        }
        // check custom validation feeded by developer user
        this.validationList.forEach((validation) => {
            const res = this.checkValidation(value, validation);
            validationResult.validationList.push(res);
            if (!res.isValid) {
                validationResult.isAllValid = false;
            }
        });
        return validationResult;
    }
    checkValidation(text: string, validation: JBDateInputValidationItem): ValidationResultItem {
        //if user validator is anything other that regex or function we will return false
        let testRes = false;
        if (validation.validator instanceof RegExp) {
            testRes = validation.validator.test(text);
            validation.validator.lastIndex = 0;
        }

        if (typeof validation.validator == "function") {
            const valueObject = this.getValueObjectFromInputText(text);
            const valueText = this.getDateValueFromValueObject(valueObject);
            // we cant use this.#valueObj becuase in some scenario its not updated
            testRes = validation.validator(text, valueObject, valueText);
        }

        if (!testRes) {
            return {
                isValid: false,
                message: validation.message,
                validation: validation
            };
        }
        return {
            isValid: true,
            message: '',
            validation: validation
        };
    }
    showValidationError(error: string) {
        this.elements.messageBox.innerHTML = error;
        this.elements.messageBox.classList.add('error');
    }
    clearValidationError() {
        this.validation = {
            isValid: true,
            message: null,
            detail: null
        };
        const text = this.getAttribute('message') || '';
        this.elements.messageBox.innerHTML = text;
        this.elements.messageBox.classList.remove('error');
    }
    onCalendarElementinitiated() {
        this.elements.calendar.dateRestrictions.min = this.dateRestrictions.min;
        this.elements.calendar.dateRestrictions.max = this.dateRestrictions.max;
    }
    onCalendarButtonClicked() {
        this.showCalendar = !this.showCalendar;
    }
    onCalendarSelect(e: CustomEvent) {
        const target = e.target as JBCalendarWebComponent;
        const { year, month, day } = target.value;
        if (year && month && day) {
            if (this.inputType == InputTypes.jalali) {
                this.setDateValueFromJalali(year, month, day);
            } else {
                this.setDateValueFromGregorian(year, month, day);
            }

            this.updateinputTextFromValue();
            this.showCalendar = false;
            this.callOnDateSelect();
            this.callOnChange();
        }

    }
    callOnDateSelect() {
        //when user pick a day in calendar modal
        const event = new CustomEvent('select');
        this.dispatchEvent(event);
    }
    onInputTypeChange() {
        this.elements.calendar.inputType = this.inputType;
        this.updateinputTextFromValue();
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
    window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
