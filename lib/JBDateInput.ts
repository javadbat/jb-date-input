import HTML from './JBDateInput.html';
import CSS from './JBDateInput.scss';
import 'jb-calendar';
// eslint-disable-next-line no-duplicate-imports
import { JBCalendarWebComponent } from 'jb-calendar';

import './inbox-element/inbox-element';
// eslint-disable-next-line no-duplicate-imports
import {JBDDateInputInboxElementWebComponent} from './inbox-element/inbox-element';
//import cloneDeep from 'lodash.clonedeep';

import { InputTypes, ValueTypes, ElementsObject, ValidationResultSummary, DateRestrictions, JBDateInputValueObject, ValidationResultItem, JBDateInputValidationItem, DateValidResult, DateRestrictionsValidResult, ValidationResult } from './Types';
import { DateFactory } from './DateFactory';
import { getEmptyValueObject, handleDayBeforeInput, handleMonthBeforeInput } from './Helpers';
// import { JBCalendarValue } from 'jb-calendar/lib/Types';
import { enToFaDigits, faToEnDigits } from '../../../common/js/PersianHelper';

export {JBDateInputValidationItem,InputTypes as JBDateInputInputTypes,ValueTypes, JBDateInputValueObject,JBDDateInputInboxElementWebComponent};
type JBCalendarValue = {
    day: number | null;
    month: number | null;
    year: number | null;
}
if(HTMLElement== undefined){
    //in case of server render or old browser
    console.error('you cant render web component on a server side');
}
export class JBDateInputWebComponent extends HTMLElement {
    static formAssociated = true;
    internals_?: ElementInternals;
    elements!: ElementsObject;
    #dateFactory: DateFactory = new DateFactory({ inputType: (this.getAttribute("value-type") as InputTypes), valueType: this.getAttribute("value-type") as ValueTypes });
    #showCalendar = false;
    inputFormat = 'YYYY/MM/DD';
    #inputRegex = /^(?<year>[\u06F0-\u06F90-9,\s]{4})\/(?<month>[\u06F0-\u06F90-9,\s]{2})\/(?<day>[\u06F0-\u06F90-9,\s]{2})$/g;
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
    #valueObject: JBDateInputValueObject = getEmptyValueObject();
    get name() { return this.getAttribute('name'); }
    get form() { return this.internals_!.form; }
    get value(): string {
        const value = this.getDateValue();
        return value;
    }
    set value(value: string | Date) {
        this.#setDateValue(value);
        this.updateinputTextFromValue();
    }
    #updateFormAssossicatedValue():void{
        //in html form we need to get date input value in native way this function update and set value of the input so form can get it when needed
        if (this.internals_ && typeof this.internals_.setFormValue == "function") {
            this.internals_.setFormValue(this.value);
        }
    }
    /**
     * @description return date value if value valid and return null if inputed value is not valid
     */
    get valueInDate():Date|null{
        return this.#dateFactory.getDateValueFromValueObject(this.#valueObject);
    }
    get inputValue() {
        return this.#inputValue;
    }
    //standarded input value
    get #sInputValue():string{
        let value = this.#inputValue;
        if(this.#usePersianDigits){
            value = faToEnDigits(value);
        }
        return value;
    }
    get #inputValue() {
        return this.elements!.input.value;
    }
    set #inputValue(value) {
        this.elements!.input.value = value;
    }
    get showCalendar() {
        return this.#showCalendar;
    }

    set showCalendar(value) {
        this.#showCalendar = value;
        if (value == true) {
            this.elements.calendarContainer.classList.add('--show');
            
            this.elements.calendarTriggerButton.classList.add('--active');
        } else {
            this.elements.calendarContainer.classList.remove('--show');
            this.elements.calendarTriggerButton.classList.remove('--active');
        }
    }
   
    get inputType() {
        return this.#dateFactory.inputType;
    }
    set inputType(value) {

        if (Object.values(InputTypes).includes(value as InputTypes)) {
            this.#dateFactory.setInputType(value);
            this.onInputTypeChange();
        } else {
            console.error(`${value} is not a valid input type`);
        }

    }
    get valueType() {
        return this.#dateFactory.valueType;
    }
    set valueType(value: ValueTypes) {
        if (Object.values(ValueTypes).includes(value as ValueTypes)) {
            this.#dateFactory.setValueType(value);
        } else {
            console.error(`${value} is not a valid value type`);
        }
    }
    #validationList: JBDateInputValidationItem[] = [];
    get validationList() {
        return this.#validationList;
    }
    set validationList(value) {
        this.#validationList = value;
        this.triggerInputValidation(false);
    }
    get yearValue(): number | null {
        switch (this.valueType) {
            case ValueTypes.jalali:
                return this.#valueObject.jalali.year;
            case ValueTypes.gregorian:
                return this.#valueObject.gregorian.year;
            case ValueTypes.timestamp:
                return this.#valueObject.gregorian.year;
            default:
                return null;
        }
    }
    get monthValue(): number | null {
        switch (this.valueType) {
            case ValueTypes.jalali:
                return this.#valueObject.jalali.month;
            case ValueTypes.gregorian:
                return this.#valueObject.gregorian.month;
            case ValueTypes.timestamp:
                return this.#valueObject.gregorian.month;
            default:
                return null;
        }
    }
    get dayValue(): number | null {
        switch (this.valueType) {
            case ValueTypes.jalali:
                return this.#valueObject.jalali.day;
            case ValueTypes.gregorian:
                return this.#valueObject.gregorian.day;
            case ValueTypes.timestamp:
                return this.#valueObject.gregorian.day;
            default:
                return null;
        }
    }
    get yearBaseOnInputType(): number | null {
        switch (this.inputType) {
            case InputTypes.jalali:
                return this.#valueObject.jalali.year;
            case InputTypes.gregorian:
                return this.#valueObject.gregorian.year;
            default:
                return null;
        }
    }
    get monthBaseOnInputType(): number | null {
        switch (this.inputType) {
            case InputTypes.jalali:
                return this.#valueObject.jalali.month;
            case InputTypes.gregorian:
                return this.#valueObject.gregorian.month;
            default:
                return null;
        }
    }
    get dayBaseOnInputType(): number | null {
        switch (this.inputType) {
            case InputTypes.jalali:
                return this.#valueObject.jalali.day;
            case InputTypes.gregorian:
                return this.#valueObject.gregorian.day;
            default:
                return null;
        }
    }
    get typedYear(): string {
        const typedYear = this.inputValue.substring(0, 4);
        return typedYear;
    }
    get typedMonth(): string {
        const typedMonth = this.inputValue.substring(5, 7);
        return typedMonth;
    }
    get typedDay(): string {
        const typedDay = this.inputValue.substring(8, 10);
        return typedDay;
    }
    get sTypedYear(): string {
        const typedYear = this.#sInputValue.substring(0, 4);
        return typedYear;
    }
    get sTypedMonth(): string {
        const typedMonth = this.#sInputValue.substring(5, 7);
        return typedMonth;
    }
    get sTypedDay(): string {
        const typedDay = this.#sInputValue.substring(8, 10);
        return typedDay;
    }
    get valueFormat() {
        return this.#dateFactory.valueFormat;
    }
    #usePersianDigits = false;
    get usePersianDigits() {
        return this.#usePersianDigits;
    }
    set usePersianDigits(value) {
        this.#usePersianDigits = value;
        this.updateinputTextFromValue();
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
            calendarContainer: shadowRoot.querySelector('.calendar-container')!,
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
            //TODO: handle back button and prevent back when calendar is open
        } else {
            // on non-mobile
            this.elements.input.removeAttribute('readonly');
        }
    }
    registerEventListener() {
        this.elements.input.addEventListener('blur', this.onInputBlur.bind(this),{passive:true});
        this.elements.input.addEventListener('focus', this.onInputFocus.bind(this),{passive:true});
        this.elements.input.addEventListener('keypress', this.onInputKeyPress.bind(this),{passive:true});
        this.elements.input.addEventListener('keyup', this.onInputKeyup.bind(this),{passive:true});
        this.elements.input.addEventListener('keydown', this.onInputKeydown.bind(this));
        this.elements.input.addEventListener('beforeinput', this.onInputBeforeInput.bind(this));
        this.elements.calendarTriggerButton.addEventListener('focus', this.onCalendarButtonFocused.bind(this));
        this.elements.calendarTriggerButton.addEventListener('blur', this.onCalendarButtonBlur.bind(this));
        this.elements.calendarTriggerButton.addEventListener('click', this.onCalendarButtonClick.bind(this));
        this.elements.calendar.addEventListener('select', (e) => this.onCalendarSelect(e as CustomEvent));
        this.elements.calendar.addEventListener('init', this.onCalendarElementinitiated.bind(this));
        this.elements.calendar.addEventListener('blur', this.onCalendarBlur.bind(this),{passive:true});
        this.elements.calendarContainer.addEventListener('click', this.onCalendarContainerClicked.bind(this),{passive:true});
        this.elements.calendarContainer.addEventListener('mouseenter',this.#fixCalendarContainerPos);
        this.elements.calendarContainer.addEventListener('mouseleave',this.#resetCalendarContainerPos);
    }
    initProp() {
        this.setValueObjNull();
        this.#inputValue = '    /  /  ';
        this.value = this.getAttribute('value') || '';
        this.validation = {
            isValid: null,
            message: null,
            detail: null
        };
        this.callOnInitEvent();
    }
    static get observedAttributes() {
        return ['label', 'value-type', 'message', 'value', 'name', 'format', 'min', 'max', 'required', 'input-type', 'direction', 'use-persian-number'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // do something when an attribute has changed
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
                this.valueType = value as ValueTypes;
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
                if (value === "" || value == "true") {
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
            case 'use-persian-number':
                if(value == 'true' || value == ''){
                    this.usePersianDigits = true;
                    this.elements.calendar.usePersianNumber = true;
                }
                if(value == 'false' || value == null){
                    this.usePersianDigits = false;
                    this.elements.calendar.usePersianNumber = false;
                }
                break;
        }

    }
    setFormat(newFormat: string) {
        //override new format base on user config
        this.#dateFactory.valueFormat = newFormat;
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
        minDate = this.#dateFactory.getDateFromValueDateString(dateString);
        if (minDate) {
            this.dateRestrictions.min = minDate;
            if (this.elements.calendar.dateRestrictions) {
                this.elements.calendar.dateRestrictions.min = minDate;
            }
        } else {
            console.error(`min date ${dateString} is not valid and it will be ignored`, '\n', 'please provide min date in format : ' + this.#dateFactory.valueFormat);
        }

    }
    setMaxDate(dateString: string) {
        let maxDate: Date | null = null;
        //create max date base on input value type
        maxDate = this.#dateFactory.getDateFromValueDateString(dateString);
        if (maxDate) {
            this.dateRestrictions.max = maxDate;
            if (this.elements.calendar.dateRestrictions) {
                this.elements.calendar.dateRestrictions.max = maxDate;
            }
        } else {
            console.error(`max date ${dateString} is not valid and it will be ignored`, '\n', 'please provide max date in format : ' + this.#dateFactory.valueFormat);
        }


    }
    inputChar(char: string, pos: number) {
        if(pos==4 || pos==7){
            char = '/';
        }
        if(pos>9 || pos<0){
            return;
        }
        this.#inputRegex.lastIndex = 0;
        const newValueArr = this.#inputValue.split('');
        if(this.#usePersianDigits){
            char = enToFaDigits(char);
        }
        newValueArr[pos] = char;
        const newValue = newValueArr.join('');
        //due ro performance issue i remove validation check on evry char input
        // const isValid = this.#inputRegex.test(newValue);
        // if (isValid) {
        this.#inputValue = newValue;
        //}
    }
    isValidChar(char: string) {
        //allow 0-9 ۰-۹ and / char only
        return /[\u06F0-\u06F90-9/]/g.test(char);
    }
    standardString(dateString: string) {
        //TODO: convert en to persian or persian to en base on user config
        const sNumString = faToEnDigits(dateString);
        //convert dsd137/06/31rer to 1373/06/31
        const sString = sNumString.replace(/[^\u06F0-\u06F90-9/]/g, '');
        return sString;
    }
    onInputBeforeInput(e: InputEvent) {
        //TODO: handel range selection
        const inputSelecteionStart = (e.target as HTMLInputElement).selectionStart!;
        const baseCarretPos = inputSelecteionStart;
        const inputedString: string | null = e.data;
        if (inputedString) {
            // make string something like 1373/06/31 from dsd۱۳۷۳/06/31rer
            const standardString = this.standardString(inputedString);
            standardString.split('').forEach((inputedChar, i) => {
                let carretPos = baseCarretPos + i;
                if (!this.isValidChar(inputedChar)) {
                    e.preventDefault();
                    return;
                }
                if (carretPos == 4 || carretPos == 7) {
                    // in / pos
                    if (inputedChar == '/') {
                        (e.target as HTMLInputElement).setSelectionRange(carretPos + 1, carretPos + 1);
                    }
                    //push carrot if it behind / char
                    carretPos++;
                }
                // we want user typed char ignored in some scenario
                let isIgnoreChar = false;
                if(inputedChar == '/'){
                    return;
                }
                const typedNumber = parseInt(inputedChar);
                if (carretPos == 5 && typedNumber > 1) {
                    this.inputChar("0", carretPos);
                    carretPos++;
                }
                const monthRes = handleMonthBeforeInput.call(this, typedNumber, carretPos);
                carretPos = monthRes.carretPos;
                const dayRes = handleDayBeforeInput.call(this, typedNumber, carretPos);
                carretPos = dayRes.carretPos;
                isIgnoreChar = isIgnoreChar || dayRes.isIgnoreChar || monthRes.isIgnoreChar;
                if (!isIgnoreChar) {
                    this.inputChar(inputedChar, carretPos);
                    (e.target as HTMLInputElement).setSelectionRange(carretPos + 1, carretPos + 1);
                }

            });
            e.preventDefault();
        }
        if (e.inputType == 'deleteContentBackward' || e.inputType == 'deleteContentForward' || e.inputType == 'delete' || e.inputType == 'deleteByCut' || e.inputType == 'deleteByDrag') {
            const inputSelectionEnd = (e.target as HTMLInputElement).selectionEnd!;
            let d= 0;
            if(e.inputType == 'deleteContentBackward'){
                d = -1;
            }
            for(let i=inputSelecteionStart; i<=inputSelectionEnd; i++){
                this.inputChar(' ', i+d);
            }
            this.elements.input.setSelectionRange(inputSelecteionStart +d, inputSelecteionStart +d);
            e.preventDefault();
        }
    }
    onInputKeyPress(e: KeyboardEvent) {
        const eventInitDic: KeyboardEventInit = {
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            composed: e.composed,
            key: e.key,
            code: e.code,
            location: e.location,
            repeat: e.repeat,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
            detail: e.detail,
            isComposing: e.isComposing,
            keyCode: e.keyCode,
            charCode: e.charCode,
            which: e.which,
        };
        const keyPressEvent = new KeyboardEvent('keypress', eventInitDic);
        this.dispatchEvent(keyPressEvent);
    }
    onInputKeyup(e: KeyboardEvent) {
        //update value if it is valid
        const validationResult = this.triggerInputValidation(false);
        if (validationResult.isAllValid) {
            this.updateValueObjFromInput(this.#sInputValue);
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
        const currentYear = this.yearValue ? this.yearValue : this.#dateFactory.yearOnEmptyBaseOnValueType;
        const currentMonth = this.monthValue || 1;
        const currentDay = this.dayValue || 1;
        this.setDateValueFromNumbers(currentYear + interval, currentMonth, currentDay);
        this.updateinputTextFromValue();
    }
    addMonth(interval: number) {
        const currentYear = this.yearValue ? this.yearValue : this.#dateFactory.yearOnEmptyBaseOnValueType;
        const currentMonth = this.monthValue || 1;
        const currentDay = this.dayValue || 1;
        this.setDateValueFromNumbers(currentYear, currentMonth + interval, currentDay);
        this.updateinputTextFromValue();
    }
    addDay(interval: number) {
        const currentYear = this.yearValue ? this.yearValue : this.#dateFactory.yearOnEmptyBaseOnValueType;
        const currentMonth = this.monthValue || 1;
        const currentDay = this.dayValue || 1;
        this.setDateValueFromNumbers(currentYear, currentMonth, currentDay + interval);
        this.updateinputTextFromValue();
    }
    /**
     * will convert current valueObject to expected value string
     * @param {ValueTypes} type 
     * @return {String} value base on format and date type
     */
    getDateValue(type: ValueTypes = this.valueType): string {
        return this.#dateFactory.getDateValueStringFromValueObject(this.#valueObject, type);
    }
    /**
     * when user change value this function called and update inner value object base on user value
     */
    #setDateValue(value: string | Date) {
        if(typeof value == "string"){
            switch (this.#dateFactory.valueType) {
                case ValueTypes.gregorian:
                case ValueTypes.jalali:
                    this.#setDateValueFromString(value);
                    break;
                case ValueTypes.timestamp:
                    this.#setDateValueFromTimeStamp(value);
                    break;
            }
        }else if(value instanceof Date){
            this.#setDateValueFromDate(value);
        }
        this.#updateFormAssossicatedValue();
    }
    setValueObjNull() {
        // mean we reset calendar value and set it to null
        this.#valueObject = getEmptyValueObject();
    }
    private updateCalendarView() {
        //update jb-calendr view base on current data
        const value: JBCalendarValue = {
            year: this.#dateFactory.getCalendarYear(this.#valueObject),
            month: this.#dateFactory.getCalendarMonth(this.#valueObject),
            day: this.#dateFactory.getCalendarDay(this.#valueObject)
        };
        if (value.year && value.month && value.day) {
            //if we have all data we update calendar value
            this.elements.calendar.value = value;
        } else if (value.year && value.month) {
            //if we dont have all data we just set view year and month
            this.elements.calendar.data.selectedYear = value.year;
            this.elements.calendar.data.selectedMonth = value.month;
        }
    }
    /**
     * @description set date value from javascript Date
     */
    #setDateValueFromDate(value:Date){
        const valueObject = this.#dateFactory.getDateObjectValueFromDateValue(value);
        this.#valueObject = valueObject;
        this.updateCalendarView();
    }
    /**
     * @description set date value from timestamp base on valueType
     */
    #setDateValueFromTimeStamp(value: string) {
        const timeStamp = parseInt(value);
        this.#valueObject = this.#dateFactory.getDateValueObjectFromTimeStamp(timeStamp);
        this.updateCalendarView();
    }
    /**
     * @description set date value from string base on valueType
     */
    #setDateValueFromString(value: string) {
        const dateInObject = this.#dateFactory.getDateObjectValueBaseOnFormat(value);

        if (dateInObject.year && dateInObject.month && dateInObject.day) {
            this.setDateValueFromNumbers(dateInObject.year, dateInObject.month, dateInObject.day);
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            } else {
                this.setValueObjNull();
            }
        }
    }
    /**
     * set value object base on currently valueType
     * @param {number} year jalali or gregorian year 
     * @param {number} month jalali or gregorian month
     * @param {number} day jalali or gregorian day
     */
    setDateValueFromNumbers(year: number, month: number, day: number) {
        const prevYear = this.yearValue;
        const prevMonth = this.monthValue;
        const result: JBDateInputValueObject = this.#dateFactory.getDateValueObjectBaseOnValueType(year, month, day, prevYear, prevMonth);
        this.#valueObject = result;
        this.updateCalendarView();
    }
    /**
     * set value object base on currently inputType
     * @param {number} year jalali or gregorian year 
     * @param {number} month jalali or gregorian month
     * @param {number} day jalali or gregorian day
     */
    setDateValueFromNumberBaseOnInputType(year: number, month: number, day: number) {
        const prevYear = this.yearBaseOnInputType;
        const prevMonth = this.monthBaseOnInputType;
        const result: JBDateInputValueObject = this.#dateFactory.getDateValueObjectBaseOnInputType(year, month, day, prevYear, prevMonth);
        this.#valueObject = result;
        this.updateCalendarView();
        this.#updateFormAssossicatedValue();
    }
    updateinputTextFromValue() {
        let str = this.inputFormat;
        const { year, month, day } = this.inputType == InputTypes.jalali ? this.#valueObject.jalali : this.#valueObject.gregorian;
        let yearString = '    ', monthString='  ', dayString='  ';
        if (year != null && !isNaN(year)) {
            if (year < 10) {
                yearString = '000' + year;
            } else if(year < 100){
                yearString = '00' + year;
            } else if(year<1000){
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
        //convert to fa char if needed
        if(this.#usePersianDigits){
            yearString = enToFaDigits(yearString);
            monthString = enToFaDigits(monthString);
            dayString = enToFaDigits(dayString);
        }
        str = str.replace('YYYY', yearString).replace('MM', monthString).replace('DD', dayString);
        this.#inputValue = str;
    }
    getValueObjectFromInputText(inputText: string): JBDateInputValueObject {
        this.#inputRegex.lastIndex = 0;
        const res = this.#inputRegex.exec(inputText);
        if (res && res.groups) {
            return this.#dateFactory.getDateValueObjectBaseOnInputType(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day), this.#valueObject.jalali.year, this.#valueObject.jalali.month);
        }
        const emptyValue: JBDateInputValueObject = getEmptyValueObject();
        return emptyValue;
    }
    /**
     * called when input text change and we want to update value object base on input text
     * @param {string}inputString 
     */
    updateValueObjFromInput(inputString: string) {
        const res = this.#inputRegex.exec(inputString);
        if (res && res.groups) {
            this.setDateValueFromNumberBaseOnInputType(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
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
            if (this.typedYear == "    " && carretPos <= 4) {
                //if year was null we move cursor to first char of year
                this.elements.input.setSelectionRange(0, 0);
                return;
            }
            if (this.typedMonth == "  " && carretPos > 4 && carretPos <= 7) {
                //if month was null we move cursor to first char of month
                this.elements.input.setSelectionRange(5, 5);
                return;
            }
            if (this.typedDay == "  " && carretPos > 7 && carretPos <= 10) {
                //if day was null we move cursor to first char of day
                this.elements.input.setSelectionRange(8, 8);
                return;
            }
        }

    }
    #lastInputStringValue = '    /  /  ';
    /**
     * check if there is no update from last time then if change we update
     * @param { string }newString newly typed String
     * @return { boolean }
     * @private
     */
    private checkIfInputTextIsChangedFromLastTime(newString: string): boolean {
        if (this.#lastInputStringValue != newString) {
            this.#lastInputStringValue = newString;
            return true;
        }
        return false;
    }
    onInputFocus(e:FocusEvent) {
        this.#lastInputStringValue = this.#sInputValue;
        this.focus();
        document.addEventListener('selectionchange', this.handleCarretPosOnInputFocus.bind(this));
    }
    onInputBlur(e: FocusEvent) {
        document.removeEventListener('selectionchange', this.handleCarretPosOnInputFocus.bind(this));
        const focusedElement = e.relatedTarget;
        if (focusedElement !== this.elements.calendar && focusedElement !== this.elements.calendarTriggerButton) {
            this.showCalendar = false;
        }
        const inputText = this.#sInputValue;
        //check if there is no update from last time then if change we update
        if (this.checkIfInputTextIsChangedFromLastTime(inputText)) {
            this.updateValueObjFromInput(inputText);
            this.callOnChange();
        }

    }
    onCalendarBlur(e: FocusEvent) {
        const focusedElement = e.relatedTarget;
        if (focusedElement !== this.elements.input && focusedElement !== this.elements.calendarTriggerButton) {
            this.showCalendar = false;
        }
    }
    onCalendarContainerClicked(e: MouseEvent) {
        const isCalendarWrapperClicked = e.composedPath().findIndex(x => x == this.elements.calendarWrapper);
        if (isCalendarWrapperClicked == -1) {
            this.showCalendar = false;
            this.elements.input.blur();
        }
    }
    callOnChange() {
        //TODO: compare value with last time value and call onChange only if value changed
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
        const inputText = this.#sInputValue;

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
        const dateObjValue = this.#dateFactory.getDateObjectValueBaseOnFormat(value, this.inputFormat);
        const validationResult: ValidationResult = {
            validationList: [],
            isAllValid: true,
        };
        //check Min and max DateValidation
        if ((dateObjValue.year == null || dateObjValue.month == null || dateObjValue.day == null) && this.required) {
            validationResult.isAllValid = false;
            validationResult.validationList.push({
                isValid: false,
                message: 'لطفا مقدار تاریخ را کامل وارد کنید',
                validation: "REQUIRED"
            });
        }
        if (dateObjValue.year !== null && dateObjValue.month !== null && dateObjValue.day !== null) {
            const restrictionResult = this.checkDateRestrictions(dateObjValue.year, dateObjValue.month, dateObjValue.day, this.inputType);
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
            const valueText = this.#dateFactory.getDateValueStringFromValueObject(valueObject);
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
        this.elements.calendar.defaultCalendarData = {
            gregorian: {
                year: this.#dateFactory.nicheNumbers.calendarYearOnEmpty.gregorian,
                month: this.#dateFactory.nicheNumbers.calendarMonthOnEmpty.gregorian,
            },
            jalali: {
                year: this.#dateFactory.nicheNumbers.calendarYearOnEmpty.jalali,
                month: this.#dateFactory.nicheNumbers.calendarMonthOnEmpty.jalali,
            }
        };
        this.updateCalendarView();
    }
    #isCalendarButtonClickEventIsAfterFocusEvent = false;
    onCalendarButtonFocused(e:FocusEvent) {
        const prevFocused = e.relatedTarget;
        if(this.showCalendar && prevFocused && [this.elements.calendar as EventTarget, this.elements.input as EventTarget].includes(prevFocused)){
            //if calendar was displayed but user click on icon we hide it here
            (prevFocused as HTMLInputElement).focus();
            this.showCalendar = false;
        }else{
            // if user focus on calendar button from outside of calendar area we show calendar
            this.#isCalendarButtonClickEventIsAfterFocusEvent = true;
            this.showCalendar = true;
        }

    }
    onCalendarButtonBlur(e:FocusEvent) {
        if(![this.elements.calendar as EventTarget, this.elements.input as EventTarget].includes(e.relatedTarget!)){
            this.showCalendar = false;
        }
    }
    onCalendarButtonClick(){
        const focusedElement = this.shadowRoot?.activeElement;
        if(focusedElement && !this.#isCalendarButtonClickEventIsAfterFocusEvent && focusedElement == this.elements.calendarTriggerButton){
            //check if this click is event exactly after focus or not if its after focus we just pass but if its not and its a second click we close menu or reopen menu if closed before
            this.showCalendar = !this.showCalendar;
        }
        this.#isCalendarButtonClickEventIsAfterFocusEvent = false;
    }
    onCalendarSelect(e: CustomEvent) {
        const target = e.target as JBCalendarWebComponent;
        const { year, month, day } = target.value;
        if (year && month && day) {
            this.setDateValueFromNumberBaseOnInputType(year, month, day);
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
    /**
     * set opend calendar date when date input value is empty
     * @public
     * @param {number} year which year you want to show in empty state in calendar.
     * @param {number} month which month you want to show in empty state in calendar.
     * @param {InputTypes} dateType default is your configured input-type  but you can set it otherwise if you want to change other type of calendar in case of change in input-type.
     */
    setCalendarDefaultDateView(year: number, month: number, dateType: InputTypes | undefined) {
        if (year && month) {
            this.#dateFactory.setCalendarDefaultDateView(year, month, dateType);
            this.updateCalendarView();
        }
    }
    #fixCalendarContainerPos = ()=> {
        const bcr = this.elements.calendarContainer.getBoundingClientRect();
        const overflowSize = document.body.clientHeight - bcr.bottom;
        if(overflowSize < 0){
            this.elements.calendarContainer.style.transform = `translateY(${overflowSize}px)`;
        }
    }
    #resetCalendarContainerPos = ()=>{
        this.elements.calendarContainer.style.transform = `translateY(${0}px)`;
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
    window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
