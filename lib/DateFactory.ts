import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { DateRestrictions, DateRestrictionsValidResult, DateValidResult, InputTypes, JBDateInputValueObject, ValueTypes } from './Types';


dayjs.extend(isLeapYear);
type JalaliDayjs = typeof dayjs & { calendar(calendarType: string): Dayjs; }

if (typeof (dayjs as JalaliDayjs).calendar !== "function") {
    dayjs.extend(jalaliday);
}
export type DateFactoryConstructorArg = {
    inputType: InputTypes | null | undefined;
    valueType: ValueTypes | null | undefined;
}
export class DateFactory {
    #valueType = ValueTypes.gregorian;
    #inputType = InputTypes.jalali;
    //here we keep numbers that replace the year,month,day in niche situations
    #nicheNumbers = {
        //when year is invalid or empty and we want to show the calendar we need to show the current year or any other base on user config
        calendarYearOnEmpty: {
            jalali: DateFactory.todayJalaliYear,
            gregorian: DateFactory.todayGregorianYear
        },
        calendarMonthOnEmpty:{
            jalali: 1,
            gregorian: 1
        }
    }
    get nicheNumbers(){
        return this.#nicheNumbers;
    }
    get inputType() {
        return this.#inputType;
    }
    get valueType() {
        return this.#valueType;
    }
    constructor(args: DateFactoryConstructorArg) {
        if (args.inputType) {
            this.#inputType = args.inputType;
        }
        if (args.valueType) {
            this.#valueType = args.valueType;
        }
    }

    setInputType(inputType: InputTypes) {
        this.#inputType = inputType;
    }
    setValueType(valueType: ValueTypes) {
        this.#valueType = valueType;
    }
    getYearValue(valueObject: JBDateInputValueObject): number | null {
        if (this.valueType == ValueTypes.jalali) {
            return valueObject.jalali.year;
        }
        return valueObject.gregorian.year;
    }
    getMonthValue(valueObject: JBDateInputValueObject): number | null {
        if (this.valueType == ValueTypes.jalali){
            return valueObject.jalali.month ;
        }
        return valueObject.gregorian.month;
    }
    getDateFromValueDateString(valueDateString: string, format: string): Date | null {
        let resultDate: Date | null = null;
        //create min date base on input value type
        if (this.valueType == ValueTypes.timestamp) {
            resultDate = DateFactory.getDateFromTimestamp(parseInt(valueDateString));
        } else {
            const dateValueObj = DateFactory.getDateObjectValueBaseOnFormat(valueDateString, format);
            //sometimes format set after min value restriction set by user so this object returned null in these scenario we set min after format set again
            if (dateValueObj !== null && dateValueObj !== undefined && dateValueObj.groups !== null && dateValueObj.groups !== undefined) {
                if (this.valueType == ValueTypes.gregorian) {
                    resultDate = DateFactory.getDateFromGregorian(parseInt(dateValueObj.groups.year), parseInt(dateValueObj.groups.month), parseInt(dateValueObj.groups.day));
                }
                if (this.valueType == ValueTypes.jalali) {
                    resultDate = DateFactory.getDateFromJalali(parseInt(dateValueObj.groups.year), parseInt(dateValueObj.groups.month), parseInt(dateValueObj.groups.day));
                }
            }
        }
        return resultDate;
    }
    getCalendarYear(valueObject: JBDateInputValueObject): number {
        const defaultYear = this.inputType == InputTypes.gregorian? this.#nicheNumbers.calendarYearOnEmpty.gregorian: this.#nicheNumbers.calendarYearOnEmpty.jalali;
        return this.getYearValue(valueObject) || defaultYear;
    }
    getCalendarMonth(valueObject: JBDateInputValueObject): number {
        const defaultMonth = this.inputType == InputTypes.gregorian? this.#nicheNumbers.calendarMonthOnEmpty.gregorian: this.#nicheNumbers.calendarMonthOnEmpty.jalali;
        return this.getMonthValue(valueObject) || defaultMonth;
    }
    static checkJalaliDateValidation(jalaliYear: number, jalaliMonth: number, jalaliDay: number) {
        //check if jalali date is valid
        const result: DateValidResult = {
            isValid: true,
            error: null
        };
        //this function check date itself validation not user setted validation
        if (isNaN(jalaliYear)) {
            result.isValid = false;
            result.error = "INVALID_YEAR";
        }
        if (isNaN(jalaliMonth)) {
            result.isValid = false;
            result.error = "INVALID_MONTH";
        }
        if (isNaN(jalaliDay)) {
            result.isValid = false;
            result.error = "INVALID_DAY";
        }
        if (jalaliMonth < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_MONTH_NUMBER";
        }
        if (jalaliDay < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_DAY_NUMBER";
        }
        if (jalaliMonth > 12) {
            result.isValid = false;
            result.error = "INVALID_MAX_MONTH_NUMBER";
        }
        if (jalaliDay > 31) {
            result.isValid = false;
            result.error = "INVALID_MAX_DAY_NUMBER";
        }
        if (jalaliYear < 1000) {
            result.isValid = false;
            result.error = "INVALID_MIN_YEAR_NUMBER";
        }
        if (jalaliYear > 9999) {
            result.isValid = false;
            result.error = "INVALID_MAX_YEAR_NUMBER";
        }
        if (jalaliMonth > 6 && jalaliMonth < 12) {
            if (jalaliDay > 30) {

                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }
        }
        if (jalaliMonth == 12) {
            if (jalaliDay > 30) {
                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }
        }
        if (result.isValid && jalaliMonth == 12) {
            //if everything was ok then we check for leap year
            const date = DateFactory.getDayjsFromJalali(jalaliYear, jalaliMonth, jalaliDay);
            const jalaliDate = date.calendar('jalali');
            if (jalaliDate.year() !== jalaliYear) {
                result.isValid = false;
                result.error = "INVALID_DAY_FOR_LEAP";
            }
        }

        return result;

    }
    static checkGregorianDateValidation(gregorianYear: number, gregorianMonth: number, gregorianDay: number) {
        const result: DateValidResult = {
            isValid: true,
            error: null
        };
        //this function check date itself validation not user setted validation
        if (isNaN(gregorianYear)) {
            result.isValid = false;
            result.error = "INVALID_YEAR";
        }
        if (isNaN(gregorianMonth)) {
            result.isValid = false;
            result.error = "INVALID_MONTH";
        }
        if (isNaN(gregorianDay)) {
            result.isValid = false;
            result.error = "INVALID_DAY";
        }
        if (gregorianMonth < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_MONTH_NUMBER";
        }
        if (gregorianDay < 1) {
            result.isValid = false;
            result.error = "INVALID_MIN_DAY_NUMBER";
        }
        if (gregorianMonth > 12) {
            result.isValid = false;
            result.error = "INVALID_MAX_MONTH_NUMBER";
        }
        if (gregorianDay > 31) {
            result.isValid = false;
            result.error = "INVALID_MAX_DAY_NUMBER";
        }
        if (gregorianYear < 1000) {
            result.isValid = false;
            result.error = "INVALID_MIN_YEAR_NUMBER";
        }
        if (gregorianYear > 9999) {
            result.isValid = false;
            result.error = "INVALID_MAX_YEAR_NUMBER";
        }

        if ([2, 4, 6, 9, 11].includes(gregorianDay)) {
            //month has less than 31 day
            if (gregorianDay > 30) {

                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }
        }
        if (gregorianMonth == 2 && gregorianDay > 28) {
            if (gregorianDay == 29) {
                const date = DateFactory.getDayjsFromGregorian(gregorianYear, gregorianMonth, gregorianDay);
                if (!date.isLeapYear()) {
                    result.isValid = false;
                    result.error = "INVALID_DAY_FOR_LEAP";
                }
            } else {
                result.isValid = false;
                result.error = "INVALID_DAY_IN_MONTH";
            }

        }

        return result;

    }
    static getDateObjectValueBaseOnFormat(value: string, format: string) {
        const regexString = format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        return res;
    }
    static getDayjsFromGregorian(year: number | string, month: number | string, day: number | string): Dayjs {
        return dayjs(`${year}-${month}-${day}`, 'YYYY-M-D');
    }
    static getDayjsFromJalali(year: number | string, month: number | string, day: number | string): Dayjs {
        const date = (dayjs as any)(`${year}-${month}-${day}`, { jalali: true });
        return date;
    }
    static getDayjsFromTimestamp(timestamp: number): Dayjs {
        return dayjs(timestamp);
    }
    static getDayjs(year: number | string, month: number | string, day: number | string, isJalali: boolean) {
        if (isJalali) {
            return DateFactory.getDayjsFromJalali(year, month, day);
        }
        return DateFactory.getDayjsFromGregorian(year, month, day);
    }
    static getDateFromGregorian(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day);
    }
    static getDateFromJalali(year: number, month: number, day: number): Date {
        const date = DateFactory.getDayjsFromJalali(year, month, day);
        return date.toDate();
    }
    static getDateFromTimestamp(timestamp: number): Date {
        return new Date(timestamp);
    }
    static checkDateRestrictions(year: number, month: number, day: number, dateInputType: InputTypes, dateRestrictions: DateRestrictions): DateRestrictionsValidResult {
        //this function check if inputed date is valid date in min and max range
        const result: DateRestrictionsValidResult = {
            get isAllValid() { return (this.min.isValid && this.max.isValid); },
            min: {
                isValid: true,
                message: null
            },
            max: {
                isValid: true,
                message: null
            }
        };
        const date = DateFactory.getDayjs(year, month, day, dateInputType == InputTypes.jalali);
        if (dateRestrictions.min) {
            const minValid = date.isAfter(dateRestrictions.min) || date.isSame(dateRestrictions.min);
            if (!minValid) {
                result.min = {
                    isValid: false,
                    message: 'تاریخ انتخابی کمتر از بازه مجاز است'
                };
            }
        }
        if (dateRestrictions.max) {
            const maxValid = date.isBefore(dateRestrictions.max) || date.isSame(dateRestrictions.max);
            if (!maxValid) {
                result.max = {
                    isValid: false,
                    message: 'تاریخ انتخابی بیشنر از بازه مجاز است'
                };
            }
        }
        return result;
    }
    static get todayGregorianYear(): number {
        return dayjs().year();
    }
    static get todayJalaliYear(): number {
        const year = dayjs().calendar('jalali').year();
        return year;
    }
}