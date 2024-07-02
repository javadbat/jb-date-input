import {JBCalendarWebComponent} from 'jb-calendar';
export type ElementsObject = {
    input: HTMLInputElement;
    calendarTriggerButton: HTMLDivElement;
    calendar: JBCalendarWebComponent;
    calendarWrapper: HTMLDivElement;
    calendarContainer: HTMLDivElement;
    label: HTMLLabelElement;
    labelValue: HTMLSpanElement;
    messageBox: HTMLDivElement;
    [key: string]: HTMLElement;
};
export type DateRestrictions = {
    min:Date | null;
    max:Date | null;
}
export type DateInObject = {
    year:number | null;
    month:number | null;
    day:number | null;
}
export type JBDateInputValueObject = {
    gregorian:DateInObject;
    jalali:DateInObject;
    timeStamp:number | null;
}
export enum InputTypes {
    jalali = 'JALALI',
    gregorian = 'GREGORIAN'
}
export type InputType = 'JALALI' | 'GREGORIAN';
export type ValueType = 'JALALI' | 'GREGORIAN' | 'TIME_STAMP';
export enum ValueTypes {
    jalali='JALALI' ,
    gregorian='GREGORIAN' ,
    timeStamp= 'TIME_STAMP'
}
//this validations will prevent user from typing or even replaced value typed by user so it will not get merged with common validation helper 
type DateValidationResultErrors = "INVALID_YEAR" | "INVALID_MONTH" | "INVALID_DAY" | "INVALID_MIN_MONTH_NUMBER" | "INVALID_MIN_DAY_NUMBER" | "INVALID_MAX_MONTH_NUMBER" | "INVALID_MAX_DAY_NUMBER" | "INVALID_MIN_YEAR_NUMBER" | "INVALID_MAX_YEAR_NUMBER" | "INVALID_DAY_IN_MONTH" | "INVALID_DAY_FOR_LEAP"
export type DateValidResult = {
    isValid:boolean;
    error:DateValidationResultErrors | null;
}
/**
 * @description when user type some value in input we just dived and separate string in 3 section (there is no date calculation behind it) and it mostly used in
 */
export type InputtedValueInObject = {
    year:string,
    month:string,
    day:string
}
export type JBDateInputValidationValue = {text:string, inputObject:InputtedValueInObject, valueObject:JBDateInputValueObject, valueText:string};
//because this._internal is not a standard we have to extend HTML ELEMENT to use it
declare global {
    interface ElementInternals{
        setFormValue(value:string):void;
    }
}
