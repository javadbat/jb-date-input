import { JBDateInputWebComponent } from "./JBDateInput";
import { InputTypes, JBDateInputValueObject } from "./types";

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
        timeStamp: null
    };
}
export function handleDayBeforeInput(this: JBDateInputWebComponent, typedNumber: number, carretPos: number):{isIgnoreChar: boolean, carretPos: number}{
    let isIgnoreChar = false;
    if (carretPos == 8 && typedNumber > 3) {
        this.inputChar("0", carretPos);
        carretPos++;
    }
    if (carretPos == 9 && typedNumber > 1 && this.elements.input.value[8] == "3"){
        //prevent day input bigger than 31 for example 38 or 34
        isIgnoreChar = true;
    }
    if (carretPos == 9 && typedNumber == 0 && this.elements.input.value[8] == "0") {
        //prevent 00 for day
        isIgnoreChar = true;
    }
    if (carretPos == 8 && typedNumber == 0 && this.elements.input.value[9] == "0") {
        //prevent 00 for day
        isIgnoreChar = true;
    }
    if (carretPos == 8 && typedNumber == 3 && this.elements.input.value[9] > "0") {
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
    return {isIgnoreChar: isIgnoreChar, carretPos: carretPos};
}
export function handleMonthBeforeInput(this: JBDateInputWebComponent, typedNumber: number, carretPos: number):{isIgnoreChar: boolean, carretPos: number}{
    let isIgnoreChar = false;
    if (carretPos == 5 && typedNumber == 1 && this.elements.input.value[6] > "2") {
        //prevent month input bigger than 12 for example 19 or 16
        isIgnoreChar = true;
    }
    if(carretPos == 6 && typedNumber> 2 && this.elements.input.value[5] == "1"){
        //prevent month input bigger than 12 for example 19 or 16
        isIgnoreChar = true;
    }
    if (carretPos == 6 && typedNumber == 0 && this.elements.input.value[5] == "0") {
        //prevent 00 for month
        isIgnoreChar = true;
    }
    if (carretPos == 5 && typedNumber == 0 && this.elements.input.value[4] == "0") {
        //prevent 00 for month
        isIgnoreChar = true;
    }

    return {isIgnoreChar: isIgnoreChar, carretPos: carretPos};
}