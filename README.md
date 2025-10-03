# jb-date-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-date-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-date-input)](https://www.npmjs.com/package/jb-date-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-date-input)

## Pure js Jalali Date Picker Web-Component

web component date input (picker) to get date (jalali & gregorian) from user.

- support jalali date as well as gregorian date

- support keyboard arrow key and fast date input with keyboard

- 💅customizable style with css variables

- can set min and max date value

- web component so it can be used in every framework and even pure-js project

- responsive and mobile friendly (support swipe in touch devices and handle virtual keyboard)

- support typescript

- good typing experience for desktop user

- has headless module so you can use it with any input [read more](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput-readme--docs#headless-usage)

- have 3 value type so you can get inputted value in gregorian, jalali or timestamp base on your project need

- customizable value format so you can get your value in standard iso format or custom format like `1400/12/08` or `1400_12_08`

- support `esm` import build for modern `ECMA Script` nodejs app.

- compatible with native HTML `form` element to send data to server.

- support multi-language and i18n see [jb design system getting starting guidance](https://javadbat.github.io/design-system/?path=/docs/getting-started-introduction--docs)

## Demo & Sample:    

- [github pages](https://javadbat.github.io/jb-date-input/)
- [codepen](https://codepen.io/javadbat/pen/qBRyYKY)
- [storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput)

## using with JS frameworks

- [<img src="https://img.shields.io/badge/jb--date--input/react-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-date-input/tree/main/react)

## instructions

### getting started

#### using npm

1- install package:

```sh
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

beware that jb-date-input umd build do not exclude external dependency and bundled as a standalone module, so only use this way if you dont access npm in your app.   

1- you can just add script tag to your html file and then use web component how ever you need.    

```HTML
<script src="https://unpkg.com/jb-date-input/dist/JBDateInput.umd.js"></script>
```
2- use it in your `.html` file like any other tag:

```HTML
<jb-date-input label="date label"></jb-date-input>
```
## format

default format of date input is 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' that compatible and exact format of `new Date().toISOString()`
you can change it however you need and `[Z]` mean the exact Z character that used in ISO standard format `YYYY-MM-DDTHH:mm:ss.SSSZ[Z]` => `2012-06-21T00:00:00.000+3:30Z`
you can change format by format attribute:

```html

<jb-date-input label="date" format="YYYY/MM/DD" value="2020/08/14"></jb-date-input>

```

## Value Type

we have 3 value type:

```html
    <jb-date-input value="2020-08-01T14:05:39.530Z" value-type="GREGORIAN"/>
    <jb-date-input value="1596291030322" value-type="TIME_STAMP"/>
    <jb-date-input value="1399-05-01T12:05:39.530Z" value-type="JALALI"/>
```

by setting value type you can tell component what type of value you providing to it and expecting from it. remember that value type is not effect input type, for example user input jalali date but you will get gregorian date when call `e.target.value`. you can also provide and get js `Date` type for more performance if you like see "get value" section for get and for set just set value like: `element.value = new Date()`.

## min and max date limit

you can set minimum date and maximum date range for your date input in 2 way:    

1- by html attribute in string format of your value

```html
 <jb-date-input label="تاریخ شروع " value="2020-08-10T08:51:23.176Z" min="2020-08-05T08:51:23.176Z" max="2020-08-15T08:51:23.176Z">
 </jb-date-input>
```
2- by call `setMinDate` and `setMaxDate` function and providing string or Date format:

```javascript
const today = new Date();
document.querySelector('jb-date-input').setMinDate(today)
const max = new Date('2022-08-15T08:51:23.176Z');
document.querySelector('jb-date-input').setMaxDate(max);
// or string
document.querySelector('jb-date-input').setMinDate('2022-08-15T08:51:23.176Z');

```
## placeholder

you can set placeholder to show it to user when input is empty. to doing so just set `placeholder` attribute in HTML DOM or `placeholder` in JavaScript: 

```html
 <jb-date-input placeholder="Enter Date Here">
 </jb-date-input>
```
```js
document.querySelector('jb-date-input').placeholder = `Enter Date Here`;
```
## custom validation

beside of min and max you can also set your own custom validation like any other jb web components family to achieve this you must create a array of validations and assign them to component

```js
const validationList = [
        {
            validator:/^13.*$/g,
            message:'date must be in 13 century'
        },
        {
            validator:({text, inputObject, valueObject, valueText})=>{
                //you can use raw imputed text or formatted text in expected value in arguments
                //you have access to both jalali and gregorian date object here in valueObject
                //inputObject is a object contain imputed day & month & year unprocessed base on format so it have value before date imputed completely
                // remember valueObject and valueText are both empty and null when date is incomplete
                //if you want to validate incomplete date you can use inputText
                return valueObject.jalali.day == 15;
            },
            message:'you can only choose 15th day of month'
        }
];
document.querySelector('jb-date-input').validation.list = validationList
```


remember your min and max date must be in the same format and valueType of your value.
to trigger validation and check is the element has a valid value:

```js
// if show error was false, in case of error component dont show error itself and function will return if data valid or not
const showError = true
const validationObj = dom.validation.checkValidity({showError})
```

## events

```js
//when default property are defined best time for impl your config like min and max date
document.querySelector('jb-date-input').addEventListener('init',this.onCalendarElementInitiated);

//when calendar init all property and function and dom created and bind successfully
document.querySelector('jb-date-input').addEventListener('load',this.onCalendarElementLoaded);
document.querySelector('jb-date-input').addEventListener('change',(e)=>{
    //value in string
    console.log(e.target.value)
    //value in js Date object
    console.log(e.target.valueInDate)
});
```

## date input type

jb-calendar support both jalali and gregorian(Miladi) calendar input type. like value-type that let you determine how you want to provide/expect data to/from jb-date-input you can specify how user must fill the date input.
to achieve this you have to set `input-type` attribute or set `inputType` object to component dom directly.
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

## set default date for calendar when opened

when date input value is empty we show today year and month in opened calendar by default but you can change it to another date. for example you want user fill they birthdate you can set it to 20 years ago so user can pick his/her birthday easier and faster. to doing so all you have to do is to use `setCalendarDefaultDateView`function like this:

```javascript
const year = 1360
const month = 5
//just set year and month for current input-type date type
document.querySelector('jb-date-input').setCalendarDefaultDateView(year,month);
//set default year and month for gregorian input-type
document.querySelector('jb-date-input').setCalendarDefaultDateView(year,month,'GREGORIAN');
//set default year and month for jalali input-type
document.querySelector('jb-date-input').setCalendarDefaultDateView(year,month,'JALALI');
```
## get value
you can get the selected date by using following method:
```javascript
    // return string value base on your provided format and value type
    document.querySelector('jb-date-input').value   

    // return javascript Date value (or null)
    document.querySelector('jb-date-input').valueInDate

```
note that providing & getting value with `Date` is faster and more performant than using value string


## show persian number
if you want to show persian number instead of English number char you just have to set `show-persian-number` attribute like this:
```javascript
<jb-date-input show-persian-number></jb-date-input >
//or
<jb-date-input show-persian-number="true"></jb-date-input >
```
## customize calendar button trigger

you can change calendar icon base on your own need to doing so you just have to put your custom html inside web component with `slot="calendar-trigger-icon"` like below:

```html
<jb-date-input >
        <div slot="calendar-trigger-icon">
            <!-- sample calendar svg to show in the box -->
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 610.398 610.398">
                <g>
                    <g>
                        <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052    c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553    V35.544V24.992C180.791,11.188,171.291,0,159.567,0z" />
                        <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992    h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z" />
                        <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117    V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818    c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764    V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z" />
                        <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017    c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z" />
                        <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017    c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z" />
                        <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017    c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z" />
                        <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017    c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z" />
                        <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032    c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z" />
                        <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032    c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z" />
                        <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032    c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z" />
                        <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032    c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z" />
                    </g>
                </g>
            </svg>
        </div>
    </jb-date-input>
```

## Change Month List
you may want to change the default month list for both  of Jalali and Gregorian calendars base on your country month labels. here how you can do it:
```js
document.querySelector('jb-date-input').setMonthList('JALALI',['حَمَل','ثَور','جَوزا','سَرَطان','اَسَد','سُنبُله','میزان','عَقرَب','قَوس','جَدْی','دَلو','حوت']);
document.querySelector('jb-date-input').setMonthList('GREGORIAN',['1','2','3','4','5','6','7','8','9','10','11','12']);
```
## overflow handler

sometimes you place date input inside modal or end of the pages so when user open the input picker it overflow the page and some part of picker will be invisible.  
to fix this we add a feature called `overflowHandler` by set this to `SLIDE` the picker will move, on mouse enter it's territory so user can easily pick date
```js
document.querySelector('jb-date-input').elements.popover.overflowHandler = "SLIDE"
```
## set custom style

in some cases in your project you need to change default style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component.
#### usage example:

```css
body{
/* if you need more margin */
  --jb-date-input-margin: 16px 32px;
/* if you dont want rounded corner */
  --jb-input-border-radius:0px;
/* if you want different text color*/
  --jb-input-value-color:red;
}
```

you can customize jb-date-input look  by setting css variable in your app.    
jb-date-input use [jb-input](https://github.com/javadbat/jb-input) and [jb-calendar](https://github.com/javadbat/jb-calendar) and [jb-popover](https://github.com/javadbat/jb-popover) underneath so to change the styles of your component read custom style section of these components and set their css variable.    
more than above here is the css variable that we use in jb-date-input itself:    

#### variable list
 
| css variable name                             | description                                                               |
| -------------                                 | -------------                                                             |
| --jb-date-input-margin                        | web-component margin default is `0 0`                                     |
| --jb-date-input-calendar-trigger-display      | set it no none to hide calendar icon                                      |
| --jb-date-input-calendar-trigger-width        | set calendar icon width                                                   |
| --jb-date-input-calendar-trigger-height       | set calendar icon height                                                  |
| --jb-date-input-calendar-icon-color           | calendar icon color                                                       |
| --jb-date-input-calendar-icon-color-active    | calendar icon color when calendar is open                                 |

## add custom element in input box

in jb-input you can put icon or any other custom html DOM in input box. to doing so you just have to place custom DOM in `jb-date-input` tag and add `slot="start-section"` or `slot="end-section"` to place it before or after input field.
example:

```HTML
<jb-date-input>
    <div slot="end-section">after</div>
    <div slot="start-section">before</div>
</jb-date-input>
```

## Headless usage:
you can use `jb-date-input` headless functions to bring `jb-date-input` features to your own component.
for doing so you just have to import some utils function and bind your input events and use them:    

```javascript
import {handleBeforeInput,emptyInputValueString} from 'jb-date-input';

const input = document.querySelector('input');
// first make sure you input default value is emptyInputValueString value.
input.value = emptyInputValueString
// this will help you to control what user can type in input field
input.addEventListener('beforeinput',(e)=>{
    const beforeInputRes = handleBeforeInput({
      dateInputType: 'JALALI',
      //make it true if you want to see persian number char
      showPersianNumber: false,
      //current value before new input happen
      value: e.target.value,
      selection: {
        start: e.target.selectionStart,
        end: e.target.selectionEnd,
      },
      event: {
        data: e.data,
        inputType: e.inputType,
      },
    });
    e.preventDefault();
    input.value = beforeInputRes.value;
    input.setSelectionRange(beforeInputRes.selectionStart,beforeInputRes.selectionEnd);
});
// manage caret pos for when user click and focus on the input. it will stick the caret to the last typed char and skip empty value
// use this function in `click`. `focus` , `selectionchange`,... event base on your needs.
const newCaretPos = getFixedCaretPos({inputValue:input.value,selectionStart:input.selectionStart});
if (newCaretPos !== null) {
    input.setSelectionRange(newCaretPos, newCaretPos);
}
```

## Other Related Docs:

- see [`jb-date-input/react`](https://github.com/javadbat/jb-date-input/tree/main/react); if you want to use this component in react

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.