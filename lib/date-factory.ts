
import { InputTypes, JBDateInputValueObject, ValueTypes, ValueType, InputType, InputtedValueInObject, DateValidResult } from './types';
import { getEmptyValueObject } from './helpers';
import { getYear, getMonth, getTime as getTimeStamp, isLeapYear, getDate } from 'date-fns';
import { newDate, isLeapYear as isJalaliLeapYear, getYear as getJalaliYear, getMonth as getJalaliMonth, getDate as getJalaliDate } from 'date-fns-jalali';


export type DateFactoryConstructorArg = {
    inputType: InputTypes | null | undefined;
    valueType: ValueTypes | null | undefined;
}
export class DateFactory {
    #valueType:ValueType = "GREGORIAN";
    #inputType:InputType = InputTypes.jalali;
    //here we keep numbers that replace the year,month,day in niche situations
    #nicheNumbers = {
      //when year is invalid or empty and we want to show the calendar we need to show the current year or any other base on user config
      calendarYearOnEmpty: {
        jalali: DateFactory.todayJalaliYear,
        gregorian: DateFactory.todayGregorianYear
      },
      calendarMonthOnEmpty: {
        jalali: DateFactory.todayJalaliMonth,
        gregorian: DateFactory.todayGregorianMonth
      }
    }
    #valueFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    get valueFormat() {
      return this.#valueFormat;
    }
    set valueFormat(valueFormat: string) {
      this.#valueFormat = valueFormat;
    }
    get nicheNumbers() {
      return this.#nicheNumbers;
    }
    get yearOnEmptyBaseOnInputType() {
      if (this.#inputType == "JALALI") {
        return this.#nicheNumbers.calendarYearOnEmpty.jalali;
      }
      return this.#nicheNumbers.calendarYearOnEmpty.gregorian;
    }
    get monthOnEmptyBaseOnValueType(): number {
      if (this.valueType == "JALALI") {
        return this.#nicheNumbers.calendarMonthOnEmpty.jalali;
      }
      return this.#nicheNumbers.calendarMonthOnEmpty.gregorian;
    }
    get inputType() {
      return this.#inputType;
    }
    get valueType():ValueType{
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

    setInputType(inputType: InputType) {
      this.#inputType = inputType;
    }
    setValueType(valueType: ValueType) {
      this.#valueType = valueType;
    }
    getYearValueBaseOnInputType(valueObject: JBDateInputValueObject): number | null {
      if (this.#inputType == InputTypes.jalali) {
        return valueObject.jalali.year;
      }
      return valueObject.gregorian.year;
    }
    getMonthValueBaseOnInputType(valueObject: JBDateInputValueObject): number | null {
      if (this.#inputType == InputTypes.jalali) {
        return valueObject.jalali.month;
      }
      return valueObject.gregorian.month;
    }
    getDayValueBaseOnInputType(valueObject: JBDateInputValueObject): number | null {
      if (this.#inputType == InputTypes.jalali) {
        return valueObject.jalali.day;
      }
      return valueObject.gregorian.day;
    }
    getDateFromValueDateString(valueDateString: string): Date | null {
      let resultDate: Date | null = null;
      //create min date base on input value type
      if (this.valueType == "TIME_STAMP") {
        resultDate = DateFactory.getDateFromTimestamp(parseInt(valueDateString));
      } else {
        const dateValueObj = this.getDateObjectValueBaseOnFormat(valueDateString);
        const year = parseInt(dateValueObj.year);
        const month = parseInt(dateValueObj.month);
        const day = parseInt(dateValueObj.day);
        //sometimes format set after min value restriction set by user so this object returned null in these scenario we set min after format set again
        if (dateValueObj !== null && dateValueObj !== undefined && year !== null && month !== null && day !== null) {
          if (this.valueType == "GREGORIAN") {
            resultDate = DateFactory.getDateFromGregorian(year, month, day);
          }
          if (this.valueType == "JALALI") {
            resultDate = DateFactory.getDateFromJalali(year, month, day);
          }
        }
      }
      return resultDate;
    }
    getDateValueFromValueObject(valueObject: JBDateInputValueObject):Date | null{
      if(valueObject.gregorian.year && valueObject.gregorian.month && valueObject.gregorian.day){
        const date = new Date(valueObject.gregorian.year,valueObject.gregorian.month -1 ,valueObject.gregorian.day);
        return date;
      }
      return null;
    }
    /**
     * @description use when user want component value and convert valueObject to user formatted value string base on format and value type
     */
    getDateValueStringFromValueObject(valueObject: JBDateInputValueObject, type = this.valueType): string {
      //this function convert inputed date to expected format base on valueType
      const emptyYearString = '0000';
      const emptyMonthString = '00';
      const emptyDayString = '00';
      const getGregorianValue = () => {
        const { year, month, day } = valueObject.gregorian;
        const yearStr: string = year == null ? emptyYearString : (year < 1000 ? (year < 100 ? (year < 10 ? "000" + year : "00" + year) : "0" + year) : year.toString());
        const monthStr: string = month == null ? emptyMonthString : month < 10 ? "0" + month : month.toString();
        const dayStr: string = day == null ? emptyDayString : day < 10 ? "0" + day : day.toString();
        const value = this.#valueFormat.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
          .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
          .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
        return value;
      };
      const getJalaliValue = () => {
        const { year, month, day } = valueObject.jalali;
        const yearStr: string = year == null ? emptyYearString : (year < 1000 ? (year < 100 ? (year < 10 ? "000" + year : "00" + year) : "0" + year) : year.toString());
        const monthStr: string = month == null ? emptyMonthString : month < 10 ? "0" + month : month.toString();
        const dayStr: string = day == null ? emptyDayString : day < 10 ? "0" + day : day.toString();
        const value = this.valueFormat.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
          .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
          .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
        return value;
      };
      if (typeof valueObject == "object") {
        switch (type) {
          case 'GREGORIAN':
            return getGregorianValue();
          case 'JALALI':
            return getJalaliValue();
          case 'TIME_STAMP':
            if (valueObject.timeStamp) {
              return valueObject.timeStamp.toString();
            }
        }
      }
      //when date is not completely valid
      return "";

    }
    getCalendarYear(valueObject: JBDateInputValueObject): number {
      const defaultYear = this.inputType == InputTypes.gregorian ? this.#nicheNumbers.calendarYearOnEmpty.gregorian : this.#nicheNumbers.calendarYearOnEmpty.jalali;
      return this.getYearValueBaseOnInputType(valueObject) || defaultYear;
    }
    getCalendarMonth(valueObject: JBDateInputValueObject): number {
      const defaultMonth = this.inputType == InputTypes.gregorian ? this.#nicheNumbers.calendarMonthOnEmpty.gregorian : this.#nicheNumbers.calendarMonthOnEmpty.jalali;
      return this.getMonthValueBaseOnInputType(valueObject) || defaultMonth;
    }
    getCalendarDay(valueObject: JBDateInputValueObject): number | null {
      return this.getDayValueBaseOnInputType(valueObject);
    }
    setCalendarDefaultDateView(year: number, month: number, inputType: InputType = this.#inputType) {
      if (inputType == InputTypes.gregorian) {
        this.#nicheNumbers.calendarYearOnEmpty.gregorian = year;
        this.#nicheNumbers.calendarMonthOnEmpty.gregorian = month;
      } else if (inputType == InputTypes.jalali) {
        this.#nicheNumbers.calendarYearOnEmpty.jalali = year;
        this.#nicheNumbers.calendarMonthOnEmpty.jalali = month;
      }
    }
    getDateValueObjectBaseOnInputType(year: number, month: number, day: number, oldYear: number | null, oldMonth: number | null): JBDateInputValueObject {
      if (this.#inputType == InputTypes.gregorian) {
        return this.#getDateValueFromGregorian(year, month, day, oldYear, oldMonth);
      }
      if (this.#inputType == InputTypes.jalali) {
        return this.#getDateValueFromJalali(year, month, day, oldYear, oldMonth);
      }
      console.error("INVALID_INPUT_TYPE");
      return getEmptyValueObject();
    }
    getDateValueObjectBaseOnValueType(year: number, month: number, day: number, oldYear: number | null, oldMonth: number | null): JBDateInputValueObject {
      if (this.#valueType == "GREGORIAN") {
        return this.#getDateValueFromGregorian(year, month, day, oldYear, oldMonth);
      }
      if (this.#valueType == "JALALI") {
        return this.#getDateValueFromJalali(year, month, day, oldYear, oldMonth);
      }
      if (this.#valueType == "TIME_STAMP") {
        return this.#getDateValueFromGregorian(year, month, day, oldYear, oldMonth);
      }
      console.error("INVALID_INPUT_TYPE");
      return getEmptyValueObject();
    }
    getDateValueObjectFromTimeStamp(timestamp: number): JBDateInputValueObject {
      const date = new Date(timestamp);
      return this.getDateObjectValueFromDateValue(date);
    }
    /**
  * @description this function return date object base on javascript Date type
  */
    getDateObjectValueFromDateValue(inputValue: Date): JBDateInputValueObject {
      const result: JBDateInputValueObject = {
        gregorian: {
          year: getYear(inputValue),
          month: getMonth(inputValue) + 1,
          day: getDate(inputValue)
        },
        jalali: {
          year: getJalaliYear(inputValue),
          month: getJalaliMonth(inputValue) + 1,
          day: getJalaliDate(inputValue)
        },
        timeStamp: getTimeStamp(inputValue),
      };
      return result;
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
        if (jalaliMonth == 12 && jalaliDay == 30) {
          const date = DateFactory.getDateFromJalali(jalaliYear, jalaliMonth, jalaliDay);
          if (!isJalaliLeapYear(date)) {
            result.isValid = false;
            result.error = "INVALID_DAY_FOR_LEAP";
          }
    
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
          const date = DateFactory.getDateFromGregorian(gregorianYear, gregorianMonth, gregorianDay);
          if (!isLeapYear(date)) {
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
    #getDateValueFromGregorian(gregorianYear: number, gregorianMonth: number, gregorianDay: number, oldGregorianYear: number | null, oldGregorianMonth: number | null): JBDateInputValueObject {

      const valueObject: JBDateInputValueObject = getEmptyValueObject();
      const dateValidationResult = DateFactory.checkGregorianDateValidation(gregorianYear, gregorianMonth, gregorianDay);
      if (!dateValidationResult.isValid) {
        if (dateValidationResult.error == "INVALID_MIN_DAY_NUMBER") {
          return this.#getDateValueFromGregorian(gregorianYear, gregorianMonth, 1, oldGregorianYear, oldGregorianMonth);
        }
        if (dateValidationResult.error == "INVALID_MIN_MONTH_NUMBER") {
          return this.#getDateValueFromGregorian(gregorianYear, 1, gregorianDay, oldGregorianYear, oldGregorianMonth);
        }
        if (dateValidationResult.error == "INVALID_MIN_YEAR_NUMBER") {
          return this.#getDateValueFromGregorian(1900, gregorianMonth, gregorianDay, oldGregorianYear, oldGregorianMonth);
        }
        if (dateValidationResult.error == "INVALID_MAX_DAY_NUMBER") {
          return this.#getDateValueFromGregorian(gregorianYear, gregorianMonth, 31, oldGregorianYear, oldGregorianMonth);
        }
        if (dateValidationResult.error == "INVALID_MAX_MONTH_NUMBER") {
          return this.#getDateValueFromGregorian(gregorianYear, 12, gregorianDay, oldGregorianYear, oldGregorianMonth);
        }
        if (dateValidationResult.error == "INVALID_MAX_YEAR_NUMBER") {
          return this.#getDateValueFromGregorian(9000, gregorianMonth, gregorianDay, oldGregorianYear, oldGregorianMonth);
        }
        if (dateValidationResult.error == "INVALID_DAY_IN_MONTH") {
          if (oldGregorianMonth != gregorianMonth && gregorianDay > 29) {
            //if we update to 30days month when day set to 31 we substrc day to 30 instead of prevent user from updating month
            return this.#getDateValueFromGregorian(gregorianYear, gregorianMonth, gregorianDay - 1, oldGregorianYear, oldGregorianMonth);
          }
        }
        if (dateValidationResult.error == "INVALID_DAY_FOR_LEAP") {
          //if it was leap year and calender go to next year in 30 esfand
          if (oldGregorianYear != gregorianYear && gregorianDay == 29) {
            //if we update year and prev year was kabiseh so new year cant update, we update day to 29 esfand and let user change year smootly without block
            return this.#getDateValueFromGregorian(gregorianYear, gregorianMonth, gregorianDay - 1, oldGregorianYear, oldGregorianMonth);
          }
        }
        return getEmptyValueObject();
      }
      const date = DateFactory.getDateFromGregorian(gregorianYear, gregorianMonth, gregorianDay);
      valueObject.gregorian = {
        year: getYear(date),
        month: getMonth(date) + 1,
        day: getDate(date)
      };
      valueObject.jalali = {
        year: getJalaliYear(date),
        month: getJalaliMonth(date) + 1,
        day: getJalaliDate(date)
      };
      valueObject.timeStamp = getTimeStamp(date);
      return valueObject;
    }
    #getDateValueFromJalali(jalaliYear: number, jalaliMonth: number, jalaliDay: number, oldJalaliYear: number | null, oldJalaliMonth: number | null): JBDateInputValueObject {
      const valueObject = getEmptyValueObject();
      const dateValidationResult = DateFactory.checkJalaliDateValidation(jalaliYear, jalaliMonth, jalaliDay);
      if (!dateValidationResult.isValid) {
        if (dateValidationResult.error == "INVALID_MIN_DAY_NUMBER") {
          return this.#getDateValueFromJalali(jalaliYear, jalaliMonth, 1, oldJalaliYear, oldJalaliMonth);
        }
        if (dateValidationResult.error == "INVALID_MIN_MONTH_NUMBER") {
          return this.#getDateValueFromJalali(jalaliYear, 1, jalaliDay, oldJalaliYear, oldJalaliMonth);
        }
        if (dateValidationResult.error == "INVALID_MIN_YEAR_NUMBER") {
          return this.#getDateValueFromJalali(1300, jalaliMonth, jalaliDay, oldJalaliYear, oldJalaliMonth);
        }
        if (dateValidationResult.error == "INVALID_MAX_DAY_NUMBER") {
          return this.#getDateValueFromJalali(jalaliYear, jalaliMonth, 31, oldJalaliYear, oldJalaliMonth);
        }
        if (dateValidationResult.error == "INVALID_MAX_MONTH_NUMBER") {
          return this.#getDateValueFromJalali(jalaliYear, 12, jalaliDay, oldJalaliYear, oldJalaliMonth);
        }
        if (dateValidationResult.error == "INVALID_MAX_YEAR_NUMBER") {
          return this.#getDateValueFromJalali(9999, jalaliMonth, jalaliDay, oldJalaliYear, oldJalaliMonth);
        }
        if (dateValidationResult.error == "INVALID_DAY_IN_MONTH") {
          if (oldJalaliMonth != jalaliMonth && jalaliDay == 31) {
            //if we update to 30days month when day set to 31 we substr day to 30 instead of prevent user from updating month
            return this.#getDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay - 1, oldJalaliYear, oldJalaliMonth);
          }
        }
        if (dateValidationResult.error == "INVALID_DAY_FOR_LEAP") {
          //if it was leap year and calender go to next year in 30 esfand
          if (oldJalaliYear != jalaliYear && jalaliDay == 30) {
            //if we update year and prev year was kabiseh so new year cant update, we update day to 39 esfand and let user change year smootly without block
            return this.#getDateValueFromJalali(jalaliYear, jalaliMonth, jalaliDay - 1, oldJalaliYear, oldJalaliMonth);
          }
        }
        return getEmptyValueObject();
      }
      const date = DateFactory.getDateFromJalali(jalaliYear, jalaliMonth, jalaliDay);
      valueObject.gregorian = {
        year: getYear(date),
        month: getMonth(date) + 1,
        day: getDate(date)
      };
      valueObject.jalali = {
        year: getJalaliYear(date),
        month: getJalaliMonth(date) + 1,
        day: getJalaliDate(date)
      };
      valueObject.timeStamp = getTimeStamp(date);
      return valueObject;
    }
    getDateObjectValueBaseOnFormat(valueString: string, format: string = this.#valueFormat): InputtedValueInObject {
      const res = DateFactory.#executeFormatAndExtractValue(valueString, format);
      const dateInObject: InputtedValueInObject = {
        year: null,
        month: null,
        day: null,
      };
      if (res && res.groups) {
        dateInObject.year = res.groups.year;
        dateInObject.month = res.groups.month;
        dateInObject.day = res.groups.day;
      }
      return dateInObject;
    }


    static #executeFormatAndExtractValue(value: string, format: string) {
      const regexString = format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
        .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
        .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
      const regex = new RegExp(regexString, 'g');
      const res = regex.exec(value);
      return res;
    }
    static getDate(year: number, month: number, day: number, inputType: InputType): Date {
      if (inputType == InputTypes.jalali) {
        return DateFactory.getDateFromJalali(year, month, day);
      }
      return DateFactory.getDateFromGregorian(year, month, day);
    }
    static getDateFromGregorian(year: number, month: number, day: number): Date {
      return new Date(year, month - 1, day);
    }
    static getDateFromJalali(year: number, month: number, day: number): Date {
      const date = newDate(year, month - 1, day);
      return date;
    }
    static getDateFromTimestamp(timestamp: number): Date {
      return new Date(timestamp);
    }
    static get todayGregorianYear(): number {
      return getYear(new Date());
    }
    static get todayJalaliYear(): number {
      const year = getJalaliYear(new Date());
      return year;
    }
    static get todayGregorianMonth(): number {
      return getMonth(new Date()) + 1;
    }
    static get todayJalaliMonth(): number {
      return getJalaliMonth(new Date()) + 1;
    }
}