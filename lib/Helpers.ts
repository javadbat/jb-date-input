import { JBDateInputValueObject } from "./Types";

export function getEmptyValueObject():JBDateInputValueObject{
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