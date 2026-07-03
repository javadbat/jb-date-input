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
- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput)

## Using With JS Frameworks

- [<img src="https://img.shields.io/badge/React.js-jb--date--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-date-input/tree/main/react)

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
| `value` | `string` | empty date value | Date value in the configured `value-type` and `format`. |
| `value-type` | `'GREGORIAN' \| 'JALALI' \| 'TIME_STAMP'` | `GREGORIAN` | Controls the canonical `.value` returned by the component. |
| `input-type` | `'GREGORIAN' \| 'JALALI'` | locale based | Controls what date system users type and see in the calendar. |
| `format` | `string` | `YYYY-MM-DDTHH:mm:ss.SSS[Z]` | Format used for `.value`, `min`, and `max` when `value-type` is `GREGORIAN` or `JALALI`. |
| `min` | `string` | none | Minimum accepted date. Must use the configured `value-type` and `format`. |
| `max` | `string` | none | Maximum accepted date. Must use the configured `value-type` and `format`. |
| `name` | `string` | `""` | Form field name. |
| `label` | `string` | `""` | Label forwarded to the internal `jb-input`. |
| `message` | `string` | `""` | Helper message forwarded to the internal `jb-input`. |
| `placeholder` | `string` | `null` | Placeholder shown while the date value is empty. |
| `required` | `boolean` | `false` | Enables required validation. Empty attribute and `"true"` mean true. |
| `disabled` | `boolean` | `false` | Disables the internal input and sets the disabled custom state. |
| `error` | `string` | `""` | External validation error message. |
| `direction` | `'ltr' \| 'rtl'` | inherited | Direction forwarded to the internal calendar. |
| `show-persian-number` | `boolean` | locale based | Displays Persian digits while `.value` remains English digits. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` style defaults | Visual size forwarded to the internal `jb-input`. |
| `autocomplete` | `string` | browser default | Forwarded to the internal `jb-input`. |
| `readonly` | `boolean` | device based | Forwarded to the internal `jb-input`; mobile devices become readonly to favor the picker. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `string` | no | Canonical value submitted with forms. Set with `string`, `Date`, or `null`. |
| `valueInDate` | `Date \| null` | yes | Current complete value as a JavaScript `Date`, or `null` when empty/incomplete. |
| `inputValue` | `string` | yes | Visible typed text in `YYYY/MM/DD` display format. |
| `inputType` | `'GREGORIAN' \| 'JALALI'` | no | Date system used by the input UI and calendar. |
| `valueType` | `'GREGORIAN' \| 'JALALI' \| 'TIME_STAMP'` | no | Date system or timestamp mode used for `.value`. |
| `valueFormat` | `string` | yes | Current value format. Change it with `setFormat()`. |
| `dateRestrictions` | `{ min: Date \| null; max: Date \| null }` | no | Runtime min/max restrictions used by validation and calendar. |
| `validation` | `ValidationHelper<ValidationValue>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. |
| `isAutoValidationDisabled` | `boolean` | no | Disables automatic validation when true. |
| `required` | `boolean` | no | Enables required validation. |
| `disabled` | `boolean` | no | Enables or disables the internal input. |
| `showPersianNumber` | `boolean` | no | Displays Persian digits while `.value` remains English digits. |
| `showCalendar` | `boolean` | no | Opens or closes the internal calendar popover. |
| `placeholder` | `string \| null` | no | Placeholder shown while empty. |
| `form` | `HTMLFormElement \| null` | yes | Associated form from `ElementInternals`. |
| `isDirty` | `boolean` | yes | `true` when current `.value` differs from `initialValue`. |
| `validationMessage` | `string` | yes | Current validation message from `ElementInternals`. |
| `yearValue` / `monthValue` / `dayValue` | `number \| null` | yes | Date parts in the configured `valueType`. |
| `yearDisplayValue` / `monthDisplayValue` / `dayDisplayValue` | `number \| null` | yes | Date parts in the configured `inputType`. |
| `elements` | `ElementsObject` | no | Internal `input`, `calendar`, `popover`, and `calendarTriggerButton` for advanced integrations. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `setFormat(newFormat)` | `void` | Sets the value format used for `.value`, `min`, and `max`. |
| `setMinDate(minDate)` | `void` | Sets or clears the minimum accepted date. Accepts `string`, `Date`, or `null`. |
| `setMaxDate(maxDate)` | `void` | Sets or clears the maximum accepted date. Accepts `string`, `Date`, or `null`. |
| `setMonthList(inputType, monthName)` | `void` | Overrides month labels for `GREGORIAN` or `JALALI`. |
| `setCalendarDefaultDateView(year, month, dateType?)` | `void` | Sets the year/month shown when the value is empty. |
| `getDateValue(type?)` | `string` | Returns current value in `GREGORIAN`, `JALALI`, or `TIME_STAMP` mode. |
| `focus()` | `void` | Focuses the internal input and opens the calendar. |
| `setSelectionRange(start, end, direction?)` | `void` | Forwards selection range to the internal input. |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. Dispatches `invalid` when invalid. |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. Dispatches `invalid` when invalid. |
| `clearValidationError()` | `void` | Clears the visible validation error. |
| `triggerInputValidation(showError?)` | `ValidationResult \| undefined` | Deprecated; use `checkValidity()`, `reportValidity()`, or `validation.checkValidity()`. |

### Events

| event | description |
| --- | --- |
| `load` | Dispatched from `connectedCallback` before property initialization. |
| `init` | Dispatched after internal components are defined and the initial value is applied. |
| `beforeinput` | Cancelable event dispatched before typed input is applied. |
| `input` | Dispatched after user typing changes the visible input text. |
| `change` | Dispatched when the committed date value changes after blur or calendar selection. Canceling it reverts the date. |
| `select` | Dispatched when the user selects a date from the calendar. |
| `focus` | Re-dispatched when the internal input receives focus. |
| `blur` | Re-dispatched when the internal input loses focus. |
| `keydown` | Re-dispatched from the internal input. ArrowUp/ArrowDown change the selected date part. |
| `keyup` | Re-dispatched from the internal input after the value object is updated. |
| `keypress` | Re-dispatched from the internal input. |
| `invalid` | Dispatched when `checkValidity()` or `reportValidity()` fails. |

## Value type and input type

`input-type` controls what users see and edit. `value-type` controls what developers receive from `.value`.

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

Get and set value like a native input.

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

The default format is compatible with `Date.prototype.toISOString()`:

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

Set date limits with attributes:

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

`jb-date-input` uses [`jb-validation`](https://github.com/javadbat/jb-validation). Built-in validation handles `required`, `error`, `min`, and `max`. Use `validation.list` for custom rules.

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

When the input is empty, the calendar opens on the current month. Use `setCalendarDefaultDateView()` to change that view.

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

This affects display only. `.value` remains English digits.

For app-wide locale, calendar, and numbering-system setup, configure [`jb-core/i18n`](https://github.com/javadbat/jb-core/tree/main/i18n).

## Slots

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

Override calendar month labels when your product needs custom locale names.

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

When the calendar opens near the edge of a scroll area, configure the internal popover.

```js
const dateInput = document.querySelector('jb-date-input');

dateInput.elements.popover.overflowHandler = 'SLIDE';
dateInput.elements.popover.overflowDom = document.querySelector('.modal-body');
```

## CSS parts and variables

| part | description |
| --- | --- |
| `input` | Internal `jb-input`. |
| `popover` | Internal `jb-popover`. |
| `calendar` | Internal `jb-calendar`. |

| custom state | description |
| --- | --- |
| `disabled` | Applied when `disabled` is true. |
| `invalid` | Applied while a validation error is visible. |

| CSS variable name | description |
| --- | --- |
| `--jb-date-input-margin` | Host component margin. |
| `--jb-date-input-calendar-trigger-display` | Calendar trigger display value. |
| `--jb-date-input-calendar-trigger-width` | Calendar trigger width. |
| `--jb-date-input-calendar-trigger-height` | Calendar trigger height. |
| `--jb-date-input-calendar-icon-color` | Calendar icon color. |
| `--jb-date-input-calendar-icon-color-active` | Calendar icon color while calendar is open. |

Internal `jb-input`, `jb-calendar`, and `jb-popover` CSS variables also apply.

```css
jb-date-input {
  --jb-date-input-margin: 1rem 0;
  --jb-date-input-calendar-icon-color: #2563eb;
}

jb-date-input::part(input) {
  --jb-input-border-radius: 0.5rem;
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

See the [Headless Storybook docs](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput-headless--docs) for a complete example.

## Accessibility notes

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
