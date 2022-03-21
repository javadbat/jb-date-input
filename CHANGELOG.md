#changelog
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

