# jb-date-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-date-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/master/LICENSE)

web component form element to get date from user

- support jalali date as well as gregorian date

- support keyboard arrow key and fast date input with keyboard

- customizable style with css variable

- can set min and max date value

- web component so it can be used in every framework and even purejs project

sample: <https://codepen.io/javadbat/pen/qBRyYKY>

## instructions

### getting started

#### using npm

1- install package:

```command
npm i jb-date-input
```

2- import package in one of your `.js` file:

```js
import 'jb-date-input';
```

3- use it in your `.html` file like any other tag:

```HTML
<jb-date-input label="date label"></jb-date-input>
```

#### using cdn

you can just add script tag to your html file and then use web component how ever you need

```HTML
<script src="https://unpkg.com/jb-date-input"></script>
<script src="https://unpkg.com/jb-calendar"></script>

```

### format

defualt format of date input is 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' that compatible and exact format of `new Date().toISOString()`
you can change it however you need and `[Z]` mean the exact Z charecter that used in ISO standard format `YYYY-MM-DDTHH:mm:ss.SSSZ[Z]` => `2012-06-21T00:00:00.000+3:30Z`
you can change format by format attribute:

```html

<jb-date-input label="تاریخ" format="YYYY/MM/DD" value="2020/08/14"></jb-date-input>

```

### valueType

we have 3 value type:

```html
    <jb-date-input value="2020-08-01T14:05:39.530Z" valueType="GREGORIAN"/>
    <jb-date-input value="1596291030322" valueType="TIME_STAMP"/>
    <jb-date-input value="1399-05-01T12:05:39.530Z" valueType="JALALI"/>
```

### min and max date limit

you can set minimum date and maximum date range for your app 

```html
 <jb-date-input label="تاریخ شروع " value="2020-08-10T08:51:23.176Z" min="2020-08-05T08:51:23.176Z" max="2020-08-15T08:51:23.176Z">
 </jb-date-input>
```

remember your min and max date must be in the same format and valueType of your value.
to trigger validation and check is the element has a valid value:

```js
// if show error was false, in case of error component dont show error itself and function will return if data valid or not
const showError = true
const validationObj = dom.triggerInputValidation(showError)
```

### events

```js
//when defualt property are defined best time for impl your config like min and max date
document.querySelector('jb-date-input').addEventListener('init',this.onCalendarElementInitiated);

//when calendar init all property and function and dom created and bind successully
document.querySelector('jb-date-input').addEventListener('load',this.onCalendarElementLoaded);
```

### date input type

jb-calendar support both jalali and gregorian(miladi) calendar input type. like value-type that let you determine how you want to provide/expect data to/from jb-date-input you can specify how user must fill the date input.
to achive this you have to set `input-type` attribute or set `inputType` object to component dom directly.
to set it as attribute you can set value like this:

```HTML
<jb-date-input input-type="GREGORIAN"></jb-date-input>
<jb-date-input input-type="JALALI"></jb-date-input>
```

and for doing it with direct DOM assignment you can use following js code:

```js
//to show gregorian calendar
document.querySelector('jb-date-input').inputType = "GREGORIAN" 
document.querySelector('jb-date-input').inputType = "JALALI"
```

### set custom style

in some cases in your project you need to change defualt style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component 
| css variable name                       | description                                                                                   |
| -------------                           | -------------                                                                                 |
| --jb-date-input-margin                  | web-component margin defualt is `0 12px`                                                      |
| --jb-date-input-border-radius           | web-component border-radius defualt is `16px`                                                 |
| --jb-date-input-border-color            | border color of select in normal mode                                                         |
| --jb-date-input-border-color-focus      | border color when user focus on input                                                         |
| --jb-date-input-bgcolor                 | background color of input                                                                     |
| --jb-date-input-message-box-display     | defualt is block but if you set it to none message box will be hidden                         |
| --jb-date-input-text-align              | text align of input                                                                           |
