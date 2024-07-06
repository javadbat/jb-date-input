import HTML from './jb-date-input.html';
import CSS from './jb-date-input.scss';
import 'jb-calendar';
// eslint-disable-next-line no-duplicate-imports
import { JBCalendarWebComponent } from 'jb-calendar';

import './inbox-element/inbox-element';
// eslint-disable-next-line no-duplicate-imports
import {JBDDateInputInboxElementWebComponent} from './inbox-element/inbox-element';
//import cloneDeep from 'lodash.clonedeep';

import { InputTypes, ValueTypes, ElementsObject, DateRestrictions, JBDateInputValueObject, ValueType, InputType, ValidationValue, JBCalendarValue } from './types';
import { DateFactory } from './date-factory';
import { checkMaxValidation, checkMinValidation, getEmptyValueObject, handleDayBeforeInput, handleMonthBeforeInput } from './Helpers1';
import { enToFaDigits, faToEnDigits } from '../../../common/scripts/persian-helper';
import { ValidationHelper } from '../../../common/scripts/validation/validation-helper';
import { ValidationItem, WithValidation } from '../../../common/scripts/validation/validation-helper-types';
import { requiredValidation } from './validations';

export {ValidationItem,InputTypes as JBDateInputInputTypes,ValueTypes, JBDateInputValueObject,JBDDateInputInboxElementWebComponent};

if(HTMLElement== undefined){
  //in case of server render or old browser
  console.error('you cant render web component on a server side');
}
const emptyInputValueString = '    /  /  ';
export class JBDateInputWebComponent extends HTMLElement implements WithValidation<ValidationValue>{
    static formAssociated = true;
    internals_?: ElementInternals;
    elements!: ElementsObject;
    #validation = new ValidationHelper<ValidationValue>(
      this.showValidationError.bind(this),
      this.clearValidationError.bind(this),
      ()=>this.#validationValue,
      (val)=>val.text,
      this.#getInsideValidations.bind(this))
    #dateFactory: DateFactory = new DateFactory({ inputType: (this.getAttribute("value-type") as InputTypes), valueType: this.getAttribute("value-type") as ValueTypes });
    #showCalendar = false;
    inputFormat = 'YYYY/MM/DD';
    #inputRegex = /^(?<year>[\u06F0-\u06F90-9,\s]{4})\/(?<month>[\u06F0-\u06F90-9,\s]{2})\/(?<day>[\u06F0-\u06F90-9,\s]{2})$/g;
    get validation(){
      return this.#validation;
    }
    dateRestrictions: DateRestrictions = {
      min: null,
      max: null
    };
    required = false;
    DefaultValidationErrorMessage = "مقدار وارد شده نا معتبر است"
    #valueObject: JBDateInputValueObject = getEmptyValueObject();
    get name() { return this.getAttribute('name'); }
    get form() { return this.internals_!.form; }
    get value(): string {
      const value = this.getDateValue();
      return value;
    }
    set value(value: string | Date){
      this.#setDateValue(value);
      this.#updateInputTextFromValue();
    }
    get #validationValue():ValidationValue{
      return {
        inputObject:this.#dateFactory.getDateObjectValueBaseOnFormat(this.#sInputValue, this.inputFormat),
        text:this.#sInputValue,
        valueText:this.value,
        valueObject:this.#valueObject
      };
    }

    setMonthList(inputType:InputType, monthName:string[]){
      this.elements.calendar.setMonthList(inputType,monthName);
    }
    #updateFormAssociatedValue():void{
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
    #placeholder:string|null = null;
    get placeholder(){
      return this.#placeholder;
    }
    set placeholder(value:string | null){
      this.#placeholder = value;
      if(value !== null){
        this.elements.input.placeholder = value;
      }else{
        this.elements.input.placeholder= "";
      }
      this.#updateInputTextFromValue();
    }
    //standardized input value
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
    set #inputValue(value:string) {
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
   
    get inputType():InputType{
      return this.#dateFactory.inputType;
    }
    set inputType(value:InputType) {

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
    set valueType(value: ValueType) {
      if (Object.values(ValueTypes).includes(value as ValueTypes)) {
        this.#dateFactory.setValueType(value);
      } else {
        console.error(`${value} is not a valid value type`);
      }
    }
    get yearValue(): number | null {
      switch (this.valueType) {
        case "JALALI":
          return this.#valueObject.jalali.year;
        case "GREGORIAN":
          return this.#valueObject.gregorian.year;
        case "TIME_STAMP":
          return this.#valueObject.gregorian.year;
        default:
          return null;
      }
    }
    get yearDisplayValue(): number | null {
      switch (this.inputType) {
        case "JALALI":
          return this.#valueObject.jalali.year;
        case "GREGORIAN":
          return this.#valueObject.gregorian.year;
        default:
          return null;
      }
    }
    get monthValue(): number | null {
      switch (this.valueType) {
        case "JALALI":
          return this.#valueObject.jalali.month;
        case "GREGORIAN":
          return this.#valueObject.gregorian.month;
        case "TIME_STAMP":
          return this.#valueObject.gregorian.month;
        default:
          return null;
      }
    }
    get monthDisplayValue(): number | null {
      switch (this.inputType) {
        case "JALALI":
          return this.#valueObject.jalali.month;
        case "GREGORIAN":
          return this.#valueObject.gregorian.month;
        default:
          return null;
      }
    }
    get dayValue(): number | null {
      switch (this.valueType) {
        case "JALALI":
          return this.#valueObject.jalali.day;
        case "GREGORIAN":
          return this.#valueObject.gregorian.day;
        case "TIME_STAMP":
          return this.#valueObject.gregorian.day;
        default:
          return null;
      }
    }
    get dayDisplayValue(): number | null {
      switch (this.inputType) {
        case "JALALI":
          return this.#valueObject.jalali.day;
        case "GREGORIAN":
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
      this.#updateInputTextFromValue();
    }
    overflowHandler: "NONE" | "JUMP" = "NONE";
    constructor() {
      super();
      if (typeof this.attachInternals == "function") {
        //some browser dont support attachInternals
        this.internals_ = this.attachInternals();
      }
      this.#initWebComponent();
      this.#initProp();
      // js standard input element to more associate it with form element
    }
    connectedCallback() {
      // standard web component event that called when all of dom is bounded
      this.#callOnLoadEvent();
    }
    #callOnLoadEvent() {
      const event = new CustomEvent('load', { bubbles: true, composed: true });
      this.dispatchEvent(event);
    }
    #callOnInitEvent() {
      const event = new CustomEvent('init', { bubbles: true, composed: true });
      this.dispatchEvent(event);
    }
    #initWebComponent() {
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
      this.#registerEventListener();
      this.#initDeviceSpecifics();
    }
    /**
     * @description activate some features specially on mobile or other specific devices
     */
    #initDeviceSpecifics() {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        // on mobile
        this.elements.input.setAttribute('readonly', 'true');
        //TODO: handle back button and prevent back when calendar is open
      } else {
        // on non-mobile
        this.elements.input.removeAttribute('readonly');
      }
    }
    #registerEventListener() {
      this.elements.input.addEventListener('blur', this.#onInputBlur.bind(this),{passive:true});
      this.elements.input.addEventListener('focus', this.#onInputFocus.bind(this),{passive:true});
      this.elements.input.addEventListener('keypress', this.#onInputKeyPress.bind(this),{passive:true});
      this.elements.input.addEventListener('keyup', this.#onInputKeyup.bind(this),{passive:true});
      this.elements.input.addEventListener('keydown', this.#onInputKeydown.bind(this));
      this.elements.input.addEventListener('beforeinput', this.#onInputBeforeInput.bind(this));
      this.elements.calendarTriggerButton.addEventListener('focus', this.#onCalendarButtonFocused.bind(this));
      this.elements.calendarTriggerButton.addEventListener('blur', this.#onCalendarButtonBlur.bind(this));
      this.elements.calendarTriggerButton.addEventListener('click', this.#onCalendarButtonClick.bind(this));
      this.elements.calendar.addEventListener('select', (e) => this.#onCalendarSelect(e as CustomEvent));
      this.elements.calendar.addEventListener('init', this.#onCalendarElementInitiated.bind(this));
      this.elements.calendar.addEventListener('blur', this.#onCalendarBlur.bind(this),{passive:true});
      this.elements.calendarContainer.addEventListener('click', this.#onCalendarContainerClicked.bind(this),{passive:true});
      this.elements.calendarContainer.addEventListener('mouseenter',this.#fixCalendarContainerPos);
      this.elements.calendarContainer.addEventListener('mouseleave',this.#resetCalendarContainerPos);
    }
    #initProp() {
      this.#setValueObjNull();
      this.#inputValue = emptyInputValueString;
      this.value = this.getAttribute('value') || '';
      // this.validation = {
      //   isValid: null,
      //   message: null,
      //   detail: null
      // };
      this.#callOnInitEvent();
    }
    static get observedAttributes() {
      return ['label', 'value-type', 'message', 'value', 'name', 'format', 'min', 'max', 'required', 'input-type', 'direction', 'use-persian-number','placeholder'];
    }
    #attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      // do something when an attribute has changed
      this.#onAttributeChange(name, newValue);
    }
    #onAttributeChange(name: string, value: string) {
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
          this.#setMinDate(value);
          break;
        case 'max':
          this.#setMaxDate(value);
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
        case 'placeholder':
          this.placeholder = value;
          break;
      }

    }
    setFormat(newFormat: string) {
      //override new format base on user config
      this.#dateFactory.valueFormat = newFormat;
      //if we have min and max  date setted before format set we set them again so it works
      const minDate = this.getAttribute('min');
      if (minDate) {
        this.#setMinDate(minDate);
      }
      const maxDate = this.getAttribute('max');
      if (maxDate) {
        this.#setMaxDate(maxDate);
      }
    }
    setMinDate(minDate: string | Date){
      this.#setMinDate(minDate);
    }
    #setMinDate(dateInput: string | Date) {
      let minDate: Date | null = null;
      //create min date base on input value type
      if(typeof dateInput == "string"){
        minDate = this.#dateFactory.getDateFromValueDateString(dateInput);
      }else{
        minDate = dateInput;
      }
      if (minDate) {
        this.dateRestrictions.min = minDate;
        if (this.elements.calendar.dateRestrictions) {
          this.elements.calendar.dateRestrictions.min = minDate;
        }
      } else {
        console.error(`min date ${dateInput} is not valid and it will be ignored`, '\n', 'please provide min date in format : ' + this.#dateFactory.valueFormat);
      }

    }
    setMaxDate(maxDate: string | Date){
      this.#setMaxDate(maxDate);
    }
    #setMaxDate(dateInput: string | Date) {
      let maxDate: Date | null = null;
      //create max date base on input value type
      if(typeof dateInput == "string"){
        maxDate = this.#dateFactory.getDateFromValueDateString(dateInput);
      }else{
        maxDate = dateInput;
      }
      if (maxDate) {
        this.dateRestrictions.max = maxDate;
        if (this.elements.calendar.dateRestrictions) {
          this.elements.calendar.dateRestrictions.max = maxDate;
        }
      } else {
        console.error(`max date ${dateInput} is not valid and it will be ignored`, '\n', 'please provide max date in format : ' + this.#dateFactory.valueFormat);
      }
    }
    inputChar(char: string, pos: number) {
      this.#inputChar(char,pos);
    }
    #inputChar(char: string, pos: number) {
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
    #isValidChar(char: string) {
      //allow 0-9 ۰-۹ and / char only
      return /[\u06F0-\u06F90-9/]/g.test(char);
    }
    #standardString(dateString: string) {
      //TODO: convert en to persian or persian to en base on user config
      const sNumString = faToEnDigits(dateString);
      //convert dsd137/06/31rer to 1373/06/31
      const sString = sNumString.replace(/[^\u06F0-\u06F90-9/]/g, '');
      return sString;
    }
    #onInputBeforeInput(e: InputEvent) {
      //TODO: handel range selection
      const inputSelectionStart = (e.target as HTMLInputElement).selectionStart!;
      const baseCaretPos = inputSelectionStart;
      const inputtedString: string | null = e.data;
      if (inputtedString) {
        //insert mode
        //check if we are in placeholder mode we update or input text to standard mode
        if(this.placeholder && this.#inputValue === ""){
          this.#inputValue = emptyInputValueString;
        }
        // make string something like 1373/06/31 from dsd۱۳۷۳/06/31rer
        const standardString = this.#standardString(inputtedString);
        standardString.split('').forEach((inputtedChar:string, i:number) => {
          let caretPos = baseCaretPos + i;
          if (!this.#isValidChar(inputtedChar)) {
            e.preventDefault();
            return;
          }
          if (caretPos == 4 || caretPos == 7) {
            // in / pos
            if (inputtedChar == '/') {
              (e.target as HTMLInputElement).setSelectionRange(caretPos + 1, caretPos + 1);
            }
            //push carrot if it behind / char
            caretPos++;
          }
          // we want user typed char ignored in some scenario
          let isIgnoreChar = false;
          if(inputtedChar == '/'){
            return;
          }
          const typedNumber = parseInt(inputtedChar);
          if (caretPos == 5 && typedNumber > 1) {
            //second pos of month
            this.#inputChar("0", caretPos);
            caretPos++;
          }
          const monthRes = handleMonthBeforeInput.call(this, typedNumber, caretPos);
          caretPos = monthRes.caretPos;
          const dayRes = handleDayBeforeInput.call(this, typedNumber, caretPos);
          caretPos = dayRes.caretPos;
          isIgnoreChar = isIgnoreChar || dayRes.isIgnoreChar || monthRes.isIgnoreChar;
          if (!isIgnoreChar) {
            this.#inputChar(inputtedChar, caretPos);
            (e.target as HTMLInputElement).setSelectionRange(caretPos + 1, caretPos + 1);
          }

        });
        e.preventDefault();
      }
      if (e.inputType == 'deleteContentBackward' || e.inputType == 'deleteContentForward' || e.inputType == 'delete' || e.inputType == 'deleteByCut' || e.inputType == 'deleteByDrag') {
        //delete mode
        const inputSelectionEnd = (e.target as HTMLInputElement).selectionEnd!;
        let d= 0;
        if(e.inputType == 'deleteContentBackward'){
          //backspace delete
          d = -1;
        }
        for(let i=inputSelectionStart; i<=inputSelectionEnd; i++){
          this.#inputChar(' ', i+d);
        }
        this.elements.input.setSelectionRange(inputSelectionStart +d, inputSelectionStart +d);
        //show placeholder if input were empty
        if(this.placeholder && this.#inputValue == emptyInputValueString){
          this.#inputValue = "";
        }
        e.preventDefault();
      }
    }
    #onInputKeyPress(e: KeyboardEvent) {
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
    #onInputKeyup(e: KeyboardEvent) {
      //update value if it is valid
      const validationResult = this.validation.checkValidity(false);
      if (validationResult.isAllValid) {
        this.#updateValueObjFromInput(this.#sInputValue);
      }
      this.#callOnInputKeyup(e);
    }
    #callOnInputKeyup(e: KeyboardEvent) {
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
    #onInputKeydown(e: KeyboardEvent) {
      const target = (e.target as HTMLInputElement);
      if (e.keyCode == 38 || e.keyCode == 40) {
        //up and down button
        const caretPos = target.selectionStart!;
        if (caretPos < 5) {
          e.keyCode == 38 ? this.#addYear(1) : this.#addYear(-1);
          target.setSelectionRange(0, 4);
        }
        if (caretPos > 4 && caretPos < 8) {
          e.keyCode == 38 ? this.#addMonth(1) : this.#addMonth(-1);
          target.setSelectionRange(5, 7);
        }
        if (caretPos > 7) {
          e.keyCode == 38 ? this.#addDay(1) : this.#addDay(-1);
          target.setSelectionRange(8, 10);
        }
        e.preventDefault();
      }

    }
    #addYear(interval: number) {
      const currentYear = this.yearDisplayValue ? this.yearDisplayValue : this.#dateFactory.yearOnEmptyBaseOnInputType;
      const currentMonth = this.monthDisplayValue || 1;
      const currentDay = this.dayDisplayValue || 1;
      this.#setDateValueFromNumberBaseOnInputType(currentYear + interval, currentMonth, currentDay);
      this.#updateInputTextFromValue();
    }
    #addMonth(interval: number) {
      const currentYear = this.yearDisplayValue ? this.yearDisplayValue : this.#dateFactory.yearOnEmptyBaseOnInputType;
      const currentMonth = this.monthDisplayValue || 1;
      const currentDay = this.dayDisplayValue || 1;
      this.#setDateValueFromNumberBaseOnInputType(currentYear, currentMonth + interval, currentDay);
      this.#updateInputTextFromValue();
    }
    #addDay(interval: number) {
      const currentYear = this.yearDisplayValue ? this.yearDisplayValue : this.#dateFactory.yearOnEmptyBaseOnInputType;
      const currentMonth = this.monthDisplayValue || 1;
      const currentDay = this.dayDisplayValue || 1;
      this.#setDateValueFromNumberBaseOnInputType(currentYear, currentMonth , currentDay+ interval);
      this.#updateInputTextFromValue();
    }
    /**
     * @description will convert current valueObject to expected value string
     */
    getDateValue(type: ValueType = this.valueType): string {
      return this.#dateFactory.getDateValueStringFromValueObject(this.#valueObject, type);
    }
    /**
     * @description when user change value this function called and update inner value object base on user value
     */
    #setDateValue(value: string | Date) {
      if(typeof value == "string"){
        switch(this.#dateFactory.valueType) {
          case "GREGORIAN":
          case "JALALI":
            this.#setDateValueFromString(value);
            break;
          case "TIME_STAMP":
            this.#setDateValueFromTimeStamp(value);
            break;
        }
      }else if(value instanceof Date){
        this.#setDateValueFromDate(value);
      }
      this.#updateFormAssociatedValue();
    }
    #setValueObjNull() {
      // mean we reset calendar value and set it to null
      this.#valueObject = getEmptyValueObject();
    }
    #updateCalendarView() {
      //update jb-calendar view base on current data
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
      this.#updateCalendarView();
    }
    /**
     * @description set date value from timestamp base on valueType
     */
    #setDateValueFromTimeStamp(value: string) {
      const timeStamp = parseInt(value);
      this.#valueObject = this.#dateFactory.getDateValueObjectFromTimeStamp(timeStamp);
      this.#updateCalendarView();
    }
    /**
     * @description set date value from string base on valueType
     */
    #setDateValueFromString(value: string) {
      const dateInObject = this.#dateFactory.getDateObjectValueBaseOnFormat(value);

      if (dateInObject.year && dateInObject.month && dateInObject.day) {

        this.#setDateValueFromNumbers(parseInt(dateInObject.year), parseInt(dateInObject.month) , parseInt(dateInObject.day));
      } else {
        if (value !== null && value !== undefined && value !== '') {
          console.error('your inputted Date doest match default or your specified Format');
        } else {
          this.#setValueObjNull();
        }
      }
    }
    /**
     * @description set value object base on currently valueType
     */
    #setDateValueFromNumbers(year: number, month: number, day: number) {
      const prevYear = this.yearValue;
      const prevMonth = this.monthValue;
      const result: JBDateInputValueObject = this.#dateFactory.getDateValueObjectBaseOnValueType(year, month, day, prevYear, prevMonth);
      this.#valueObject = result;
      this.#updateCalendarView();
    }
    /**
     * set value object base on currently inputType
     * @param {number} year jalali or gregorian year 
     * @param {number} month jalali or gregorian month
     * @param {number} day jalali or gregorian day
     */
    #setDateValueFromNumberBaseOnInputType(year: number, month: number, day: number) {
      const prevYear = this.yearBaseOnInputType;
      const prevMonth = this.monthBaseOnInputType;
      const result: JBDateInputValueObject = this.#dateFactory.getDateValueObjectBaseOnInputType(year, month, day, prevYear, prevMonth);
      this.#valueObject = result;
      this.#updateCalendarView();
      this.#updateFormAssociatedValue();
    }
    #updateInputTextFromValue() {
      const { year, month, day } = this.inputType == InputTypes.jalali ? this.#valueObject.jalali : this.#valueObject.gregorian;
      if(this.placeholder && !(year && month && day)){
        //if we have placeholder and inputed value were all null we show placeholder until user input some value
        this.#inputValue = "";
        return;
      }
      //
      let str = this.inputFormat;
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
    #getValueObjectFromInputText(inputText: string): JBDateInputValueObject {
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
    #updateValueObjFromInput(inputString: string) {
      const res = this.#inputRegex.exec(inputString);
      if (res && res.groups) {
        this.#setDateValueFromNumberBaseOnInputType(parseInt(res.groups.year), parseInt(res.groups.month), parseInt(res.groups.day));
      }
    }
    /**
     * @public
     * @description focus on date input web-component
     */
    focus() {
      //public
      this.elements.input.focus();
      this.showCalendar = true;
    }
    #handleCaretPosOnInputFocus() {
      const caretPos = this.elements.input.selectionStart;
      if (caretPos) {
        if (this.typedYear == "    " && caretPos <= 4) {
          //if year was null we move cursor to first char of year
          this.elements.input.setSelectionRange(0, 0);
          return;
        }
        if (this.typedMonth == "  " && caretPos > 4 && caretPos <= 7) {
          //if month was null we move cursor to first char of month
          this.elements.input.setSelectionRange(5, 5);
          return;
        }
        if (this.typedDay == "  " && caretPos > 7 && caretPos <= 10) {
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
    #checkIfInputTextIsChangedFromLastTime(newString: string): boolean {
      if (this.#lastInputStringValue != newString) {
        this.#lastInputStringValue = newString;
        return true;
      }
      return false;
    }
    #onInputFocus(e:FocusEvent) {
      this.#lastInputStringValue = this.#sInputValue;
      this.focus();
      document.addEventListener('selectionchange', this.#handleCaretPosOnInputFocus.bind(this));
    }
    #onInputBlur(e: FocusEvent) {
      document.removeEventListener('selectionchange', this.#handleCaretPosOnInputFocus.bind(this));
      const focusedElement = e.relatedTarget;
      if (focusedElement !== this.elements.calendar && focusedElement !== this.elements.calendarTriggerButton) {
        this.showCalendar = false;
      }
      const inputText = this.#sInputValue;
      //check if there is no update from last time then if change we update
      if (this.#checkIfInputTextIsChangedFromLastTime(inputText)) {
        this.#updateValueObjFromInput(inputText);
        this.#callOnChange();
      }

    }
    #onCalendarBlur(e: FocusEvent) {
      const focusedElement = e.relatedTarget;
      if (focusedElement !== this.elements.input && focusedElement !== this.elements.calendarTriggerButton) {
        this.showCalendar = false;
      }
    }
    #onCalendarContainerClicked(e: MouseEvent) {
      const isCalendarWrapperClicked = e.composedPath().findIndex(x => x == this.elements.calendarWrapper);
      if (isCalendarWrapperClicked == -1) {
        this.showCalendar = false;
        this.elements.input.blur();
      }
    }
    #callOnChange() {
      const validationResult = this.validation.checkValidity(true);
      const event = new CustomEvent('change', {
        detail: {
          isValid: validationResult.isAllValid,
          validationObject: validationResult,
          valueObject: { ...this.#valueObject }
        },
      });
      this.dispatchEvent(event);
    }
    /**
     * @deprecated use dom.validation.checkValidity instead
     */
    triggerInputValidation(showError = true) {
      // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
      //takeAction determine if we want to show user error in web component default Manner or developer will handle it by himself
      return this.#validation.checkValidity(showError);
    }
    #getInsideValidations(){
      const validationList:ValidationItem<ValidationValue>[] = [];
      if(this.required){
        validationList.push(requiredValidation);
      }
      if(this.dateRestrictions.min){
        validationList.push({
          validator:(value)=>{
            return checkMinValidation(new Date(value.valueObject.timeStamp),this.dateRestrictions.min);
          },
          message:'تاریخ انتخابی کمتر از بازه مجاز است'
        });
      }
      if(this.dateRestrictions.max){
        validationList.push({
          validator:(value)=>{
            return checkMaxValidation(new Date(value.valueObject.timeStamp),this.dateRestrictions.max);
          },
          message:'تاریخ انتخابی بیشتر از بازه مجاز است'
        });
      }
      return validationList;
    }
    showValidationError(error: string) {
      this.elements.messageBox.innerHTML = error;
      this.elements.messageBox.classList.add('error');
    }
    clearValidationError() {
      const text = this.getAttribute('message') || '';
      this.elements.messageBox.innerHTML = text;
      this.elements.messageBox.classList.remove('error');
    }
    #onCalendarElementInitiated() {
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
      this.#updateCalendarView();
    }
    #isCalendarButtonClickEventIsAfterFocusEvent = false;
    #onCalendarButtonFocused(e:FocusEvent) {
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
    #onCalendarButtonBlur(e:FocusEvent) {
      if(![this.elements.calendar as EventTarget, this.elements.input as EventTarget].includes(e.relatedTarget!)){
        this.showCalendar = false;
      }
    }
    #onCalendarButtonClick(){
      const focusedElement = this.shadowRoot?.activeElement;
      if(focusedElement && !this.#isCalendarButtonClickEventIsAfterFocusEvent && focusedElement == this.elements.calendarTriggerButton){
        //check if this click is event exactly after focus or not if its after focus we just pass but if its not and its a second click we close menu or reopen menu if closed before
        this.showCalendar = !this.showCalendar;
      }
      this.#isCalendarButtonClickEventIsAfterFocusEvent = false;
    }
    #onCalendarSelect(e: CustomEvent) {
      const target = e.target as JBCalendarWebComponent;
      const { year, month, day } = target.value;
      if (year && month && day) {
        this.#setDateValueFromNumberBaseOnInputType(year, month, day);
        this.#updateInputTextFromValue();
        this.showCalendar = false;
        this.#callOnDateSelect();
        this.#callOnChange();
      }

    }
    #callOnDateSelect() {
      //when user pick a day in calendar modal
      const event = new CustomEvent('select');
      this.dispatchEvent(event);
    }
    onInputTypeChange() {
      this.elements.calendar.inputType = this.inputType;
      this.#updateInputTextFromValue();
    }
    /**
     * set opened calendar date when date input value is empty
     * @public
     * @param {number} year which year you want to show in empty state in calendar.
     * @param {number} month which month you want to show in empty state in calendar.
     * @param {InputTypes} dateType default is your configured input-type  but you can set it otherwise if you want to change other type of calendar in case of change in input-type.
     */
    setCalendarDefaultDateView(year: number, month: number, dateType: InputTypes | undefined) {
      if (year && month) {
        this.#dateFactory.setCalendarDefaultDateView(year, month, dateType);
        this.#updateCalendarView();
      }
    }
    #fixCalendarContainerPos = ()=> {
      if(this.overflowHandler == "JUMP"){
        const bcr = this.elements.calendarContainer.getBoundingClientRect();
        const overflowSize = document.body.clientHeight - bcr.bottom;
        if(overflowSize < 0){
          this.elements.calendarContainer.style.transform = `translateY(${overflowSize}px)`;
        }
      }

    }
    #resetCalendarContainerPos = ()=>{
      if(this.overflowHandler == "JUMP"){
        this.elements.calendarContainer.style.transform = `translateY(${0}px)`;
      }
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
  window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
