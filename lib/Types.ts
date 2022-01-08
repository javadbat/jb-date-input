import { Dayjs } from 'dayjs';
import {JBCalendarWebComponent} from 'jb-calendar';
export type ElementsObject = {
    input: HTMLInputElement;
    calendarTriggerButton: HTMLDivElement;
    calendar: JBCalendarWebComponent;
    calendarWrapper: HTMLDivElement;
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
    min:Dayjs | null;
    max:Dayjs | null;
}

export type JBDateInputValueObject = {
    gregorian:{
        year:number | null;
        month:number | null;
        day:number | null;
    };
    jalali:{
        year:number | null;
        month:number | null;
        day:number | null;
    };
    timeStamp:number | null;
}

export type DateValidResult = {
    isValid:boolean;
    error:string | null;
}
export type DateRestrictionsValidResult = {
    isAllValid():boolean;
    min: {
        isValid: boolean;
        message: null | string;
    },
    max: {
        isValid: boolean;
        message: null | string;
    }
}
//becuase this._internal is not a standard we have to extend HTMLELEMENT to use it
declare global {
    interface ElementInternals{
        setFormValue(value:string):void;
    }
}