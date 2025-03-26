import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import 'jb-date-input';
// eslint-disable-next-line no-duplicate-imports
import { JBDateInputWebComponent,type ValidationValue, type JBDateInputValueObject, type InputType } from 'jb-date-input';
import { type ValidationItem } from 'jb-validation';
import {EventProps, useEvents} from './events-hook.js';
import { JBDateInputAttributes, useJBDateInputAttribute } from './attributes-hooks.js';
// re-export imported types for easier use for user
export {type JBDateInputValueObject, type ValidationItem, type ValidationValue, InputType };
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-date-input': JBDateInputType;
    }
    interface JBDateInputType extends DetailedHTMLProps<HTMLAttributes<JBDateInputWebComponent>, JBDateInputWebComponent> {
      class?: string,
      label?: string,
      name?: string,
      "value-type"?: string,
      "input-type"?: string,
      ref:React.RefObject<JBDateInputWebComponent>,
    }
  }
}
type JBDateInputProps = EventProps & JBDateInputAttributes & {
  className?: string,
  label?: string,
  name?: string,
  valueType?: 'GREGORIAN' | 'JALALI' | 'TIME_STAMP',
  inputType?: 'GREGORIAN' | 'JALALI',
}
export type Props = PropsWithChildren<JBDateInputProps>;
export const JBDateInput = forwardRef((props: Props, ref) => {
  const element = useRef<JBDateInputWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  useJBDateInputAttribute(element,props);
  useEvents(element,props);
  return (
    <jb-date-input class={props.className ? props.className : ""} name={props.name} label={props.label} value-type={props.valueType ? props.valueType : 'GREGORIAN'} ref={element} input-type={props.inputType ? props.inputType : 'JALALI'}>
      {props.children}
    </jb-date-input>
  );
});
JBDateInput.displayName = "JBDateInput";
