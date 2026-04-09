export type DatePart = 'year' | 'month' | 'day';
export type TimePart = 'hour' | 'minute' | 'second' | 'millisecond';
export type DateInObject = {
    [key in DatePart]:number | null
}

export type JBDateInputValueObject = {
    gregorian:DateInObject;
    jalali:DateInObject;
    timeStamp:number | null;
    //just keep received date value time to pass it on date value recreation 
    time:{
        [key in TimePart]: number | null;
    }
}
export type BeforeInputHandlerResponse = {
    value:string,
    selectionStart:number,
    selectionEnd:number
}
export enum InputTypes {
    jalali = 'JALALI',
    gregorian = 'GREGORIAN'
}
export type InputType = 'JALALI' | 'GREGORIAN';