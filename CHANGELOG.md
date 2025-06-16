# Changelog  

## [5.9.1] - 2025-06-16
### fixed:
- fix 30 day "esfand" type by checking leap lear in both type and set month

## [5.9.0] - 2025-06-05

### new features:
- add jsdoc to some public attribute and properties for more clarity.
### refactor:
- extract the validations and typing logic from component to stateless functions for next release plan of headless date input.
- refactor `beforeinput` events and move logic to the `utils`.
- remove `this` dependency from utils functions and make them stateless.

## [5.8.1] - 2025-05-21
### fixed:
- fix name assignment on react 19

## [5.8.0] - 2025-05-03
### new features:
- use jb-design-system  radius values 

## [5.7.0] - 2025-04-16
### Breaking changes:
- use jb-design-system color palette colors instead of internal color codes

## [5.6.0] - 2025-03-26
### new features:
- add `error` prop/attribute to show custom error message.
- add part name `input`,`calendar`,`popover` for date input parts for easier access for styling

## [5.5.0] - 2025-02-24
### fixed:
- fix `calendarDefaultDateView` when assigning input-type after ward.
- fix arrow key increase and decrease value by keyboard.
- fix calendar overflow in mobile browser with bottom navigation.
- fix time stamp value assignment bug

### new features:
- add `selectionStart`, `selectionEnd` and `setSelectionRange` methods and properties,

## [5.4.6] - 2025-02-14
### fixed:
- fix input type assignment in UMD modules

## [5.4.5] - 2025-02-13
### new features:
- add new Events like `onLoad`,`onInit`, `onInvalid`, `onInput`, `onBeforeInput`, `onKeyPress`, `onKeyDown` to react component & `beforeinput`, `input`, `keydown` to web component.
- add `jb-core` as a dependency to make all events following the new events standard.
- capture and silent input keyboard events to unify all keyboard events

## [5.3.0] - 2024-11-30
### Breaking changes:
- update jb-validation to support async validations.
### fixed:
- prevent keyboard from opening in mobile.
- fix click on background not close the picker.

## [5.2.0] - 2024-11-20
### new features
- make change event cancellable by `e.preventDefault()`.

## [5.1.0] - 2024-10-26
### new features
- add support for form tag compatibility and jb-form feature
- add isDirty to check if element value change since initial value set
- add time factors to object value and `Date` value to keep given date value time.

## [5.0.0] - 2024-7-2
### Breaking changes:
- refactor popover and separate it from inside popover to jb-popover web-component.
- refactor input and use jb-input instead of inner input code and handlers so all styles related to the input need to be refactored.
- change `use-persian-number` to `show-persian-number` to make all jb-design-system use the same names and approach. 
### new features
- better focus and caret pos handling
- less package size
- add br and gzip to package build file and add default minification to reduce loaded bundle size
- better typescript support
- better overflow handler

## [4.0.0] - 2024-7-2
### Breaking changes:
- refactor validation to standard jb design system validation tool
- change component file name from `JBDateInput` to `jb-date-input`
- disable overflow handler by default add add `overflowHandler` property so user can enable it when needed

## [3.13.2] - 2024-6-11
### fixed
- fix umd build

## [3.13.1] - 2024-6-11
### fixed
- fix value change on arrow key. move it from base on `valueType` to base on `inputType` due to month and day boundary validation

## [3.13.0] - 2024-2-19
### new features
- add `setMonthList` method to easily customize month names.

## [3.12.0] - 2024-2-7
### new features
- change `inputType` and `valuetype` from enum to pure string so it easily be used in other ts files without extra dep

## [3.11.1] - 2023-12-13
### new features
- fix `:dir(ltr)` bug of calendar

## [3.11.0] - 2023-11-12
### new features
- add Date to valid type for min & max date restriction input

## [3.10.0] - 2023-11-12
### new features
- add placeholder support when input is empty
## [3.9.2] - 2023-11-7
### fixed
- fix get Date value directly
## [3.9.0] - 2023-10-20
### new features
- add `Date` value support as a value input and output 
## [3.8.1] - 2023-9-8
### fixed
- fix useless margin and size reduction
## [3.8.0] - 2023-3-30
### new features
- make component compatible with native form element value getter. 
## [3.7.13] - 2023-3-30
### fixed
- fix calendar open and close problem #13 on calendar button clicked
## [3.7.12] - 2023-2-16
### fixed
- fix component problems with typescript
## [3.7.2] - 2023-2-16
### fixed
- export some missing type from component
## [3.7.0] - 2023-2-16
### new features
- update calendar to support swipe true direction in rtl pages
## [3.6.0] - 2023-2-16
### new features
- add swipe up gesture for year selection.
- add swipe down gesture for month selection.
- add font-weight effect on calender title hover for better UX, so user can see they are clickable.
## [3.5.0] - 2022-12-14
### new features
- add y overflow handler on desktop calendar picker container to swipe up when calendar was not completly on sight.
## [3.4.3] - 2022-11-02
### new features
- add `--jb-date-input-message-box-padding` and `--jb-date-input-message-box-text-align` and `--jb-date-input-message-box-font-weight` css variable
## [3.4.2] - 2022-11-02
### new features
- add `--jb-date-input-box-shadow-focus` and `--jb-date-input-input-margin` css variable
## [3.4.1] - 2022-11-02
### fixed
- import type problem  from jb-calendar
## [3.4.0] - 2022-09-10
### fixed
- use es builded npm module and treeshaker for umd dependancies
## [3.3.0] - 2022-09-10
### new features
- add UMD build in dist folder for non npm user
## [3.2.0] - 2022-03-29
### new features
- now `use-persian-number` attribute will chnage input number char tp persian format
## [3.1.0] - 2022-03-26
### new features
- add `use-persian-number` attribute
## [3.0.0] - 2022-03-20
### changed
 - refactor all date related functions from `dayjs` to `date-fns`

## [2.4.0] - 2022-03-20

### new features
- now support persian number and let user type number in persian format and dont prevent user with persian keyboard
### changed
 - refactor date based function and move them to date factory
 - move format single source of truth to date factory

### fixed
- prevent some typing mistake for day and month
- fix paste functionality and controll pasted value as well as typed value
## [2.3.0] - 2022-03-03

### new features
- make calendar pop-up more mobile friendly by making it open overly
## [2.2.0] - 2022-03-02
### new features
- add default date for calendar in date input empty state with `setCalendarDefaultDateView`
### changed
 - refactor date based function and move them to date factory
 - move input-type single source of truth to date factory
## [2.1.0] - 2022-02-24
### changed
 - refactor date based function and move them to date factory
 - change date restrictions from `DayJs` format to `Date`

