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