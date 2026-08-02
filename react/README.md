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
- [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--overview)

## Installation

```sh
npm i jb-date-input
```

```jsx
import { JBDateInput } from 'jb-date-input/react';

<JBDateInput label="Date" />;
```

## When to use

Use `JBDateInput` when a React form needs a date field with typed entry, a calendar popover, Jalali/Gregorian conversion, validation, min/max restrictions, and form value support. See the [React input demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal).

Use `JBCalendar` from `jb-calendar/react` when you need only an inline calendar picker without the input field.

## Props

`JBDateInput` accepts standard React element props plus these component props:

| prop | type | description |
| --- | --- | --- |
| `value` | `string \| Date \| null` | Controlled value. String values must match `valueType` and `format`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-set-get) |
| `valueType` | `'GREGORIAN' \| 'JALALI' \| 'TIME_STAMP'` | Controls the canonical value returned by `event.target.value`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test) |
| `inputType` | `'GREGORIAN' \| 'JALALI'` | Controls the date system users type and see in the calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali) |
| `format` | `string` | Value format used for `value`, `min`, and `max`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-format) |
| `min` | `string \| Date \| null` | Minimum accepted date. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test) |
| `max` | `string \| Date \| null` | Maximum accepted date. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test) |
| `label` | `string` | Label forwarded to the internal input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) |
| `message` | `string` | Helper message forwarded to the internal input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) |
| `name` | `string` | Form field name. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--in-form-test) |
| `placeholder` | `string` | Placeholder shown while the value is empty. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--placeholder) |
| `required` | `boolean` | Enables required validation. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--required) |
| `disabled` | `boolean` | Disables the date input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--disabled) |
| `error` | `string` | External validation error message. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-error) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Visual size forwarded to the internal `jb-input`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--size-variants) |
| `direction` | `'ltr' \| 'rtl'` | Direction forwarded to the internal calendar. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--right-to-left-test) |
| `showPersianNumber` | `boolean` | Displays Persian digits while the canonical value remains English digits. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--persian-number) |
| `validationList` | `ValidationItem<ValidationValue>[]` | Custom validation rules. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali-test) |
| `calendarDefaultDateView` | `{ year: number; month: number; dateType?: InputType }` | Calendar year/month shown when the value is empty. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-default-calendar-date) |
| `jalaliMonthList` | `string[]` | Custom Jalali month names. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-month-name) |
| `gregorianMonthList` | `string[]` | Custom Gregorian month names. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-month-name) |
| `overflowHandler` | `'NONE' \| 'SLIDE'` | Internal popover overflow behavior. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-overflow-handler) |
| `overflowRef` | `RefObject<HTMLElement \| null>` | Overflow container used by the internal popover. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--overflow-within-parent) |
| `isAutoValidationDisabled` | `boolean` | Disables automatic validation when true. See the shared validation behavior in the [web-component demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--imperative-methods). |

## Controlled value

Use `value` with `onChange` in the [controlled value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-set-get).

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

`inputType` controls what users see. `valueType` controls what `event.target.value` returns; compare the [Jalali input](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali) and [value-type](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--value-type-test) demos.

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

Default format is `YYYY-MM-DDTHH:mm:ss.SSS[Z]`; see the [custom format demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-format).

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

Use the [Gregorian min/max demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--gregorian-min-max-test) to see rejected dates.

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

Use `validationList` for custom `jb-validation` rules in the [custom validation demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--jalali-test). Built-in required and external-error states are shown in the [required](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--required) and [error](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-error) demos.

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

All wrapper event props are exercised in the [events demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test).

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

Set `calendarDefaultDateView` and inspect the initial month in the [default calendar date demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-default-calendar-date).

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

This affects display only. `event.target.value` remains English digits; see the [Persian number demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--persian-number).

For app-wide locale, calendar, and numbering-system setup, configure [`jb-core/i18n`](https://github.com/javadbat/jb-core/tree/main/i18n).

## Slots

Pass slotted children as shown in the [inline sections](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-inline-sections) and [custom icon](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-custom-icon) demos.

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

Customize Jalali and Gregorian labels in the [custom month name demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--custom-month-name).

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

Use the [overflow handler](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--with-overflow-handler) and [overflow container](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--overflow-within-parent) demos.

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

For the full list, see [`jb-date-input` CSS parts and variables](https://github.com/javadbat/jb-date-input#css-parts-and-variables) and the [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput-style--gallery).

## CSS parts and variables

Use the same CSS parts and variables as the web component. The `Styling` section above shows the React class-based pattern; compare the [shared style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput-style--gallery).

## Accessibility notes

Set `label` for the accessible field name. If you render a custom calendar trigger icon, keep it decorative or provide its own accessible text outside the icon. The [normal demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--normal) shows the labeled field.

## Headless usage

Use `useJBDateInput` when you want the date typing behavior with your own input; see the [headless React demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--headless).

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

For web-component behavior, events, slots, validation, form association, CSS variables, and headless utilities, see [`jb-date-input`](../README.md) and its [shared stories](https://javadbat.github.io/design-system/?path=/story/components-form-elements-inputs-jbdateinput--event-test).

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
