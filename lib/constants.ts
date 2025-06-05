export const emptyInputValueString = '    /  /  ';
/**
 * format of your input date strings. it effects value, min & max or other value that provides in string type to the component.
 */
export const inputFormat = 'YYYY/MM/DD';
export const inputRegex = /^(?<year>[\u06F0-\u06F90-9,\s]{4})\/(?<month>[\u06F0-\u06F90-9,\s]{2})\/(?<day>[\u06F0-\u06F90-9,\s]{2})$/g

export const dictionary = {
  errors: {
    minRangeViolation: 'تاریخ انتخابی کمتر از بازه مجاز است',
    maxRangeViolation: 'تاریخ انتخابی بیشتر از بازه مجاز است',
    required:'لطفا مقدار تاریخ را کامل وارد کنید',
  }
}