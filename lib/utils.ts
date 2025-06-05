import { isAfter, isBefore, isEqual } from "date-fns";
import { type InputType } from "./jb-date-input";
import { JBDateInputValueObject } from "./types";
import { enToFaDigits, faToEnDigits } from "jb-core";

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
export function getMonth(value:string){
  return value.substring(5, 7)
}
export function getYear(value:string){
  return value.substring(0, 4)
}
export function getDay(value:string){
  return value.substring(8, 10)
}
export function handleDayBeforeInput(inputType:InputType, typedNumber: number, caretPos: number, inputChar: (char: string, pos: number) => void, getInputValue:()=>string): { isIgnoreChar: boolean, caretPos: number } {
  let isIgnoreChar = false;
  if (caretPos == 8 && typedNumber > 3) {
    inputChar("0", caretPos);
    caretPos++;
  }
  if (caretPos == 9 && typedNumber > 1 && getInputValue()[8] == "3") {
    //prevent day input bigger than 31 for example 38 or 34
    isIgnoreChar = true;
  }
  if (caretPos == 9 && typedNumber == 0 && getInputValue()[8] == "0") {
    //prevent 00 for day
    isIgnoreChar = true;
  }
  if (caretPos == 8 && typedNumber == 0 && getInputValue()[9] == "0") {
    //prevent 00 for day
    isIgnoreChar = true;
  }
  if (caretPos == 8 && typedNumber == 3 && getInputValue()[9] > "0") {
    if (inputType == "JALALI") {
      // when day is 09 and user type 3 it prevent 39 as a day 1400/08/|19 => type 1400/08/39 X we dont let it happen
      if (getMonth(getInputValue()).length == 2 && parseInt(getInputValue()) > 6) {
        //second six month of year in jalali have 30 day
        inputChar("0", 9);
      }
      if (getMonth(getInputValue()).length == 2 && parseInt(getMonth(getInputValue())) < 7 && getInputValue()[9] > "1") {
        //first six month of year in jalali have 31 day
        inputChar("1", 9);
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
  //TODO: convert en to persian or persian to en base on user config
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
    return;
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
  inputType:InputType
  showPersianNumber?:boolean,
  event:{
    inputEventType: string,
    data:string|null,
    preventDefault: VoidFunction,
    target:{
      selectionStart:number,
      selectionEnd:number,
      setSelectionRange: (start: number, end: number) => void,
      setValue: (value: string) => void,
      //we need live value here
      getValue: () => string
    }
  }
}
export function onInputBeforeInput(params: BeforeInputParameters) {
  const {showPersianNumber,inputType,event:{data,inputEventType,preventDefault,target}} = params
  const baseCaretPos = target.selectionStart;
  function inputChar(char:string,pos:number){
    target.setValue(replaceChar(char, pos,target.getValue(),showPersianNumber))
  }
  if (data) {
    //insert mode
    // make string something like 1373/06/31 from dsd۱۳۷۳/06/31rer
    const StdString = standardString(params.event.data);
    StdString.split('').forEach((inputtedChar: string, i: number) => {
      let caretPos = baseCaretPos + i;
      if (!isValidChar(inputtedChar)) {
        preventDefault();
        return;
      }
      if (caretPos == 4 || caretPos == 7) {
        // in / pos
        if (inputtedChar == '/') {
          target.setSelectionRange(caretPos + 1, caretPos + 1);
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
        inputChar("0", caretPos) ;
        caretPos++;
      }
      const monthRes = handleMonthBeforeInput(target.getValue(), typedNumber, caretPos);
      caretPos = monthRes.caretPos;
      const dayRes = handleDayBeforeInput(inputType,typedNumber,caretPos,inputChar,target.getValue);
      caretPos = dayRes.caretPos;
      isIgnoreChar = isIgnoreChar || dayRes.isIgnoreChar || monthRes.isIgnoreChar;
      if (!isIgnoreChar) {
        inputChar(inputtedChar, caretPos);
        target.setSelectionRange(caretPos + 1, caretPos + 1);
      }
    });
    preventDefault();
  }
  if (inputEventType == 'deleteContentBackward' || inputEventType == 'deleteContentForward' || inputEventType == 'delete' || inputEventType == 'deleteByCut' || inputEventType == 'deleteByDrag') {
    //delete mode
    let d = 0;
    if (inputEventType == 'deleteContentBackward') {
      //backspace delete
      d = -1;
    }
    for (let i = target.selectionStart; i <= target.selectionEnd; i++) {
      inputChar(' ', i + d);
    }
    target.setSelectionRange(target.selectionStart + d, target.selectionStart + d);
    preventDefault();
  }

}