import { Dayjs } from 'dayjs';
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
export type ValidationResultSummary = {
    isValid:boolean | null;
    message:string | null;
    detail:object | null;
}
export type ValidationResultItem = {
    isValid:boolean | null;
    message:string | null;
    validation:JBDateInputValidationItem | "REQUIRED" | "MIN" | "MAX";
}
export type ValidationResult = {
    validationList:ValidationResultItem[];
    isAllValid:boolean;
}
export type JBDateInputValidationItem = {
    validator: RegExp | ((text:string,valueObject:JBDateInputValueObject, valueText:string)=>boolean);
    message:string;
}

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

type DateValidationResultErrors = "INVALID_YEAR" | "INVALID_MONTH" | "INVALID_DAY" | "INVALID_MIN_MONTH_NUMBER" | "INVALID_MIN_DAY_NUMBER" | "INVALID_MAX_MONTH_NUMBER" | "INVALID_MAX_DAY_NUMBER" | "INVALID_MIN_YEAR_NUMBER" | "INVALID_MAX_YEAR_NUMBER" | "INVALID_DAY_IN_MONTH" | "INVALID_DAY_FOR_LEAP"
export type DateValidResult = {
    isValid:boolean;
    error:DateValidationResultErrors | null;
}
export type DateRestrictionsValidResult = {
    isAllValid:boolean;
    min: {
        isValid: boolean;
        message: null | string;
    },
    max: {
        isValid: boolean;
        message: null | string;
    }
}
export enum InputTypes {
    jalali = 'JALALI',
    gregorian = 'GREGORIAN'
}
export enum ValueTypes {
    jalali = 'JALALI',
    gregorian = 'GREGORIAN',
    timestamp = 'TIME_STAMP',
}
//becuase this._internal is not a standard we have to extend HTMLELEMENT to use it
declare global {
    interface ElementInternals{
        setFormValue(value:string):void;
    }
}