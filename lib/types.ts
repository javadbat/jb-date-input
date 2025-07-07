import {type JBCalendarWebComponent} from 'jb-calendar';
import {type JBInputWebComponent} from 'jb-input';
import {type JBPopoverWebComponent} from 'jb-popover';
import type {EventTypeWithTarget} from 'jb-core';
import { JBDateInputWebComponent } from './jb-date-input';
import type { JBDateInputValueObject } from 'jb-date-input/module';
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
export type NicheNumbers = {
    //when year is invalid or empty and we want to show the calendar we need to show the current year or any other base on user config
    calendarYearOnEmpty: {
      jalali: number,
      gregorian: number
    },
    calendarMonthOnEmpty: {
      jalali: number,
      gregorian: number
    }
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

export type JBDateInputEventType<TEvent> = EventTypeWithTarget<TEvent,JBDateInputWebComponent>;