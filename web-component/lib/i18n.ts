import {JBDictionary} from 'jb-core/i18n';
export type JBDateInputDictionary = {
  minRangeViolation:string,
  maxRangeViolation:string,
  required:string
}

/**
 * dictionary of jb date input input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-date-input'
 * dictionary.setLanguage("fr", {
 *  requireMessage: (label:string| null)=>`${label} french require message`,
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBDateInputDictionary>({
  "fa":{
    minRangeViolation: 'تاریخ انتخابی کمتر از بازه مجاز است',
    maxRangeViolation: 'تاریخ انتخابی بیشتر از بازه مجاز است',
    required:'لطفا مقدار تاریخ را کامل وارد کنید',
  },
  "en":{
    minRangeViolation:"Your selected date is before valid date range",
    maxRangeViolation:"Your selected date is after valid date range",
    required:"Please fill date completely"
  }
});