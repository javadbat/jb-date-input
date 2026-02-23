'use client';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import { useRef, useImperativeHandle, forwardRef , type PropsWithChildren } from 'react'
import 'jb-date-input';
// eslint-disable-next-line no-duplicate-imports
import type { JBDateInputWebComponent,ValidationValue, JBDateInputValueObject, InputType } from 'jb-date-input';
import type { ValidationItem } from 'jb-validation';
import {type EventProps, useEvents} from './events-hook.js';
import { type JBDateInputAttributes, useJBDateInputAttribute } from './attributes-hooks.js';
import type { SizeVariants } from 'jb-input';
import type { JBElementStandardProps } from 'jb-core/react';
// re-export imported types for easier use for user
export type {JBDateInputValueObject, ValidationItem, ValidationValue, InputType };
export {useJBDateInput} from './utils.js';
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-date-input': JBDateInputType;
    }
    interface JBDateInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBDateInputWebComponent>, JBDateInputWebComponent> {
      class?: string,
      label?: string,
      name?: string,
      size?:SizeVariants,
      "value-type"?: string,
      "input-type"?: string,
      ref:React.RefObject<JBDateInputWebComponent>,
    }
  }
}

type JBDateInputProps = EventProps & JBDateInputAttributes & {
  label?: string,
  size?:SizeVariants,
  valueType?: 'GREGORIAN' | 'JALALI' | 'TIME_STAMP',
  inputType?: 'GREGORIAN' | 'JALALI',
}

export type Props = PropsWithChildren<JBDateInputProps> & JBElementStandardProps<JBDateInputWebComponent,keyof JBDateInputProps>;

export const JBDateInput = forwardRef((props: Props, ref) => {
  const element = useRef<JBDateInputWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  const {size, label, inputType, valueType,calendarDefaultDateView,direction,disabled,error,format,gregorianMonthList,isAutoValidationDisabled,jalaliMonthList,max,message,min,name,overflowHandler,overflowRef,placeholder,required,showPersianNumber,validationList,value, onBeforeInput,onBlur,onChange,onEnter,onFocus,onInit,onInput,onInvalid,onKeyDown,onKeyPress,onKeyUp,onLoad,onSelect, ...otherProps} = props;
  useJBDateInputAttribute(element,{calendarDefaultDateView,direction,disabled,error,format,gregorianMonthList,isAutoValidationDisabled,jalaliMonthList,max,message,min,name,overflowHandler,overflowRef,placeholder,required,showPersianNumber,validationList,value});
  useEvents(element,{onBeforeInput,onBlur,onChange,onEnter,onFocus,onInit,onInput,onInvalid,onKeyDown,onKeyPress,onKeyUp,onLoad,onSelect});
  return (
    <jb-date-input  size={size} label={label} value-type={valueType ? valueType : 'GREGORIAN'} ref={element} input-type={inputType ? inputType : 'JALALI'} {...otherProps}>
      {props.children}
    </jb-date-input>
  );
});
JBDateInput.displayName = "JBDateInput";
