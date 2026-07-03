# jb-date-input React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-date-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-date-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-date-input-react)](https://www.npmjs.com/package/jb-date-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-date-input)

React wrapper for [`jb-date-input`](https://github.com/javadbat/jb-date-input). It imports and registers the underlying web component, forwards React props to the element, and exposes the same Jalali/Gregorian date input behavior in JSX.

- Supports Jalali and Gregorian input.
- Supports custom `valueType`, `inputType`, and `format`.
- Supports `Date`, string, and null values.
- Supports min/max date limits.
- Supports custom validation through `validationList`.
- Supports custom Jalali and Gregorian month names.
- Supports calendar popover overflow handling.
- Supports headless usage through `useJBDateInput`.

## Demo

- [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-date-input)
- [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBDateInput.tsx)
- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbdateinput)

## Installation

```sh
npm i jb-date-input
```

```jsx
import { JBDateInput } from 'jb-date-input/react';

<JBDateInput label="Date" />;
```

## When to use

Use `JBDateInput` when a React form needs a date field with typed entry, a calendar popover, Jalali/Gregorian conversion, validation, min/max restrictions, and form value support.

Use `JBCalendar` from `jb-calendar/react` when you need only an inline calendar picker without the input field.

## Props

`JBDateInput` accepts standard React element props plus these component props:

| prop | type | description |
| --- | --- | --- |
| `value` | `string \| Date \| null` | Controlled value. String values must match `valueType` and `format`. |
| `valueType` | `'GREGORIAN' \| 'JALALI' \| 'TIME_STAMP'` | Controls the canonical value returned by `event.target.value`. |
| `inputType` | `'GREGORIAN' \| 'JALALI'` | Controls the date system users type and see in the calendar. |
| `format` | `string` | Value format used for `value`, `min`, and `max`. |
| `min` | `string \| Date \| null` | Minimum accepted date. |
| `max` | `string \| Date \| null` | Maximum accepted date. |
| `label` | `string` | Label forwarded to the internal input. |
| `message` | `string` | Helper message forwarded to the internal input. |
| `name` | `string` | Form field name. |
| `placeholder` | `string` | Placeholder shown while the value is empty. |
| `required` | `boolean` | Enables required validation. |
| `disabled` | `boolean` | Disables the date input. |
| `error` | `string` | External validation error message. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Visual size forwarded to the internal `jb-input`. |
| `direction` | `'ltr' \| 'rtl'` | Direction forwarded to the internal calendar. |
| `showPersianNumber` | `boolean` | Displays Persian digits while the canonical value remains English digits. |
| `validationList` | `ValidationItem<ValidationValue>[]` | Custom validation rules. |
| `calendarDefaultDateView` | `{ year: number; month: number; dateType?: InputType }` | Calendar year/month shown when the value is empty. |
| `jalaliMonthList` | `string[]` | Custom Jalali month names. |
| `gregorianMonthList` | `string[]` | Custom Gregorian month names. |
| `overflowHandler` | `'NONE' \| 'SLIDE'` | Internal popover overflow behavior. |
| `overflowRef` | `RefObject<HTMLElement \| null>` | Overflow container used by the internal popover. |
| `isAutoValidationDisabled` | `boolean` | Disables automatic validation when true. |

## Controlled value

```jsx
import { useState } from 'react';
import { JBDateInput } from 'jb-date-input/react';

function Example() {
  const [value, setValue] = useState('');

  return (
    <JBDateInput
      label="Start date"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
```

Use `onInput` when you need every typed edit, and `onChange` when you need the committed date value after blur or calendar selection.

## Date and value type

`inputType` controls what users see. `valueType` controls what `event.target.value` returns.

```jsx
<JBDateInput inputType="JALALI" valueType="GREGORIAN" />
<JBDateInput inputType="GREGORIAN" valueType="JALALI" />
<JBDateInput valueType="TIME_STAMP" />
```

You can also pass a JavaScript `Date` as the controlled value.

```jsx
const [value, setValue] = useState<Date | string | null>(new Date());

<JBDateInput
  value={value}
  onChange={(event) => setValue(event.target.valueInDate)}
/>;
```

## Format

Default format is `YYYY-MM-DDTHH:mm:ss.SSS[Z]`.

```jsx
<JBDateInput
  format="YYYY/MM/DD"
  value="2024/01/15"
  min="2024/01/01"
  max="2024/12/29"
/>
```

Set `format` before setting string `value`, `min`, or `max`.

## Min and max

```jsx
const today = new Date();

<JBDateInput label="Start date" min={today} />;

<JBDateInput
  label="Start date"
  value="2020-08-10T08:51:23.176Z"
  min="2020-08-05T08:51:23.176Z"
  max="2020-08-15T08:51:23.176Z"
/>;
```

String `min` and `max` must use the configured `valueType` and `format`.

## Validation

Use `validationList` for custom `jb-validation` rules.

```jsx
const validationList = [
  {
    validator: /^13.*$/g,
    message: 'Date must be in the 13th century',
  },
  {
    validator: ({ inputObject, valueObject }) => {
      if (inputObject.year && inputObject.year < '1300') {
        return 'Typed year must be 1300 or later';
      }
      return valueObject.jalali.day === 15;
    },
    message: 'Only the 15th day of the month is accepted',
  },
];

<JBDateInput required validationList={validationList} />;
```

For manual validation, use a ref:

```jsx
const dateInputRef = useRef(null);

<JBDateInput ref={dateInputRef} />;
<button onClick={() => dateInputRef.current?.reportValidity()}>
  Check
</button>;
```

Custom validators receive `{ text, inputObject, valueObject, valueText }`.

## Events

| prop | description |
| --- | --- |
| `onLoad` | Called when the web component dispatches `load`. |
| `onInit` | Called when internal components are ready and initial value is applied. |
| `onBeforeInput` | Cancelable typing event before visible text changes. |
| `onInput` | Called after user typing changes visible text. |
| `onChange` | Called when the committed date value changes after blur or calendar selection. |
| `onSelect` | Called when the user selects a date from the calendar. |
| `onInvalid` | Called when validation fails. |
| `onFocus` | Called when the internal input receives focus. |
| `onBlur` | Called when the internal input loses focus. |
| `onKeyDown` | Called for keydown. ArrowUp/ArrowDown change the selected date part. |
| `onKeyUp` | Called after keyup and value-object update. |
| `onKeyPress` | Called for keypress. |

```jsx
<JBDateInput
  onSelect={(event) => console.log(event.target.value)}
  onChange={(event) => console.log(event.target.value)}
  onInput={(event) => console.log(event.target.inputValue)}
/>
```

## Calendar default date

```jsx
<JBDateInput
  inputType="JALALI"
  calendarDefaultDateView={{ year: 1350, month: 3 }}
/>
```

Use `dateType` when the default view should target a specific calendar type:

```jsx
<JBDateInput
  calendarDefaultDateView={{ year: 1985, month: 8, dateType: 'GREGORIAN' }}
/>
```

## Persian digits and i18n

```jsx
<JBDateInput showPersianNumber />
```

This affects display only. `event.target.value` remains English digits.

For app-wide locale, calendar, and numbering-system setup, configure [`jb-core/i18n`](https://github.com/javadbat/jb-core/tree/main/i18n).

## Slots

Pass slotted children with the same slot names as the web component.

```jsx
<JBDateInput label="Birthday">
  <span slot="inline-start-section">Birthday</span>
  <span slot="inline-end-section">optional</span>
</JBDateInput>
```

```jsx
<JBDateInput>
  <span slot="calendar-trigger-icon">open</span>
</JBDateInput>
```

## Month names

```jsx
<JBDateInput
  jalaliMonthList={[
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
  ]}
  gregorianMonthList={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
/>
```

## Overflow handler

```jsx
<JBDateInput overflowHandler="SLIDE" />
```

Use `overflowRef` when the popover should calculate overflow against a specific container.

```jsx
const overflowRef = useRef(null);

<div ref={overflowRef} style={{ height: '12rem', overflow: 'hidden' }}>
  <JBDateInput overflowHandler="SLIDE" overflowRef={overflowRef} />
</div>
```

## Styling

The React component uses the same CSS variables and parts as the web component.

```css
.date-field {
  --jb-date-input-margin: 1rem 0;
  --jb-date-input-calendar-icon-color: #2563eb;
}

.date-field::part(input) {
  --jb-input-border-radius: 0.5rem;
}
```

For the full list, see [`jb-date-input` CSS parts and variables](https://github.com/javadbat/jb-date-input#css-parts-and-variables).

## CSS parts and variables

Use the same CSS parts and variables as the web component. The `Styling` section above shows the React class-based pattern.

## Accessibility notes

Set `label` for the accessible field name. If you render a custom calendar trigger icon, keep it decorative or provide its own accessible text outside the icon.

## Headless usage

Use `useJBDateInput` when you want the date typing behavior with your own input.

```jsx
import { useRef } from 'react';
import { useJBDateInput } from 'jb-date-input/react';

function HeadlessDateInput() {
  const ref = useRef(null);
  const { value, onChange, onClick, onFocus } = useJBDateInput({
    dateInputType: 'JALALI',
    ref,
    showPersianNumber: false,
  });

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
    />
  );
}
```

## Shared Documentation

For web-component behavior, events, slots, validation, form association, CSS variables, and headless utilities, see [`jb-date-input`](https://github.com/javadbat/jb-date-input).

## Related Docs

- See [`jb-date-input`](https://github.com/javadbat/jb-date-input) if you want to use this component as a web component.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBDateInput` from `jb-date-input/react`; the wrapper imports and registers the underlying `jb-date-input` web component.
- Use React prop names such as `valueType`, `inputType`, `showPersianNumber`, `validationList`, and `calendarDefaultDateView`.
- Use `event.target.value` for the canonical value and `event.target.valueInDate` for a JavaScript `Date`.
- Use `onInput` for typed edits and `onChange` for committed date changes.
- Set `format` before string `value`, `min`, or `max`.
- Slot names are `inline-start-section`, `inline-end-section`, and `calendar-trigger-icon`.
- The wrapper currently exposes an `onEnter` prop type, but the underlying web component does not dispatch an `enter` event.
