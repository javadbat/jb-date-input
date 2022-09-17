# jb-date-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-date-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/master/LICENSE)
![NPM Downloads](https://img.shields.io/npm/dw/jb-date-input)
![NPM License](https://img.shields.io/npm/l/jb-date-input)
![npm](https://img.shields.io/npm/v/jb-date-input)

web component form element to get date from user

- support jalali date as well as gregorian date

- support keyboard arrow key and fast date input with keyboard

- customizable style with css variables

- can set min and max date value

- web component so it can be used in every framework and even purejs project

- responsive and mobile friendly (support swipe in touch devices and handle virtual keyboard)

- support typescript

- good typing experience for desktop user

- it use your page font by default. 

- have 3 value type so you can get inputed value in gregorian, jalali or timestamp base on your project need

- customizable value format so you can get your value in standard iso format or custom format like `1400/12/08` or `1400_12_08`

- support `esm` import build for modern `ECMA Script` nodejs app. 

Demo & Sample in codepen: <https://codepen.io/javadbat/pen/qBRyYKY>

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
remember if you are using it in a `ltr`(left to right) direction page you must set `dir="ltr"`.
#### using cdn

beware that jb-date-input umd build do not exclude external dependancy and bundled as a standalone module, so only use this way if you dont access npm in your app.   

1- you can just add script tag to your html file and then use web component how ever you need.    

```HTML
<script src="https://unpkg.com/jb-date-input/dist/JBDateInput.umd.js"></script>
```
2- use it in your `.html` file like any other tag:

```HTML
<jb-date-input label="date label"></jb-date-input>
```
## format

defualt format of date input is 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' that compatible and exact format of `new Date().toISOString()`
you can change it however you need and `[Z]` mean the exact Z charecter that used in ISO standard format `YYYY-MM-DDTHH:mm:ss.SSSZ[Z]` => `2012-06-21T00:00:00.000+3:30Z`
you can change format by format attribute:

```html

<jb-date-input label="تاریخ" format="YYYY/MM/DD" value="2020/08/14"></jb-date-input>

```

## valueType

we have 3 value type:

```html
    <jb-date-input value="2020-08-01T14:05:39.530Z" valueType="GREGORIAN"/>
    <jb-date-input value="1596291030322" valueType="TIME_STAMP"/>
    <jb-date-input value="1399-05-01T12:05:39.530Z" valueType="JALALI"/>
```

## min and max date limit

you can set minimum date and maximum date range for your app 

```html
 <jb-date-input label="تاریخ شروع " value="2020-08-10T08:51:23.176Z" min="2020-08-05T08:51:23.176Z" max="2020-08-15T08:51:23.176Z">
 </jb-date-input>
```
## custom validation

beside of min and max you can also set your own custom validation like any other jb web components family to achive this you must create a array of validations and assign them to component

```js
const validationList = [
        {
            validator:/^13.*$/g,
            message:'تاریخ باید تنها در قرن 13 شمسی باشد'
        },
        {
            validator:(inputedText, valueObject, valueText)=>{
                //you can use raw inputed text or formatted text in expected value in argumants
                //you have access to both jalali and gregorian date object here
                // rememmber valueObject and valueText are both empty and null when date is incomplete
                return valueObject.jalali.day == 15;
            },
            message:'باید تاریخ حتما  15 ماه انتخاب شود'
        }
];
document.querySelector('jb-date-input').validationList = validationList
```


remember your min and max date must be in the same format and valueType of your value.
to trigger validation and check is the element has a valid value:

```js
// if show error was false, in case of error component dont show error itself and function will return if data valid or not
const showError = true
const validationObj = dom.triggerInputValidation(showError)
```

## events

```js
//when defualt property are defined best time for impl your config like min and max date
document.querySelector('jb-date-input').addEventListener('init',this.onCalendarElementInitiated);

//when calendar init all property and function and dom created and bind successully
document.querySelector('jb-date-input').addEventListener('load',this.onCalendarElementLoaded);
```

## date input type

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
## show persian number
if you want to show persian number instead of English number char you just have to set `use-persian-number` attribute like this:
```javascript
<jb-date-input use-persian-number></jb-date-input >
//or
<jb-date-input use-persian-number="true"></jb-date-input >
```
## customize calendar button trigger

you can change calendar icon base on your own need to doing so you just have to put your custom html inside web component with `slot="calendar-trigger-icon"` like below:

```html
<jb-date-input >
        <div slot="calendar-trigger-icon">
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
## set custom style

in some cases in your project you need to change defualt style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component.
#### usage example:

```css
body{
/* if you need more margin */
  --jb-date-input-margin: 16px 32px;
/* if you dont want rounded corner */
  --jb-date-input-border-radius:0px;
/* if you want different text color*/
  --jb-date-input-value-color:red;
}
```
#### variable list
 
| css variable name                             | description                                                                                   |
| -------------                                 | -------------                                                                                 |
| --jb-date-input-margin                        | web-component margin defualt is `0 12px`                                                      |
| --jb-date-input-border-radius                 | web-component border-radius defualt is `16px`                                                 |
| --jb-date-input-border-color                  | border color of select in normal mode                                                         |
| --jb-date-input-border-color-focus            | border color when user focus on input                                                         |
| --jb-date-input-bgcolor                       | background color of input                                                                     |
| --jb-date-input-message-box-display           | defualt is block but if you set it to none message box will be hidden                         |
| --jb-date-input-message-box-color             | change color of message under box                                                             | 
| --jb-date-input-message-box-color-error       | change color of message under box                                                             | 
| --jb-date-input-text-align                    | text align of input                                                                           |
| --jb-date-input-box-height                    | height of input box                                                                           |
| --jb-date-input-border-width                  | general border width defualt is `1px`                                                         |
| --jb-date-input-border-bottom-width           | border bottom width defualt is `3px`                                                          |
| --jb-date-input-label-font-size               | font size of date input label defualt is `0.8em`                                              |
| --jb-date-input-label-weight                  | label font-weight default is normal                                                           |
| --jb-date-input-placeholder-color             | input placeholder color default is `initial`                                                  |
| --jb-date-input-placeholder-font-size         | place holder font size default is `1.1em`                                                     |
| --jb-date-input-value-color                   | date input value color default is `#1f1735`                                                   |
| --jb-date-input-value-font-size               | date input value font-size                                                                    |
| --jb-date-input-calender-wrapper-bg-color     | calender background color default color is `#fff`                                             |
| --jb-date-input-calendar-wrapper-z-index      | opend calendar `z-index` is `10` but you can change it to number you want                     |
| --jb-date-input-calender-wrapper-border-radius| calendar border radius defualt is `24px`                                                      |

if you want to change opened date picker style please read [jb-calendar](https://github.com/javadbat/jb-calendar) readme file  
## add custom element in input box

in jb-input you can put icon or any other custom html DOM in input box. to doing so you just have to place custom DOM in `jb-date-input` tag and add `slot="start-section"` or `slot="end-section"` to place it before or after input field.
for better result i suggest you use `jb-date-input-inbox-element` tag but its optional and you can use your own custom tag too.
`jb-input-inbox-element` will add some style to make sure your icon will place in center and will not overflow nad make your job easier if you want more controll you can skip it and use your own tag.
example:

```HTML
<jb-date-input>
    <jb-date-input-inbox-element slot="end-section">
        <div>after</div>
    </jb-date-input-inbox-element>
    <jb-date-input-inbox-element slot="start-section">
        <div>before</div>
    </jb-date-input-inbox-element>
</jb-date-input>
```