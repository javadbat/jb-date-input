import { isAfter, isBefore, isEqual } from "date-fns";
import { type JBDateInputWebComponent } from "./jb-date-input";
import {InputTypes, JBDateInputValueObject } from "./types";

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
    time:{
      hour:null,
      minute:null,
      second:null,
      millisecond:null
    }
  };
}

export function handleDayBeforeInput(this: JBDateInputWebComponent, typedNumber: number, caretPos: number):{isIgnoreChar: boolean, caretPos: number}{
  let isIgnoreChar = false;
  if (caretPos == 8 && typedNumber > 3) {
    this.inputChar("0", caretPos);
    caretPos++;
  }
  if (caretPos == 9 && typedNumber > 1 && this.elements.input.value[8] == "3"){
    //prevent day input bigger than 31 for example 38 or 34
    isIgnoreChar = true;
  }
  if (caretPos == 9 && typedNumber == 0 && this.elements.input.value[8] == "0") {
    //prevent 00 for day
    isIgnoreChar = true;
  }
  if (caretPos == 8 && typedNumber == 0 && this.elements.input.value[9] == "0") {
    //prevent 00 for day
    isIgnoreChar = true;
  }
  if (caretPos == 8 && typedNumber == 3 && this.elements.input.value[9] > "0") {
    if(this.inputType == InputTypes.jalali){
      // when day is 09 and user type 3 it prevent 39 as a day 1400/08/|19 => type 1400/08/39 X we dont let it happen
      if (this.typedMonth.length == 2 && parseInt(this.typedMonth) > 6) {
        //second six month of year in jalali have 30 day
        this.inputChar("0", 9);
      }
      if (this.typedMonth.length == 2 && parseInt(this.typedMonth) < 7 && this.elements.input.value[9] > "1") {
        //first six month of year in jalali have 31 day
        this.inputChar("1", 9);
      } 
    }

  }
  return {isIgnoreChar: isIgnoreChar, caretPos: caretPos};
}
export function handleMonthBeforeInput(this: JBDateInputWebComponent, typedNumber: number, caretPos: number):{isIgnoreChar: boolean, caretPos: number}{
  let isIgnoreChar = false;
  if (caretPos == 5 && typedNumber == 1 && this.elements.input.value[6] > "2") {
    //prevent month input bigger than 12 for example 19 or 16
    isIgnoreChar = true;
  }
  if(caretPos == 6 && typedNumber> 2 && this.elements.input.value[5] == "1"){
    //prevent month input bigger than 12 for example 19 or 16
    isIgnoreChar = true;
  }
  if (caretPos == 6 && typedNumber == 0 && this.elements.input.value[5] == "0") {
    //prevent 00 for month
    isIgnoreChar = true;
  }
  if (caretPos == 5 && typedNumber == 0 && this.elements.input.value[4] == "0") {
    //prevent 00 for month
    isIgnoreChar = true;
  }

  return {isIgnoreChar: isIgnoreChar, caretPos: caretPos};
}
export function checkMinValidation(date:Date,minDate:Date){
  const minValid = isAfter(date, minDate) || isEqual(date, minDate);
  return minValid;
}
export function checkMaxValidation(date:Date,maxDate:Date){
  const minValid = isBefore(date, maxDate) || isEqual(date, maxDate);
  return minValid;
}