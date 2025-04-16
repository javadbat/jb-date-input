import HTML from './jb-date-input.html';
import CSS from './jb-date-input.scss';
import 'jb-calendar';
import 'jb-input';
import 'jb-popover';
// eslint-disable-next-line no-duplicate-imports
import { type JBCalendarWebComponent } from 'jb-calendar';
import type { JBFormInputStandards } from 'jb-form';

import { InputTypes, ValueTypes, type ElementsObject, type DateRestrictions, type JBDateInputValueObject, type ValueType, InputType, type ValidationValue, type JBCalendarValue } from './types';
import { DateFactory } from './date-factory';
import { checkMaxValidation, checkMinValidation, getEmptyValueObject, handleDayBeforeInput, handleMonthBeforeInput } from './helpers';
import { ValidationHelper, type ValidationResult, type ValidationItem, type WithValidation, type ShowValidationErrorParameters } from 'jb-validation';
import { requiredValidation } from './validations';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent } from 'jb-input';
import { createInputEvent, createKeyboardEvent, createFocusEvent, listenAndSilentEvent, isMobile, enToFaDigits, faToEnDigits } from 'jb-core';
import {defineColors} from 'jb-core/theme';
export * from "./types.js";

if (HTMLElement == undefined) {
  //in case of server render or old browser
  console.error('you cant render web component on a server side. try to load this component as a client side component');
}
const emptyInputValueString = '    /  /  ';
//TODO: refactor date-input to use Date value as a core value so date object could be filled even with incomplete value
export class JBDateInputWebComponent extends HTMLElement implements WithValidation<ValidationValue>, JBFormInputStandards<string> {
  static formAssociated = true;
  #internals?: ElementInternals;
  elements!: ElementsObject;
  #validation = new ValidationHelper<ValidationValue>({
    clearValidationError: this.clearValidationError.bind(this),
    getValue: () => this.#validationValue,
    getValidations: this.#getInsideValidations.bind(this),
    getValueString: (val) => val.text,
    setValidationResult: this.#setValidationResult.bind(this),
    showValidationError: this.showValidationError.bind(this)
  }
  )
  #isAutoValidationDisabled = false;
  get isAutoValidationDisabled(): boolean {
    return this.#isAutoValidationDisabled;
  }
  set isAutoValidationDisabled(value: boolean) {
    this.#isAutoValidationDisabled = value;
  }
  #dateFactory: DateFactory = new DateFactory({ inputType: (this.getAttribute("input-type") as InputTypes), valueType: this.getAttribute("value-type") as ValueTypes });
  #showCalendar = false;
  inputFormat = 'YYYY/MM/DD';
  #inputRegex = /^(?<year>[\u06F0-\u06F90-9,\s]{4})\/(?<month>[\u06F0-\u06F90-9,\s]{2})\/(?<day>[\u06F0-\u06F90-9,\s]{2})$/g;
  get validation() {
    return this.#validation;
  }
  dateRestrictions: DateRestrictions = {
    min: null,
    max: null
  };
  #disabled = false;
  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.elements.input.disabled = value;
    if (value) {
      //TODO: remove as any when typescript support
      (this.#internals as any).states?.add("disabled");
    } else {
      (this.#internals as any).states?.delete("disabled");
    }
  }
  //selection input behavior
  get selectionStart(): number {
    return this.elements.input.selectionStart;
  }
  set selectionStart(value: number) {
    this.elements.input.selectionStart = value;
  }
  get selectionEnd(): number {
    return this.elements.input.selectionEnd;
  }
  set selectionEnd(value: number) {
    this.elements.input.selectionEnd = value;
  }
  get selectionDirection(): "forward" | "backward" | "none" {
    return this.elements.input.selectionDirection;
  }
  set selectionDirection(value: "forward" | "backward" | "none") {
    this.elements.input.selectionDirection = value;
  }
  setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none") {
    this.elements.input.setSelectionRange(start, end, direction);
  }
  #required = false;
  set required(value: boolean) {
    this.#required = value;
    this.#checkValidity(false);
  }
  get required() {
    return this.#required;
  }
  DefaultValidationErrorMessage = "مقدار وارد شده نا معتبر است"
  #valueObject: JBDateInputValueObject = getEmptyValueObject();
  get name() { return this.getAttribute('name') || ''; }
  get form() { return this.#internals!.form; }
  get value(): string {
    const value = this.getDateValue();
    return value;
  }
  set value(value: string | Date) {
    this.#setDateValue(value);
    this.#updateInputTextFromValue();
  }
  //set an empty date value as a default initial value
  initialValue: string | null = null;
  get isDirty() {
    //when initial value is null mean we calculate and build value string base on format, value type , etc on every check to make sure is dirty works well on empty value in every scenario
    return this.value !== (this.initialValue ?? this.#dateFactory.getDateValueStringFromValueObject(getEmptyValueObject(), this.valueType));
  }
  get #validationValue(): ValidationValue {
    return {
      inputObject: this.#dateFactory.getDateObjectValueBaseOnFormat(this.#sInputValue, this.inputFormat),
      text: this.#sInputValue,
      valueText: this.value,
      valueObject: this.#valueObject
    };
  }

  setMonthList(inputType: InputType, monthName: string[]) {
    this.elements.calendar.setMonthList(inputType, monthName);
  }
  #updateFormAssociatedValue(): void {
    //in html form we need to get date input value in native way this function update and set value of the input so form can get it when needed
    if (this.#internals && typeof this.#internals.setFormValue == "function") {
      this.#internals.setFormValue(this.value);
    }
  }
  /**
   * @description return date value if value valid and return null if inputted value is not valid
   */
  get valueInDate(): Date | null {
    return this.#dateFactory.getDateValueFromValueObject(this.#valueObject);
  }
  get inputValue() {
    return this.#inputValue;
  }
  #placeholder: string | null = null;
  get placeholder() {
    return this.#placeholder;
  }
  set placeholder(value: string | null) {
    this.#placeholder = value;
    if (value !== null) {
      this.elements.input.elements.input.placeholder = value;
    } else {
      this.elements.input.elements.input.placeholder = "";
    }
    this.#updateInputTextFromValue();
  }
  //standardized input value
  get #sInputValue(): string {
    let value = this.#inputValue;
    if (this.#showPersianNumber) {
      value = faToEnDigits(value);
    }
    return value;
  }
  get #inputValue() {
    return this.elements.input.value;
  }
  set #inputValue(value: string) {
    this.elements.input.value = value;
  }
  get showCalendar() {
    return this.#showCalendar;
  }

  set showCalendar(value) {
    this.#showCalendar = value;
    if (value == true) {
      //we have to do it because js dont tell us when dir change so we have to check and set it every time we open calendar
      this.elements.calendar.setupStyleBaseOnCssDirection();
      this.elements.popover.open();
      this.elements.calendarTriggerButton.classList.add('--active');
    } else {
      this.elements.popover.close();
      this.elements.calendarTriggerButton.classList.remove('--active');
    }
  }

  get inputType(): InputType {
    return this.#dateFactory.inputType;
  }
  set inputType(value: InputType) {

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
  #showPersianNumber = false;
  get showPersianNumber() {
    return this.#showPersianNumber;
  }
  set showPersianNumber(value) {
    this.#showPersianNumber = value;
    this.#updateInputTextFromValue();
  }
  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser dont support attachInternals
      this.#internals = this.attachInternals();
    }
    this.#initWebComponent();
    // js standard input element to more associate it with form element
  }
  connectedCallback() {
    // standard web component event that called when all of dom is bounded
    this.#callOnLoadEvent();
    this.#initProp();
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
    defineColors();
    const html = `<style>${CSS}</style>` + '\n' + HTML;
    const element = document.createElement('template');
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.elements = {
      input: shadowRoot.querySelector('jb-input')!,
      calendarTriggerButton: shadowRoot.querySelector('.calendar-trigger')!,
      calendar: shadowRoot.querySelector('jb-calendar')!,
      popover: shadowRoot.querySelector('jb-popover')!,
    };
    this.#registerEventListener();
    this.#initDeviceSpecifics();
  }
  /**
   * @description activate some features specially on mobile or other specific devices
   */
  #initDeviceSpecifics() {
    if (isMobile()) {
      // on mobile
      this.elements.input.setAttribute('readonly', 'true');
      //TODO: handle back button and prevent back when calendar is open
    } else {
      // on non-mobile
      this.elements.input.removeAttribute('readonly');
    }
  }
  #registerEventListener() {
    this.elements.input.addEventListener('beforeinput', this.#onInputBeforeInput.bind(this));
    listenAndSilentEvent(this.elements.input, 'focus', this.#onInputFocus.bind(this), { passive: true });
    listenAndSilentEvent(this.elements.input, 'blur', this.#onInputBlur.bind(this), { passive: true });
    listenAndSilentEvent(this.elements.input, 'keypress', this.#onInputKeyPress.bind(this));
    listenAndSilentEvent(this.elements.input, 'keyup', this.#onInputKeyup.bind(this));
    listenAndSilentEvent(this.elements.input, 'keydown', this.#onInputKeydown.bind(this));

    //
    this.elements.calendarTriggerButton.addEventListener('focus', this.#onCalendarButtonFocused.bind(this));
    this.elements.calendarTriggerButton.addEventListener('blur', this.#onCalendarButtonBlur.bind(this));
    this.elements.calendarTriggerButton.addEventListener('click', this.#onCalendarButtonClick.bind(this));
    //
    this.elements.calendar.addEventListener('select', (e) => this.#onCalendarSelect(e as CustomEvent));
    this.elements.calendar.addEventListener('init', this.#onCalendarElementInitiated.bind(this));
    this.elements.calendar.addEventListener('blur', this.#onCalendarBlur.bind(this), { passive: true });
    this.elements.popover.addEventListener('close', this.#onPopoverClose.bind(this), { passive: true });
  }
  //true if all sub component initiated
  #isAllSubComponentInitiated = false;
  /**
   * @description wait for all sub-component to be load
   */
  async #waitForComponentsLoad() {
    if (this.#isAllSubComponentInitiated) {
      return Promise.resolve();
    }
    await customElements.whenDefined("jb-input");
    await customElements.whenDefined("jb-calendar");
    await customElements.whenDefined("jb-popover");
    // const calendarPromise = new Promise<void>((resolve) => {
    //   this.elements.calendar.addEventListener('init', () => {
    //     resolve();
    //   }, { once: true, passive: true });
    // });
    this.#isAllSubComponentInitiated = true;
    return Promise.resolve();
  }
  #initProp() {
    this.#waitForComponentsLoad().then(() => {
      this.#setValueObjNull();
      this.value = this.getAttribute('value') || '';
      this.#callOnInitEvent();
    });
  }
  static get dateInputObservedAttributes() {
    return ['value-type', 'value', 'name', 'format', 'min', 'max', 'required', 'input-type', 'direction', 'show-persian-number', 'placeholder', 'disabled','error'];
  }
  static get observedAttributes() {
    return [...JBInputWebComponent.observedAttributes, ...JBDateInputWebComponent.dateInputObservedAttributes];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (JBDateInputWebComponent.dateInputObservedAttributes.includes(name)) {
      this.#onAttributeChange(name, newValue);
    } else if (JBInputWebComponent.observedAttributes.includes(name)) {
      this.elements.input.setAttribute(name, newValue);
    }
    // do something when an attribute has changed
  }
  #onAttributeChange(name: string, value: string) {
    switch (name) {
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
      case 'show-persian-number':
        if (value == 'true' || value == '') {
          this.showPersianNumber = true;
          this.elements.calendar.showPersianNumber = true;
        }
        if (value == 'false' || value == null) {
          this.showPersianNumber = false;
          this.elements.calendar.showPersianNumber = false;
        }
        break;
      case 'placeholder':
        this.placeholder = value;
        break;
      case 'disabled':
        this.disabled = value === "" || value == "true";
        break;
      case 'error':
        this.reportValidity();
        break;
    }

  }
  setFormat(newFormat: string) {
    //override new format base on user config
    this.#dateFactory.valueFormat = newFormat;
    //if we have min and max  date settled before format set we set them again so it works
    const minDate = this.getAttribute('min');
    if (minDate) {
      this.#setMinDate(minDate);
    }
    const maxDate = this.getAttribute('max');
    if (maxDate) {
      this.#setMaxDate(maxDate);
    }
  }
  setMinDate(minDate: string | Date) {
    this.#setMinDate(minDate);
  }
  #setMinDate(dateInput: string | Date) {
    let minDate: Date | null = null;
    //create min date base on input value type
    if (typeof dateInput == "string") {
      minDate = this.#dateFactory.getDateFromValueDateString(dateInput);
    } else {
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
  setMaxDate(maxDate: string | Date) {
    this.#setMaxDate(maxDate);
  }
  #setMaxDate(dateInput: string | Date) {
    let maxDate: Date | null = null;
    //create max date base on input value type
    if (typeof dateInput == "string") {
      maxDate = this.#dateFactory.getDateFromValueDateString(dateInput);
    } else {
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
    this.#inputChar(char, pos);
  }
  #inputChar(char: string, pos: number) {
    if (pos == 4 || pos == 7) {
      char = '/';
    }
    if (pos > 9 || pos < 0) {
      return;
    }
    this.#inputRegex.lastIndex = 0;
    const newValueArr = this.#inputValue.split('');
    if (this.#showPersianNumber) {
      char = enToFaDigits(char);
    }
    newValueArr[pos] = char;
    const newValue = newValueArr.join('');
    //due ro performance issue i remove validation check on every char input
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
  /**
   * this event generate by ourself in before input after input done
   */
  #onInputInput(e: InputEvent) {
    this.#dispatchOnInputEvent(e);
  }
  #dispatchOnInputEvent(e: InputEvent): void {
    const event = createInputEvent('input', e, { cancelable: false });
    this.dispatchEvent(event);
  }
  #dispatchBeforeInputEvent(e: InputEvent): boolean {
    e.stopPropagation();
    const event = createInputEvent('beforeinput', e, { cancelable: true });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
    return event.defaultPrevented;
  }
  #onInputBeforeInput(e: InputEvent) {
    const isPrevented = this.#dispatchBeforeInputEvent(e);
    if (isPrevented) {
      return;
    }
    //TODO: handel range selection
    const inputSelectionStart = (e.target as HTMLInputElement).selectionStart!;
    const baseCaretPos = inputSelectionStart;
    const inputtedString: string | null = e.data;
    if (inputtedString) {
      //insert mode
      //check if we are in placeholder mode we update or input text to standard mode
      if (this.placeholder && this.#inputValue === "") {
        this.#inputValue = emptyInputValueString;
      }
      // make string something like 1373/06/31 from dsd۱۳۷۳/06/31rer
      const standardString = this.#standardString(inputtedString);
      standardString.split('').forEach((inputtedChar: string, i: number) => {
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
        if (inputtedChar == '/') {
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
      let d = 0;
      if (e.inputType == 'deleteContentBackward') {
        //backspace delete
        d = -1;
      }
      for (let i = inputSelectionStart; i <= inputSelectionEnd; i++) {
        this.#inputChar(' ', i + d);
      }
      this.elements.input.setSelectionRange(inputSelectionStart + d, inputSelectionStart + d);
      //show placeholder if input were empty
      if (this.placeholder && this.#inputValue == emptyInputValueString) {
        this.#inputValue = "";
      }
      e.preventDefault();
    }
    //because we preventDefault before input input will never be called so have to call it after we manually input all chars
    //TODO: make it cancellable
    this.#onInputInput(e);
  }
  #onInputKeyPress(e: KeyboardEvent) {
    e.stopPropagation();
    const keyPressEvent = createKeyboardEvent('keypress', e, { cancelable: false });
    this.dispatchEvent(keyPressEvent);
  }
  #onInputKeyup(e: KeyboardEvent) {
    this.#updateValueFromInputString(this.#sInputValue);
    this.#dispatchOnInputKeyup(e);
  }
  #dispatchOnInputKeyup(e: KeyboardEvent) {
    e.stopPropagation();
    const event = createKeyboardEvent("keyup", e, { cancelable: false });
    this.dispatchEvent(event);
  }
  #onInputKeydown(e: KeyboardEvent) {
    const notCancelled = this.#dispatchKeyDownEvent(e);
    if (!notCancelled) {
      e.preventDefault();
      return;
    }
    const target = (e.target as JBInputWebComponent);
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
  #dispatchKeyDownEvent(e: KeyboardEvent) {
    e.stopPropagation();
    const event = createKeyboardEvent("keydown", e, { cancelable: false });
    return this.dispatchEvent(event);
  }
  #addYear(interval: number) {
    const currentYear = this.yearDisplayValue ? this.yearDisplayValue : this.#dateFactory.yearOnEmptyBaseOnInputType;
    const currentMonth = this.monthDisplayValue || 1;
    const currentDay = this.dayDisplayValue || 1;
    const { hour, minute, millisecond, second } = this.#valueObject.time;
    this.#setDateValueFromNumberBaseOnInputType(currentYear + interval, currentMonth, currentDay, hour, minute, second, millisecond);
    this.#updateInputTextFromValue();
  }
  #addMonth(interval: number) {
    const currentYear = this.yearDisplayValue ? this.yearDisplayValue : this.#dateFactory.yearOnEmptyBaseOnInputType;
    const currentMonth = this.monthDisplayValue || 1;
    const currentDay = this.dayDisplayValue || 1;
    const { hour, minute, millisecond, second } = this.#valueObject.time;
    this.#setDateValueFromNumberBaseOnInputType(currentYear, currentMonth + interval, currentDay, hour, minute, second, millisecond);
    this.#updateInputTextFromValue();
  }
  #addDay(interval: number) {
    const currentYear = this.yearDisplayValue ? this.yearDisplayValue : this.#dateFactory.yearOnEmptyBaseOnInputType;
    const currentMonth = this.monthDisplayValue || 1;
    const currentDay = this.dayDisplayValue || 1;
    const { hour, minute, millisecond, second } = this.#valueObject.time;
    this.#setDateValueFromNumberBaseOnInputType(currentYear, currentMonth, currentDay + interval, hour, minute, second, millisecond);
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
    if (typeof value == "string") {
      switch (this.#dateFactory.valueType) {
        case "GREGORIAN":
        case "JALALI":
          this.#setDateValueFromString(value);
          break;
        case "TIME_STAMP":
          this.#setDateValueFromTimeStamp(value);
          break;
      }
    } else if (value instanceof Date) {
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
      day: this.#dateFactory.getCalendarDay(this.#valueObject),
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
  #setDateValueFromDate(value: Date) {
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

      this.#setDateValueFromNumbers(parseInt(dateInObject.year), parseInt(dateInObject.month), parseInt(dateInObject.day), parseInt(dateInObject.hour ?? '00'), parseInt(dateInObject.minute ?? '00'), parseInt(dateInObject.second ?? '00'), parseInt(dateInObject.millisecond ?? '000'));
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
  #setDateValueFromNumbers(year: number, month: number, day: number, hour?: number, minute?: number, second?: number, millisecond?: number) {
    const prevYear = this.yearValue;
    const prevMonth = this.monthValue;
    const result: JBDateInputValueObject = this.#dateFactory.getDateValueObjectBaseOnValueType(year, month, day, prevYear, prevMonth, hour, minute, second, millisecond);
    this.#valueObject = result;
    this.#updateCalendarView();
  }
  /**
   * set value object base on currently inputType (call this function when date is complete)
   * @param {number} year jalali or gregorian year 
   * @param {number} month jalali or gregorian month
   * @param {number} day jalali or gregorian day
   */
  #setDateValueFromNumberBaseOnInputType(year: number, month: number, day: number, hour?: number, minute?: number, second?: number, millisecond?: number) {
    //TODO: refactor this component to use date value as a core object
    const prevYear = this.yearBaseOnInputType;
    const prevMonth = this.monthBaseOnInputType;
    const result: JBDateInputValueObject = this.#dateFactory.getDateValueObjectBaseOnInputType(year, month, day, prevYear, prevMonth, hour, minute, second, millisecond);
    this.#valueObject = result;
    this.#updateCalendarView();
    this.#updateFormAssociatedValue();
  }
  #updateInputTextFromValue() {
    const { year, month, day } = this.inputType == InputTypes.jalali ? this.#valueObject.jalali : this.#valueObject.gregorian;
    if (this.placeholder && !(year && month && day)) {
      //if we have placeholder and inputted value were all null we show placeholder until user input some value
      this.#inputValue = "";
      return;
    }
    //
    let str = this.inputFormat;
    let yearString = '    ', monthString = '  ', dayString = '  ';
    if (year != null && !Number.isNaN(year)) {
      if (year < 10) {
        yearString = '000' + year;
      } else if (year < 100) {
        yearString = '00' + year;
      } else if (year < 1000) {
        yearString = '0' + year;
      } else {
        yearString = year.toString();
      }
    }
    if (month != null && !Number.isNaN(month)) {
      if (month < 10) {
        monthString = '0' + month;
      } else {
        monthString = month.toString();
      }
    }
    if (day != null && !Number.isNaN(day)) {
      if (day < 10) {
        dayString = '0' + day;
      } else {
        dayString = day.toString();
      }
    }
    //convert to fa char if needed
    if (this.#showPersianNumber) {
      yearString = enToFaDigits(yearString);
      monthString = enToFaDigits(monthString);
      dayString = enToFaDigits(dayString);
    }
    str = str.replace('YYYY', yearString).replace('MM', monthString).replace('DD', dayString);
    this.#inputValue = str;
  }
  /**
   * called when input text change and we want to update value object base on input text
   * @param {string}inputString 
   */
  #updateValueFromInputString(inputString: string) {
    const res = this.#inputRegex.exec(inputString);
    if (res && res.groups) {
      //TODO: update this when support date time and get times factor from input
      const { hour, minute, millisecond, second } = this.#valueObject.time;
      const year = parseInt(res.groups.year);
      const month = parseInt(res.groups.month);
      const day = parseInt(res.groups.day);
      if (year && month && day) {
        this.#setDateValueFromNumberBaseOnInputType(year, month, day, hour, minute, second, millisecond);
      }
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
      const trimmedYearLength = this.typedYear.trim().length;
      if (trimmedYearLength < caretPos && caretPos <= 4) {
        //if year was null we move cursor to first char of year
        this.elements.input.setSelectionRange(trimmedYearLength, trimmedYearLength);
        return;
      }
      const trimmedMonthLength = this.typedMonth.trim().length;
      if (trimmedMonthLength + 5 < caretPos && caretPos > 4 && caretPos <= 7) {
        //if month was null we move cursor to first char of month
        this.elements.input.setSelectionRange(trimmedMonthLength + 5, trimmedMonthLength + 5);
        return;
      }
      const trimmedDayLength = this.typedDay.trim().length;
      if (trimmedDayLength + 8 < caretPos && caretPos > 7 && caretPos <= 10) {
        //if day was null we move cursor to first char of day
        this.elements.input.setSelectionRange(trimmedDayLength + 8, trimmedDayLength + 8);
        return;
      }
    }

  }
  #lastInputStringValue = '    /  /  ';
  /**
   * check if there is no update from last time then if change we update. remember to call returned update.
   * @param { string }newString newly typed String
   */
  #checkIfInputTextIsChangedFromLastTime(newString: string) {
    const updatePrevValue = () => {
      this.#lastInputStringValue = newString;
    };
    if (this.#lastInputStringValue != newString) {
      this.#lastInputStringValue = newString;
      return { isUpdated: true, updatePrevValue };
    }
    return { isUpdated: false, updatePrevValue };
  }
  #onInputFocus(e: FocusEvent) {
    this.#lastInputStringValue = this.#sInputValue;
    this.focus();
    //dont add once:true here because we need to detect every caret pos change during the type and then remove it from our input on blur
    document.addEventListener('selectionchange', this.#handleCaretPosOnInputFocus.bind(this));
    this.#dispatchFocusEvent(e);
  }
  #dispatchFocusEvent(e: FocusEvent) {
    e.stopPropagation();
    const event = createFocusEvent("focus", e, { cancelable: false });
    this.dispatchEvent(event);
  }
  #onInputBlur(e: FocusEvent) {
    document.removeEventListener('selectionchange', this.#handleCaretPosOnInputFocus.bind(this));
    const focusedElement = e.relatedTarget;
    if (focusedElement !== this.elements.calendar && focusedElement !== this.elements.calendarTriggerButton) {
      this.showCalendar = false;
    }
    const inputText = this.#sInputValue;
    //check if there is no update from last time then if change we update
    const changeTestRes = this.#checkIfInputTextIsChangedFromLastTime(inputText);
    if (changeTestRes.isUpdated) {
      this.#updateValueFromInputString(inputText);
      const dispatchedEvent = this.#dispatchOnChangeEvent();
      this.#checkValidity(true);
      if (dispatchedEvent.defaultPrevented) {
        e.preventDefault();
        this.#updateValueFromInputString(this.#lastInputStringValue);
      } else {
        changeTestRes.updatePrevValue();
      }
    }
    this.#dispatchBlurEvent(e);
  }
  #dispatchBlurEvent(e: FocusEvent) {
    e.stopPropagation();
    const event = createFocusEvent("blur", e, { cancelable: false });
    this.dispatchEvent(event);
  }
  #onCalendarBlur(e: FocusEvent) {
    const focusedElement = e.relatedTarget;
    if (focusedElement !== this.elements.input && focusedElement !== this.elements.calendarTriggerButton) {
      this.showCalendar = false;
    }
  }
  #onPopoverClose() {
    this.showCalendar = false;
    this.elements.input.blur();
  }
  #dispatchOnChangeEvent() {
    const event = new Event('change', { composed: true, bubbles: true, cancelable: true });
    this.dispatchEvent(event);
    return event;
  }
  /**
   * @deprecated use dom.validation.checkValidity instead
   */
  triggerInputValidation(showError = true) {
    // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
    //takeAction determine if we want to show user error in web component default Manner or developer will handle it by himself
    return this.#checkValidity(showError);
  }
  #getInsideValidations() {
    const validationList: ValidationItem<ValidationValue>[] = [];
    if(this.getAttribute("error") !== null && this.getAttribute("error").trim().length > 0){
      validationList.push({
        validator: undefined,
        message: this.getAttribute("error"),
        stateType: "customError"
      });
    }
    if (this.required) {
      validationList.push(requiredValidation);
    }
    if (this.dateRestrictions.min) {
      validationList.push({
        validator: (value) => {
          return checkMinValidation(new Date(value.valueObject.timeStamp), this.dateRestrictions.min);
        },
        message: 'تاریخ انتخابی کمتر از بازه مجاز است',
        stateType: "rangeUnderflow"
      });
    }
    if (this.dateRestrictions.max) {
      validationList.push({
        validator: (value) => {
          return checkMaxValidation(new Date(value.valueObject.timeStamp), this.dateRestrictions.max);
        },
        message: 'تاریخ انتخابی بیشتر از بازه مجاز است',
        stateType: "rangeOverflow"
      });
    }

    return validationList;
  }
  showValidationError(error: ShowValidationErrorParameters) {
    this.elements.input.showValidationError(error);
    (this.#internals as any).states?.add("invalid");
  }
  clearValidationError() {
    this.elements.input.clearValidationError();
    (this.#internals as any).states?.delete("invalid");
   
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
  #onCalendarButtonFocused(e: FocusEvent) {
    const prevFocused = e.relatedTarget;
    if (this.showCalendar && prevFocused && [this.elements.calendar as EventTarget, this.elements.input as EventTarget].includes(prevFocused)) {
      //if calendar was displayed but user click on icon we hide it here
      (prevFocused as HTMLInputElement).focus();
      this.showCalendar = false;
    } else {
      // if user focus on calendar button from outside of calendar area we show calendar
      this.#isCalendarButtonClickEventIsAfterFocusEvent = true;
      this.showCalendar = true;
    }

  }
  #onCalendarButtonBlur(e: FocusEvent) {
    if (![this.elements.calendar as EventTarget, this.elements.input as EventTarget].includes(e.relatedTarget!)) {
      this.showCalendar = false;
    }
  }
  #onCalendarButtonClick() {
    const focusedElement = this.shadowRoot?.activeElement;
    if (focusedElement && !this.#isCalendarButtonClickEventIsAfterFocusEvent && focusedElement == this.elements.calendarTriggerButton) {
      //check if this click is event exactly after focus or not if its after focus we just pass but if its not and its a second click we close menu or reopen menu if closed before
      this.showCalendar = !this.showCalendar;
    }
    this.#isCalendarButtonClickEventIsAfterFocusEvent = false;
  }
  #onCalendarSelect(e: CustomEvent) {
    const target = e.target as JBCalendarWebComponent;
    const { year, month, day } = target.value;
    if (year && month && day) {
      const prevValueDate = structuredClone(this.valueInDate);
      const { hour, minute, millisecond, second } = this.#valueObject.time;
      this.#setDateValueFromNumberBaseOnInputType(year, month, day, hour, minute, second, millisecond);
      this.#updateInputTextFromValue();
      this.showCalendar = false;
      this.#callOnDateSelect();
      this.#checkValidity(true);
      const dispatchedEvent = this.#dispatchOnChangeEvent();
      if (dispatchedEvent.defaultPrevented) {
        e.preventDefault();
        this.#setDateValueFromDate(prevValueDate);
        this.#updateInputTextFromValue();
      }
    }

  }
  #callOnDateSelect() {
    //when user pick a day in calendar modal
    const event = new CustomEvent('select');
    this.dispatchEvent(event);
  }
  async onInputTypeChange() {
    //wait for sub-component load on first value initiation
    if (!this.#isAllSubComponentInitiated) {
      await this.#waitForComponentsLoad();
    }
    this.elements.calendar.inputType = this.inputType;
    this.#updateInputTextFromValue();
  }
  /**
   * set opened calendar date when date input value is empty
   * @public
   * @param  year which year you want to show in empty state in calendar.
   * @param  month which month you want to show in empty state in calendar.
   * @param  dateType default is your configured input-type  but you can set it otherwise if you want to change other type of calendar in case of change in input-type.
   */
  setCalendarDefaultDateView(year: number, month: number, dateType: InputType | undefined) {
    if (year && month) {
      this.#dateFactory.setCalendarDefaultDateView(year, month, dateType);
      this.#updateCalendarView();
    }
  }
  #checkValidity(showError: boolean) {
    if (!this.isAutoValidationDisabled) {
      return this.#validation.checkValidity({ showError });
    }
  }
  /**
 * @public
 * @description this method used to check for validity but doesn't show error to user and just return the result
 * this method used by #internal of component
 */
  checkValidity(): boolean {
    const validationResult = this.#validation.checkValiditySync({ showError: false });
    if (!validationResult.isAllValid) {
      this.#dispatchInvalidEvent();
    }
    return validationResult.isAllValid;
  }
  /**
  * @public
 * @description this method used to check for validity and show error to user
 */
  reportValidity(): boolean {
    const validationResult = this.#validation.checkValiditySync({ showError: true });
    if (!validationResult.isAllValid) {
      this.#dispatchInvalidEvent();
    }
    return validationResult.isAllValid;
  }
  #dispatchInvalidEvent() {
    const event = new CustomEvent('invalid');
    this.dispatchEvent(event);
  }
  /**
   * @description this method called on every checkValidity calls and update validation result of #internal
   */
  #setValidationResult(result: ValidationResult<ValidationValue>) {
    if (result.isAllValid) {
      this.#internals.setValidity({}, '');
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach((res) => {
        if (!res.isValid) {
          if (res.validation.stateType) {
            states[res.validation.stateType] = true;
          } else {
            states["customError"] = true;
          }
          if (message == '') { message = res.message; }

        }
      });
      this.#internals.setValidity(states, message);
    }
  }
  get validationMessage() {
    return this.#internals.validationMessage;
  }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
  window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
