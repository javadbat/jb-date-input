# jb-date-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-date-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-date-input)](https://www.npmjs.com/package/jb-date-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-date-input)

`jb-date-input` is a form-associated Jalali and Gregorian date input web component with a typed input surface and a calendar popover.

- Supports Jalali and Gregorian input.
- Supports fast keyboard typing and ArrowUp/ArrowDown date-part changes.
- Opens a responsive, mobile-friendly calendar picker.
- Accepts Persian digits and can display Persian digits while keeping `.value` in English digits.
- Supports `min` and `max` date limits.
- Supports native HTML form submission through `ElementInternals`.
- Supports custom validation through `jb-validation`.
- Supports value output as Gregorian, Jalali, or timestamp.
- Supports custom value formats such as ISO strings, `YYYY/MM/DD`, or `YYYY_MM_DD`.
- Supports custom month names for Jalali and Gregorian calendars.
- Includes headless utilities for using the date typing logic with your own input.
- Supports TypeScript.
- Provides a smooth desktop typing experience.
- Supports ESM imports for modern JavaScript apps.
- Supports app-level i18n through `jb-core/i18n`.
- Supports custom styling with CSS variables and CSS parts. See [CSS parts and variables](#css-parts-and-variables).
- Uses `jb-input`, `jb-calendar`, and `jb-popover` internally.
- Framework friendly: use it in pure JavaScript or in frameworks such as React, Vue, and Angular.

## When to use

Use `jb-date-input` when users should type or pick a date and the field needs Jalali/Gregorian conversion, form association, validation, min/max limits, custom value formats, or Persian digit display.

Use [`jb-calendar`](https://github.com/javadbat/jb-calendar) when you need only a calendar UI without an input field. Use [`jb-input`](https://github.com/javadbat/jb-input) when the value is plain text and not a date.

## Demo

- [GitHub Pages](https://javadbat.github.io/jb-date-input/)
- [CodePen](https://codepen.io/javadbat/pen/qBRyYKY)
- [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--overview)

## Using With JS Frameworks

<a href="https://github.com/javadbat/jb-date-input/tree/main/react" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/React.js-jb--date--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" /></a> See the [React documentation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput-react-readme--docs).

Other integrations: <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#angular" target="_blank" rel="noopener noreferrer">Angular</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#vue" target="_blank" rel="noopener noreferrer">Vue</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nuxt" target="_blank" rel="noopener noreferrer">Nuxt</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#svelte" target="_blank" rel="noopener noreferrer">Svelte</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#sveltekit" target="_blank" rel="noopener noreferrer">SvelteKit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#solidjs" target="_blank" rel="noopener noreferrer">SolidJS</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#lit" target="_blank" rel="noopener noreferrer">Lit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nextjs" target="_blank" rel="noopener noreferrer">Next.js</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#astro" target="_blank" rel="noopener noreferrer">Astro</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#blazor" target="_blank" rel="noopener noreferrer">Blazor</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#server-rendered-templates" target="_blank" rel="noopener noreferrer">Server-rendered templates</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#wordpress" target="_blank" rel="noopener noreferrer">WordPress</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#alpinejs-and-htmx" target="_blank" rel="noopener noreferrer">Alpine.js and HTMX</a>

## Installation

```sh
npm i jb-date-input
```

```js
import 'jb-date-input';
```

```html
<jb-date-input label="Date"></jb-date-input>
```

### CDN

```html
<script src="https://unpkg.com/jb-date-input/dist/jb-date-input.umd.js"></script>
```

## API reference

`jb-date-input` composes [`jb-input`](https://github.com/javadbat/jb-input), [`jb-calendar`](https://github.com/javadbat/jb-calendar), and [`jb-popover`](https://github.com/javadbat/jb-popover). For shared input styling and behavior, see the [`jb-input` API](https://github.com/javadbat/jb-input#api-reference).

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `value` | `string` | empty date value | Date value in the configured `value-type` and `format`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-set-get) |
| `value-type` | `'GREGORIAN' \| 'JALALI' \| 'TIME_STAMP'` | `GREGORIAN` | Controls the canonical `.value` returned by the component. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test) |
| `input-type` | `'GREGORIAN' \| 'JALALI'` | locale based | Controls what date system users type and see in the calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali) |
| `format` | `string` | `YYYY-MM-DDTHH:mm:ss.SSS[Z]` | Format used for `.value`, `min`, and `max` when `value-type` is `GREGORIAN` or `JALALI`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-format) |
| `min` | `string` | none | Minimum accepted date. Must use the configured `value-type` and `format`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test) |
| `max` | `string` | none | Maximum accepted date. Must use the configured `value-type` and `format`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test) |
| `name` | `string` | `""` | Form field name. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--in-form-test) |
| `label` | `string` | `""` | Label forwarded to the internal `jb-input`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) |
| `message` | `string` | `""` | Helper message forwarded to the internal `jb-input`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) |
| `placeholder` | `string` | `null` | Placeholder shown while the date value is empty. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--placeholder) |
| `required` | `boolean` | `false` | Enables required validation. Empty attribute and `"true"` mean true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--required) |
| `disabled` | `boolean` | `false` | Disables the internal input and sets the disabled custom state. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--disabled) |
| `error` | `string` | `""` | External validation error message. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-error) |
| `direction` | `'ltr' \| 'rtl'` | inherited | Direction forwarded to the internal calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--right-to-left-test) |
| `show-persian-number` | `boolean` | locale based | Displays Persian digits while `.value` remains English digits. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--persian-number) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` style defaults | Visual size forwarded to the internal `jb-input`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--size-variants) |
| `autocomplete` | `string` | browser default | Forwarded to the internal `jb-input`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) |
| `readonly` | `boolean` | device based | Forwarded to the internal `jb-input`; mobile devices become readonly to favor the picker. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--headless) |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `string` | no | Canonical value submitted with forms. Set with `string`, `Date`, or `null`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-set-get) |
| `initialValue` | `string \| null` | no | Default and reset value. It initializes `value` until the live value is explicitly set. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--initial-value) |
| `valueInDate` | `Date \| null` | yes | Current complete value as a JavaScript `Date`, or `null` when empty/incomplete. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-set-get) |
| `inputValue` | `string` | yes | Visible typed text in `YYYY/MM/DD` display format. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-format) |
| `inputType` | `'GREGORIAN' \| 'JALALI'` | no | Date system used by the input UI and calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali) |
| `valueType` | `'GREGORIAN' \| 'JALALI' \| 'TIME_STAMP'` | no | Date system or timestamp mode used for `.value`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test) |
| `valueFormat` | `string` | yes | Current value format. Change it with `setFormat()`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-format) |
| `dateRestrictions` | `{ min: Date \| null; max: Date \| null }` | no | Runtime min/max restrictions used by validation and calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test) |
| `validation` | `ValidationHelper<ValidationValue>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali-test) |
| `isAutoValidationDisabled` | `boolean` | no | Disables automatic validation when true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `required` | `boolean` | no | Enables required validation. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--required) |
| `disabled` | `boolean` | no | Enables or disables the internal input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--disabled) |
| `showPersianNumber` | `boolean` | no | Displays Persian digits while `.value` remains English digits. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--persian-number) |
| `showCalendar` | `boolean` | no | Opens or closes the internal calendar popover. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `placeholder` | `string \| null` | no | Placeholder shown while empty. |
| `form` | `HTMLFormElement \| null` | yes | Associated form from `ElementInternals`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--in-form-test) |
| `isDirty` | `boolean` | yes | `true` when current `.value` differs from `initialValue`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--initial-value) |
| `validationMessage` | `string` | yes | Current validation message from `ElementInternals`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--required) |
| `yearValue` / `monthValue` / `dayValue` | `number \| null` | yes | Date parts in the configured `valueType`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test) |
| `yearDisplayValue` / `monthDisplayValue` / `dayDisplayValue` | `number \| null` | yes | Date parts in the configured `inputType`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali) |
| `elements` | `ElementsObject` | no | Internal `input`, `calendar`, `popover`, and `calendarTriggerButton` for advanced integrations. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-overflow-handler) |

### Methods

| name | returns | description |
| --- | --- | --- |
| `setFormat(newFormat)` | `void` | Sets the value format used for `.value`, `min`, and `max`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `setMinDate(minDate)` | `void` | Sets or clears the minimum accepted date. Accepts `string`, `Date`, or `null`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `setMaxDate(maxDate)` | `void` | Sets or clears the maximum accepted date. Accepts `string`, `Date`, or `null`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `setMonthList(inputType, monthName)` | `void` | Overrides month labels for `GREGORIAN` or `JALALI`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-month-name) |
| `setCalendarDefaultDateView(year, month, dateType?)` | `void` | Sets the year/month shown when the value is empty. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `getDateValue(type?)` | `string` | Returns current value in `GREGORIAN`, `JALALI`, or `TIME_STAMP` mode. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test) |
| `focus()` | `void` | Focuses the internal input and opens the calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `setSelectionRange(start, end, direction?)` | `void` | Forwards selection range to the internal input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. Dispatches `invalid` when invalid. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. Dispatches `invalid` when invalid. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `clearValidationError()` | `void` | Clears the visible validation error. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |
| `triggerInputValidation(showError?)` | `ValidationResult \| undefined` | Deprecated; use `checkValidity()`, `reportValidity()`, or `validation.checkValidity()`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods) |

### Events

| event | description |
| --- | --- |
| `load` | Dispatched from `connectedCallback` before property initialization. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `init` | Dispatched after internal components are defined and the initial value is applied. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `beforeinput` | Cancelable event dispatched before typed input is applied. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `input` | Dispatched after user typing changes the visible input text. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `change` | Dispatched when the committed date value changes after blur or calendar selection. Canceling it reverts the date. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `select` | Dispatched when the user selects a date from the calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `focus` | Re-dispatched when the internal input receives focus. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `blur` | Re-dispatched when the internal input loses focus. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `keydown` | Re-dispatched from the internal input. ArrowUp/ArrowDown change the selected date part. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `keyup` | Re-dispatched from the internal input after the value object is updated. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `keypress` | Re-dispatched from the internal input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |
| `invalid` | Dispatched when `checkValidity()` or `reportValidity()` fails. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test) |

## Value type and input type

`input-type` controls what users see and edit. `value-type` controls what developers receive from `.value`; compare the [Jalali and Gregorian demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali) and [value-type demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test).

```html
<!-- User sees Jalali, developer receives Gregorian ISO-like value. -->
<jb-date-input input-type="JALALI" value-type="GREGORIAN"></jb-date-input>

<!-- User sees Gregorian, developer receives Jalali formatted value. -->
<jb-date-input input-type="GREGORIAN" value-type="JALALI"></jb-date-input>

<!-- Developer receives a timestamp string. -->
<jb-date-input value-type="TIME_STAMP"></jb-date-input>
```

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.inputType = 'JALALI';
dateInput.valueType = 'GREGORIAN';
```

## Value

Get and set value like a native input in the [value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-set-get).

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.value = '2024-01-15T00:00:00.000Z';
console.log(dateInput.value);
console.log(dateInput.valueInDate);

dateInput.value = new Date();
dateInput.value = null;
```

Empty values are represented with an empty date in the configured format, for example `0000-00-00T00:00:00.000Z` in the default Gregorian format. `valueInDate` returns `null` while the date is empty or incomplete.

## Format

The default format is compatible with `Date.prototype.toISOString()`; see the [custom format demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-format):

```html
<jb-date-input value="2024-01-15T00:00:00.000Z"></jb-date-input>
```

Use `format` when your backend needs a different string.

```html
<jb-date-input
  format="YYYY/MM/DD"
  value="2024/01/15"
  min="2024/01/01"
  max="2024/12/29"
></jb-date-input>
```

`format` also controls how string `min` and `max` are parsed. Set `format` before setting `value`, `min`, or `max` in JavaScript.

## Min and max

Set date limits with attributes in the [Gregorian min/max demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test):

```html
<jb-date-input
  value="2020-08-10T08:51:23.176Z"
  min="2020-08-05T08:51:23.176Z"
  max="2020-08-15T08:51:23.176Z"
></jb-date-input>
```

Or set them with JavaScript:

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.setMinDate(new Date());
dateInput.setMaxDate('2025-12-31T00:00:00.000Z');

dateInput.setMinDate(null);
dateInput.setMaxDate(null);
```

`min` and `max` validation uses the configured `valueType` and `format` for string values.

## Validation

`jb-date-input` uses [`jb-validation`](https://github.com/javadbat/jb-validation). Built-in validation handles `required`, `error`, `min`, and `max`; see the [required](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--required) and [external error](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-error) demos. Use `validation.list` for custom rules in the [custom validation demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali-test).

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.required = true;
dateInput.validation.list = [
  {
    validator: /^13.*$/g,
    message: 'Date must be in the 13th century',
  },
  {
    validator: ({ text, inputObject, valueObject, valueText }) => {
      if (inputObject.year && inputObject.year < '1300') {
        return 'Typed year must be 1300 or later';
      }
      return valueObject.jalali.day === 15;
    },
    message: 'Only the 15th day of the month is accepted',
  },
];
```

Custom validators receive:

| field | description |
| --- | --- |
| `text` | Visible input text in `YYYY/MM/DD` display format. |
| `inputObject` | Raw typed date parts before complete date conversion. |
| `valueObject` | Complete Gregorian, Jalali, timestamp, and time object. |
| `valueText` | Canonical `.value`. |

## Calendar default date

When the input is empty, the calendar opens on the current month. Use `setCalendarDefaultDateView()` to change that view in the [default calendar date demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-default-calendar-date).

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.setCalendarDefaultDateView(1360, 5);
dateInput.setCalendarDefaultDateView(1985, 8, 'GREGORIAN');
dateInput.setCalendarDefaultDateView(1360, 5, 'JALALI');
```

## Persian digits

```html
<jb-date-input show-persian-number></jb-date-input>
<jb-date-input show-persian-number="true"></jb-date-input>
<jb-date-input show-persian-number="false"></jb-date-input>
```

```js
document.querySelector('jb-date-input').showPersianNumber = true;
```

This affects display only. `.value` remains English digits; see the [Persian number demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--persian-number).

For app-wide locale, calendar, and numbering-system setup, configure [`jb-core/i18n`](https://github.com/javadbat/jb-core/tree/main/i18n).

## Slots

Use the `inline-start-section` and `inline-end-section` slots in the [inline sections demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-inline-sections), and customize `calendar-trigger-icon` in the [custom icon demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-custom-icon).

| slot | description |
| --- | --- |
| `inline-start-section` | Content rendered at the start of the internal input box. |
| `inline-end-section` | Content rendered after the calendar trigger in the internal input end section. |
| `calendar-trigger-icon` | Custom calendar trigger icon. |

```html
<jb-date-input label="Birthday">
  <span slot="inline-start-section">Birthday</span>
  <span slot="inline-end-section">optional</span>
</jb-date-input>
```

```html
<jb-date-input>
  <span slot="calendar-trigger-icon">open</span>
</jb-date-input>
```

## Month names

Override calendar month labels when your product needs custom locale names in the [custom month name demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-month-name).

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.setMonthList('JALALI', [
  'حَمَل',
  'ثَور',
  'جَوزا',
  'سَرَطان',
  'اَسَد',
  'سُنبُله',
  'میزان',
  'عَقرَب',
  'قَوس',
  'جَدْی',
  'دَلو',
  'حوت',
]);

dateInput.setMonthList('GREGORIAN', [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
]);
```

## Overflow handler

When the calendar opens near the edge of a scroll area, configure the internal popover; compare the [overflow handler](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-overflow-handler) and [constrained parent](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--overflow-within-parent) demos.

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.elements.popover.overflowHandler = 'SLIDE';
dateInput.elements.popover.overflowDom = document.querySelector('.modal-body');
```

## CSS parts and variables

For complete styling guidance, live examples, and copyable style recipes, see the [Styling docs](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput-styling--docs) and [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput-style--gallery).

| part | description |
| --- | --- |
| `input` | Internal `jb-input`. |
| `popover` | Internal `jb-popover`. |
| `calendar` | Internal `jb-calendar`. |

| custom state | description |
| --- | --- |
| `disabled` | Applied when `disabled` is true. |
| `invalid` | Applied while a validation error is visible. |

```css
jb-date-input {
  --jb-date-input-margin: 1rem 0;
  --jb-date-input-calendar-icon-color: #2563eb;
}

jb-date-input::part(input) {
  --jb-input-border-radius: 0.5rem;
}

jb-date-input::part(popover) {
  --jb-popover-bg-color: #ffffff;
  --jb-popover-border-radius: 1rem;
  --jb-popover-padding: 1rem;
  --jb-popover-z-index: 1000;
}

jb-date-input::part(calendar) {
  --jb-calendar-day-bg-color-selected: #2563eb;
  --jb-calendar-day-color-selected: #ffffff;
}

jb-date-input:state(invalid)::part(input) {
  --jb-input-border-color: #dc2626;
}
```

## Headless usage

Use the headless utilities when you want `jb-date-input` typing, caret, and date-string behavior in your own input component.

```js
import {
  emptyInputValueString,
  getFixedCaretPos,
  handleBeforeInput,
} from 'jb-date-input/module';
```

For React, use the headless hook:

```js
import { useJBDateInput } from 'jb-date-input/react';
```

See the [Headless demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--headless) and [headless documentation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput-headless--docs) for complete examples.

## Accessibility notes

The [standard input demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) shows the labeled field used by assistive technologies.

- The component is form-associated and submits `.value`.
- The shadow root delegates focus to the internal `jb-input`.
- `label`, `message`, `required`, `disabled`, and validation states are forwarded to the internal input or synchronized with `ElementInternals`.
- The calendar trigger is focusable and opens/closes the popover.
- On mobile, the internal input is set to readonly so users interact through the picker.

## Related Docs

- See [`jb-date-input/react`](https://github.com/javadbat/jb-date-input/tree/main/react) if you want to use this component in React.
- See [`jb-input`](https://github.com/javadbat/jb-input), [`jb-calendar`](https://github.com/javadbat/jb-calendar), and [`jb-popover`](https://github.com/javadbat/jb-popover) for composed component APIs.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-date-input` once before using `<jb-date-input>`.
- Use `input-type` / `inputType` for the date system the user sees.
- Use `value-type` / `valueType` for the canonical value returned by `.value`.
- Set `format` before setting string `value`, `min`, or `max`.
- Read `.value` for form/submitted value and `.valueInDate` when a JavaScript `Date` is needed.
- Use `show-persian-number` only for display; `.value` remains English digits.
- Use `inline-start-section`, `inline-end-section`, and `calendar-trigger-icon` slots. Do not use `start-section` or `end-section` directly on `jb-date-input`.
- Use `validation.list` for custom validation; validators receive `{ text, inputObject, valueObject, valueText }`.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-date-input` tag name to `JBDateInputWebComponent`.
