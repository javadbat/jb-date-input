#changelog
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

