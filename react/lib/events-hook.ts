import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type {JBDateInputWebComponent, JBDateInputEventType} from 'jb-date-input';

export type EventProps = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBDateInputEventType<CustomEvent>) => void,
    /**
   * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onInit?: (e: JBDateInputEventType<CustomEvent>) => void,
  /**
   * when value changed to invalid value
   */
  onInvalid?: (e: JBDateInputEventType<CustomEvent>) => void,
  /**
   * base on standard js `change` event so it only called on blur. use onInput to get every keyStroke 
   */
  onChange?: (e: JBDateInputEventType<Event>) => void,
  onInput?: (e: JBDateInputEventType<InputEvent>) => void,
  onBeforeInput?: (e: JBDateInputEventType<InputEvent>) => void,
  onKeyUp?: (e: JBDateInputEventType<KeyboardEvent>) => void,
  onKeyPress?: (e: JBDateInputEventType<KeyboardEvent>) => void,
  onKeyDown?: (e: JBDateInputEventType<KeyboardEvent>) => void,
  /*
  * when user select the date in picker
  */
  onSelect?: (e: JBDateInputEventType<CustomEvent>) => void,
  onFocus?: (e: JBDateInputEventType<FocusEvent>) => void,
  onBlur?: (e: JBDateInputEventType<FocusEvent>) => void,
}
export function useEvents(element:RefObject<JBDateInputWebComponent>,props:EventProps){
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, 'invalid', props.onInvalid, true);
  useEvent(element, 'change', props.onChange, true);
  useEvent(element, 'beforeinput', props.onBeforeInput, false);
  useEvent(element, 'input', props.onInput, true);
  useEvent(element, 'keyup', props.onKeyUp, true);
  useEvent(element, 'keydown', props.onKeyDown, false);
  useEvent(element, 'keypress', props.onKeyPress, true);
  useEvent(element, 'select', props.onSelect, true);
  useEvent(element, 'focus', props.onFocus, true);
  useEvent(element, 'blur', props.onBlur, true);
}