import { isAfter, isBefore, isEqual } from "date-fns";
import { enToFaDigits, faToEnDigits } from "jb-core";
import type { BeforeInputHandlerResponse, InputType, JBDateInputValueObject } from "./types.js";
export * from './constants.js';
export * from "./types.js";
export function isLeapYearJalali(year: number) {
  const matches = [1, 5, 9, 13, 17, 22, 26, 30];
  const modulus = year % 33;
  return matches.includes(modulus)
}

export function getEmptyValueObject(): JBDateInputValueObject {
  return {
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
    timeStamp: null,
    time: {
      hour: null,
      minute: null,
      second: null,
      millisecond: null
    }
  };
}
export function getMonth(value: string) {
  return value.substring(5, 7)
}
export function getYear(value: string) {
  return value.substring(0, 4)
}
export function getDay(value: string) {
  return value.substring(8, 10)
}
/**
 * tell you that given caret pos is belonging to each part of web-component
 */
export function getSelectionPart(caretPos:number){
  if(caretPos<5){
    return 'YEAR';
  }
  if(caretPos<8){
    return 'MONTH'
  }
  if(caretPos < 11){
    return 'DAY'
  }
  return null;
}

export function handleDayBeforeInput(inputType: InputType, typedNumber: number, caretPos: number, value: string, inputChar: (char: string, pos: number) => void): { isIgnoreChar: boolean, caretPos: number } {
  let isIgnoreChar = false;
  if (caretPos == 8 && typedNumber > 3) {
    inputChar("0", caretPos);
    caretPos++;
  }
  if (caretPos == 9 && typedNumber > 1 && value[8] == "3") {
    //prevent day input bigger than 31 for example 38 or 34
    isIgnoreChar = true;
  }
  if (caretPos == 9 && typedNumber == 0 && value[8] == "0") {
    //prevent 00 for day
    isIgnoreChar = true;
  }
  if (caretPos == 8 && typedNumber == 0 && value[9] == "0") {
    //prevent 00 for day
    isIgnoreChar = true;
  }

  if (inputType == "JALALI" && !isIgnoreChar) {
    const month = getMonth(value);
    const monthNumber = Number(month);
    if (caretPos == 9 && value[8] == "3" && typedNumber > 0 && monthNumber > 6) {
      //for the second half of the year month are 30 and 31 is not valid
      isIgnoreChar = true;
    }
    if (caretPos == 8 && typedNumber == 3) {

      if (monthNumber == 12) {
        //if month was 12 we ignore 30,31 in date
        const yearNumber = Number(getYear(value));
        const isLeapYear = Number.isNaN(yearNumber) ? false : isLeapYearJalali(yearNumber);
        if (!isLeapYear) {
          isIgnoreChar = true;
        }
      }
      if (value[9] > "0") {
        // when day is 09 and user type 3 it prevent 39 as a day 1400/08/|19 => type 1400/08/39 X we dont let it happen
        if (month.length == 2 && parseInt(value) > 6) {
          //second six month of year in jalali have 30 day
          inputChar("0", 9);
        }
        if (month.length == 2 && monthNumber < 7 && value[9] > "1") {
          //first six month of year in jalali have 31 day
          inputChar("1", 9);
        }
      }
    }
  }
  return { isIgnoreChar: isIgnoreChar, caretPos: caretPos };
}
export function handleMonthBeforeInput(inputValue: string, typedNumber: number, caretPos: number): { isIgnoreChar: boolean, caretPos: number } {
  let isIgnoreChar = false;
  if (caretPos == 5 && typedNumber == 1 && inputValue[6] > "2") {
    //prevent month input bigger than 12 for example 19 or 16
    isIgnoreChar = true;
  }
  if (caretPos == 6 && typedNumber > 2 && inputValue[5] == "1") {
    //prevent month input bigger than 12 for example 19 or 16
    isIgnoreChar = true;
  }
  if (caretPos == 6 && typedNumber == 0 && inputValue[5] == "0") {
    //prevent 00 for month
    isIgnoreChar = true;
  }
  if (caretPos == 5 && typedNumber == 0 && inputValue[4] == "0") {
    //prevent 00 for month
    isIgnoreChar = true;
  }

  return { isIgnoreChar: isIgnoreChar, caretPos: caretPos };
}
export function checkMinValidation(date: Date, minDate: Date) {
  const minValid = isAfter(date, minDate) || isEqual(date, minDate);
  return minValid;
}
export function checkMaxValidation(date: Date, maxDate: Date) {
  const minValid = isBefore(date, maxDate) || isEqual(date, maxDate);
  return minValid;
}
export function isValidChar(char: string) {
  //allow 0-9 ۰-۹ and / char only
  return /[\u06F0-\u06F90-9/]/g.test(char);
}
export function standardString(dateString: string) {
  const sNumString = faToEnDigits(dateString);
  //convert dsd137/06/31rer to 1373/06/31
  const sString = sNumString.replace(/[^\u06F0-\u06F90-9/]/g, '');
  return sString;
}
/**
 * will input and replace a certain char in the given string 
 */
export function replaceChar(char: string, pos: number, currentValue: string, showPersianNumber?: boolean): string {
  if (pos == 4 || pos == 7) {
    char = '/';
  }
  if (pos > 9 || pos < 0) {
    return currentValue;
  }
  const newValueArr = currentValue.split('');
  if (showPersianNumber) {
    char = enToFaDigits(char);
  }
  newValueArr[pos] = char;
  const newValue = newValueArr.join('');
  return newValue;
}
type BeforeInputParameters = {
  dateInputType: InputType
  showPersianNumber?: boolean,
  value: string
  selection: {
    start: number,
    end: number,
  }
  event: {
    inputType: string,
    data: string | null,
  }
}
type InputCharCB = (char: string, pos: number) => void
type SetSelectionRangeCB = (pos: number) => void
export function handleBeforeInput(params: BeforeInputParameters): BeforeInputHandlerResponse {
  const { showPersianNumber, dateInputType, selection, event: { data, inputType } } = params
  const baseCaretPos = selection.start;
  //where we put caret pos after all input operation done
  let finalCaretPos = baseCaretPos;
  let finalValue = params.value;
  if (data) {
    //insert mode
    handleInsert();
  }
  if (inputType == 'deleteContentBackward' || inputType == 'deleteContentForward' || inputType == 'delete' || inputType == 'deleteByCut' || inputType == 'deleteByDrag') {
    //delete mode
    handleDelete(inputType, selection.start, selection.end, inputChar, setSelectionRange);
  }
  //return the result of before input handler
  return { value: finalValue, selectionStart: finalCaretPos, selectionEnd: finalCaretPos }
  //internal functions
  function inputChar(char: string, pos: number) {
    finalValue = replaceChar(char, pos, finalValue, showPersianNumber);
  }
  function setSelectionRange(caretPosition: number) {
    finalCaretPos = caretPosition;
  }
  function handleInsert() {
    // make string something like 1373/06/31 from dsd۱۳۷۳/06/31rer
    const StdString = standardString(params.event.data||"");
    StdString.split('').forEach((inputtedChar: string, i: number) => {
      let caretPos = baseCaretPos + i;
      if (!isValidChar(inputtedChar)) {
        return;
      }
      if (caretPos == 4 || caretPos == 7) {
        // in / pos
        if (inputtedChar == '/') {
          setSelectionRange(caretPos + 1);
        }
        //push carrot if it behind / char
        caretPos++;
      }
      // we want user typed char ignored in some scenario
      let isIgnoreChar = false;
      if (inputtedChar == '/') {
        return;
      }
      const typedNumber = Number(inputtedChar);
      if (caretPos == 5 && typedNumber > 1) {
        //second pos of month
        inputChar("0", caretPos);
        caretPos++;
      }
      const monthRes = handleMonthBeforeInput(finalValue, typedNumber, caretPos);
      caretPos = monthRes.caretPos;
      const dayRes = handleDayBeforeInput(dateInputType, typedNumber, caretPos, finalValue, inputChar);
      caretPos = dayRes.caretPos;
      isIgnoreChar = isIgnoreChar || dayRes.isIgnoreChar || monthRes.isIgnoreChar;
      if (!isIgnoreChar) {
        // here is when real input happen
        inputChar(inputtedChar, caretPos);
        setSelectionRange(caretPos + 1);
      }
    });
  }
}

//used in before input handler to handel delete function
function handleDelete(inputEventType: string, selectionStart: number, selectionEnd: number, inputChar: InputCharCB, setSelectionRange: SetSelectionRangeCB) {
  let d = 0;
  if (inputEventType == 'deleteContentBackward') {
    //backspace delete
    //if user want to delete a range we dont del pre char of selection and just delete the range
    d = selectionStart !== selectionEnd ? 0 : -1;
  }
  for (let i = selectionStart; i <= selectionEnd; i++) {
    inputChar(' ', i + d);
  }
  setSelectionRange(selectionStart + d);
}

type HandleFocusParams = {
  selectionStart:number|null,
  inputValue:string
}
/**
* return best caret pos base on current input caret pos (move caret pos to last empty char of each section) 
*/
export function getFixedCaretPos(params:HandleFocusParams):number|null{
    const caretPos = params.selectionStart;
    if (caretPos) {
      const trimmedYearLength =  getYear(params.inputValue).trim().length;
      const trimmedMonthLength = getMonth(params.inputValue).trim().length;
      const trimmedDayLength = getDay(params.inputValue).trim().length;
      //
      if (trimmedYearLength < caretPos && (caretPos <= 4 || (trimmedMonthLength == 0 && trimmedDayLength == 0))) {
        //if year was null we move cursor to first char of year
        return trimmedYearLength;
      }
      // when user focus on month section or focus on day when month is'nt filled yet.
      if (caretPos > 4 && ((caretPos <= 7 && trimmedMonthLength + 5 < caretPos) || (trimmedDayLength == 0 && trimmedMonthLength<2)) ) {
        //if month was null we move cursor to first char of month
        return trimmedMonthLength+ 5
      }
      if (trimmedDayLength + 8 < caretPos && caretPos > 7 && caretPos <= 10) {
        //if day was null we move cursor to first char of day
        return trimmedDayLength + 8;
      }
    }
    return null;
  }