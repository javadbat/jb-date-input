import {type JBCalendarWebComponent} from 'jb-calendar';
import {type JBInputWebComponent} from 'jb-input';
import {type JBPopoverWebComponent} from 'jb-popover';
export type ElementsObject = {
    input: JBInputWebComponent;
    calendarTriggerButton: HTMLDivElement;
    calendar: JBCalendarWebComponent;
    popover:JBPopoverWebComponent
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
    //just keep received date value time to pass it on date value recreation 
    time:{
        hour:number | null,
        minute:number | null,
        second:number | null,
        millisecond:number | null
    }
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
    day:string,
    hour:string,
    minute:string,
    second:string,
    millisecond:string
}
export type ValidationValue = {text:string, inputObject:InputtedValueInObject, valueObject:JBDateInputValueObject, valueText:string};
export type JBCalendarValue = {
    day: number | null;
    month: number | null;
    year: number | null;
}
//because this._internal is not a standard we have to extend HTML ELEMENT to use it
declare global {
    interface ElementInternals{
        setFormValue(value:string):void;
    }
}
