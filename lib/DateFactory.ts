import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { DateRestrictions, DateRestrictionsValidResult, InputTypes } from './Types';


dayjs.extend(isLeapYear);
type JalaliDayjs = typeof dayjs & { calendar(calendarType: string): Dayjs; }

if (typeof (dayjs as JalaliDayjs).calendar !== "function") {
    dayjs.extend(jalaliday);
}
//export type Dayjs = Dayjs;

export class DateFactory{
    static getDayjsFromGregorian(year:number|string,month:number|string,day:number|string):Dayjs{
        return dayjs(`${year}-${month}-${day}`, 'YYYY-M-D');
    }
    static getDayjsFromJalali(year:number|string,month:number|string,day:number|string):Dayjs{
        const date = (dayjs as any)(`${year}-${month}-${day}`, { jalali: true });
        return date;
    }
    static getDayjsFromTimestamp(timestamp:number):Dayjs{
        return dayjs(timestamp);
    }
    static getDayjs(year:number|string,month:number|string,day:number|string, isJalali:boolean){
        if(isJalali){
            return DateFactory.getDayjsFromJalali(year,month,day);
        }
        return DateFactory.getDayjsFromGregorian(year,month,day);
    }
    static getDateFromGregorian(year:number,month:number,day:number):Date{
        return new Date(year,month-1,day);
    }
    static getDateFromJalali(year:number,month:number,day:number):Date{
        const date = DateFactory.getDayjsFromJalali(year,month,day);
        return date.toDate();
    }
    static getDateFromTimestamp(timestamp:number):Date{
        return new Date(timestamp);
    }
    static checkDateRestrictions(year:number,month:number,day:number,dateInputType:InputTypes, dateRestrictions:DateRestrictions):DateRestrictionsValidResult{
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
}