import type { JBCalendarWebComponent } from 'jb-calendar';
import type { JBDateInputWebComponent } from 'jb-date-input';
import { expect } from 'storybook/test';

export function getDateInput(canvasElement: HTMLElement, index = 0) {
  const dateInput = canvasElement.querySelectorAll<JBDateInputWebComponent>('jb-date-input')[index];
  expect(dateInput).toBeTruthy();
  expect(dateInput!.shadowRoot).toBeTruthy();
  return dateInput!;
}

export function getNativeInput(dateInput: JBDateInputWebComponent) {
  const input = dateInput.elements.input.shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(input).toBeTruthy();
  return input!;
}

export function getCalendar(dateInput: JBDateInputWebComponent) {
  const calendar = dateInput.elements.calendar;
  expect(calendar).toBeTruthy();
  expect(calendar.shadowRoot).toBeTruthy();
  return calendar;
}

export function getCalendarShadow(calendar: JBCalendarWebComponent) {
  return calendar.shadowRoot!;
}

export function getCalendarDay(calendar: JBCalendarWebComponent, day: number) {
  const dayElement = getCalendarShadow(calendar).querySelector<HTMLElement>(`.current-month-day-wrapper .day-wrapper[day-number="${day}"]`);
  expect(dayElement).toBeTruthy();
  return dayElement!;
}

export function getCalendarMonthNames(calendar: JBCalendarWebComponent) {
  return Array.from(getCalendarShadow(calendar).querySelectorAll<HTMLElement>('.month-selection-section .month-name')).map((month) => month.textContent);
}

export function getMessageText(dateInput: JBDateInputWebComponent) {
  return dateInput.elements.input.shadowRoot?.querySelector<HTMLElement>('.message-box')?.textContent ?? '';
}

export function hasPersianDigits(value: string) {
  return /[۰-۹]/.test(value);
}
