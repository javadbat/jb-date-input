# jb-date-input React component

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dw/jb-date-input)](https://www.npmjs.com/package/jb-date-input)

react component date input (picker) to get date (jalali & gregorian) from user.
this component is a simple react component that use [jb-date-input](https://github.com/javadbat/jb-date-input) inside and its just a simple wrapper for it so i suggest you to read jb-date-input document too, it has more complete & updated document.    

- support jalali date as well as gregorian date

- support keyboard arrow key and fast date input with keyboard

- customizable style with css variables

- can set min and max date value

- web component so it can be used in every framework and even pure-js project

- responsive and mobile friendly (support swipe in touch devices and handle virtual keyboard)

- support typescript

- good typing experience for desktop user

- it use your page font by default.

- customizable month names so you can change it for afghan or any other locals

- have 3 value type so you can get inputted value in gregorian, jalali or timestamp base on your project need

- customizable value format so you can get your value in standard iso format or custom format like `1400/12/08` or `1400_12_08`

- support `esm` import build for modern `ECMA Script` nodejs app. 

Demo:

[codeSandbox preview](https://3f63dj.csb.app/samples/jb-date-input) for just see the demo
[codeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBDateInput.tsx) if you want to see and play with code
[storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput) for a complete show case


## getting started

1- install package:

```bash
npm i jb-date-input
```

2- import package in your jsx file:

```js
import {JBDateInput} from 'jb-date-input/react';
```

3- use it in your jsx file like any other tag:

```jsx
<JBDateInput label="date label"></JBDateInput>
```

## format

default format of date input is 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' that compatible and exact format of `new Date().toISOString()`
you can change it however you need and `[Z]` mean the exact Z character that used in ISO standard format `YYYY-MM-DDTHH:mm:ss.SSSZ[Z]` => `2012-06-21T00:00:00.000+3:30Z`
you can change format by format attribute:

```jsx
<JBDateInput label="label" format="YYYY/MM/DD" value="2020/08/14"></JBDateInput>
```

## valueType

we have 3 value type:

```jsx
    <JBDateInput value="2020-08-01T14:05:39.530Z" valueType="GREGORIAN"/>
    <JBDateInput value="1596291030322" valueType="TIME_STAMP"/>
    <JBDateInput value="1399-05-01T12:05:39.530Z" valueType="JALALI"/>
```

## min and max date limit

you can set minimum date and maximum date range for your app in string or Date type

```jsx
 const today = new Date();
 <JBDateInput label="تاریخ شروع "  max={today} />
 //or using string
 <JBDateInput label="تاریخ شروع " value="2020-08-10T08:51:23.176Z" min="2020-08-05T08:51:23.176Z" max="2020-08-15T08:51:23.176Z" />
```
## placeholder

you can set placeholder to show it to user when input is empty. to doing so just set `placeholder` attribute in JSX DOM: 

```jsx
 <JBDateInput placeholder="Enter Date Here" />
```
## custom validation

beside of min and max you can also set your own custom validation like any other jb react components family to achieve this, you must create a array of validations and pass it to validationList props.

```jsx
const validationList = [
        {
            validator:/^13.*$/g,
            message:'تاریخ باید تنها در قرن 13 شمسی باشد'
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
            message:'باید تاریخ حتما  15 ماه انتخاب شود'
        }
    <JBDateInput validationList={validationList}></JBDateInput>
];
    
```

```jsx
```

you can also pass your own error message to show as an error under the input field:

```jsx
    <JBDateInput error="your error message"></JBDateInput>
```

remember your min and max date must be in the same format and valueType of your value.
to trigger validation and check is the element has a valid value:

```jsx
const MyForm = (props) => {
    const dateElementRef = useRef(null);
    const [validationResult, setValidationResult] = useState();
    return(
        <div>
            <JBDateInput ref={dateElementRef}></JBDateInput>
            {/*report validity will show error to user and return validation result*/}
            <button onClick={()=>{setValidationResult(dateElementRef.current.reportValidity())}}>check and show validation error</button>
            {/*check validity will just return validation result and user wont see the error(good for some background check for button activation,...)*/}
            <button onClick={()=>{setValidationResult(dateElementRef.current.checkValidity(false))}}>check validation</button>
        </div>
        )
    };

```

## events

we support most normal input events + `onSelect`, `onEnter` events.

```jsx
    //when user select a date in picker
    <JBDateInput onSelect={(event) => {console.log(event.target.value)}}></JBDateInput>
    //when user hit enter button
    <JBDateInput onEnter={(event) => {console.log(event.target.value)}}></JBDateInput>
    //onChange in JBDate input follow the JS onChange standard and not react OnChange if you want something similar to react onChange use `onInput` event
    <JBDateInput onChange={(event) => {console.log(event.target.value)}}></JBDateInput>
    <JBDateInput onInput={(event) => {console.log(event.target.value)}}></JBDateInput>
    <JBDateInput onKeyUp={(event) => {console.log(event.target.value)}}></JBDateInput>
```

## date input type

jb-date-input support both jalali and gregorian(milady) calendar input type. like value-type that let you determine how you want to provide/expect data to/from JBDateInput you can specify how user must fill the date input.
to achieve this you have to set `inputType` props or set `inputType` object to component  directly using your elements ref.
to set it as props you can set value like this:

```jsx
<JBDateInput inputType="GREGORIAN"></JBDateInput>
<JBDateInput inputType="JALALI"></JBDateInput>
```
and for doing it with direct DOM assignment you can use following js code:

```js
//to show gregorian calendar
const elementRef =  React.createRef();
//set ref to element ...
elementRef.current.inputType = "GREGORIAN" 
elementRef.current.inputType = "JALALI"
```
## set default date for calendar when opened

when date input value is empty we show today year and month in opened calendar by default but you can change it to another date. for example you want user fill they birthdate you can set it to 20 years ago so user can pick his/her birthday easier and faster. to doing so all you have to do is to use `calendarDefaultDateView`function like this:

```jsx
<JBDateInput inputType="JALALI" calendarDefaultDateView={{year:1350, month:3}}></JBDateInput>
```
## show persian number
if you want to show persian number instead of English number char you just have to set `showPersianNumber` prop like this:
```jsx
<JBDateInput showPersianNumber={true}></JBDateInput>
```
## customize calendar button trigger

you can change calendar icon base on your own need to doing so you just have to put your custom html inside the react component with `slot="calendar-trigger-icon"` like below:

```jsx
<JBDateInput >
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
    </JBDateInput>
```
## Change Month List

you may want to change the default month list for both  of Jalali and Gregorian calendars base on your country month labels. here how you can do it:   

```jsx
document.querySelector('jb-date-input').setMonthList('GREGORIAN',['1','2','3','4','5','6','7','8','9','10','11','12']);
// for afghanistan month list 
<JBDateInput jalaliMonthList={['حَمَل','ثَور','جَوزا','سَرَطان','اَسَد','سُنبُله','میزان','عَقرَب','قَوس','جَدْی','دَلو','حوت']}></JBDateInput>
<JBDateInput gregorianMonthList={['1','2','3','4','5','6','7','8','9','10','11','12']}></JBDateInput>
```
## overflow handler

sometimes you place date input inside modal or end of the pages so when user open the input picker it overflow the page and some part of picker will be invisible.  
to fix this we add a feature called `overflowHandler` by set this to `SLIDE` the picker will move, on mouse enter it's territory so user can easily pick date

```jsx
<JBDateInput overflowHandler="SLIDE" />
//if you want to check your overflow base on another dom and not window for example when you put date input in a modal
<div ref={ref} style={{ height: "12rem", border: "solid 1px #666", overflow:"hidden" }}>
    <JBDateInput {...args} overflowRef={ref} />
</div>
```

### set custom style

in some cases in your project you need to change default style of react-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this react-component all you need is to set css variable in parent scope of react-component.    
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
#### variable list
if you want the full variable list read [jb-date-input](https://github.com/javadbat/jb-date-input) doc for more updated list of styles and css variables.


## add custom element in input box

in jb-input you can put icon or any other custom html DOM in input box. to doing so you just have to place custom element in `JBDateInput` tag and add `slot="start-section"` or `slot="end-section"` to place it before or after input field.
```jsx
<JBDateInput>
  <div slot="end-section">after</div>
  <div slot="start-section">before</div>
</JBDateInput>
```
## using headless
you can use `jb-date-input/react` headless functions to bring `jb-date-input` features to your own input.
for doing so you just have to import `useJBDateInput` and bind your input events and use them:

```jsx
  import { useJBDateInput } from "jb-date-input/react";


  const ref = useRef<HTMLInputElement>(null);
  const {value, onChange, onClick, onFocus, setValue} = useJBDateInput({dateInputType:"JALALI",ref,showPersianNumber:false})
  return(
    <input ref={ref} value={value} onChange={onChange} onClick={onClick} onFocus={onFocus}/>
  )
```

if you want more control over your component you can use native headless utils function of `jb-date-input` build your own custom hook.


## Other Related Docs:

- see [jb-date-input](https://github.com/javadbat/jb-date-input) if you want to use this component as a web-component

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.