# jb-date-input React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-date-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-date-input)](https://www.npmjs.com/package/jb-date-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-date-input)

React component date input (picker) to get date (jalali & gregorian) from user.
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

```sh
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
 <JBDateInput label="start date"  max={today} />
 //or using string
 <JBDateInput label="start day" value="2020-08-10T08:51:23.176Z" min="2020-08-05T08:51:23.176Z" max="2020-08-15T08:51:23.176Z" />
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

## Slots

You can easily change calendar icon or put your own custom HTML content into input box.    
See [Slots](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput-slots--docs) for demo and code in React

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

## using headless

you can use `jb-date-input` headless functions to bring `jb-date-input` features to your own component.
for doing so you just have to import `useJBDateInput` and bind your input events and use them:      
**[See Sample and  Implement Document Here](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput-headless--docs)**
```
if you want more control over your component you can use native headless utils function of `jb-date-input` build your own custom hook.


## Other Related Docs:

- see [jb-date-input](https://github.com/javadbat/jb-date-input) if you want to use this component as a web-component

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.