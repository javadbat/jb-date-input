import { JBDateInputWebComponent, type ValidationValue, type InputType } from "jb-date-input";
import { type ValidationItem } from "jb-validation";
import { RefObject, useEffect, useRef } from "react";

export type JBDateInputAttributes = {
  min?: string | null | undefined | Date,
  max?: string | null | undefined | Date,
  message?: string,
  name?: string,
  format?: string,
  direction?: 'ltr' | 'rtl',
  value?: string | Date | null | undefined,
  validationList?: ValidationItem<ValidationValue>[],
  required?: boolean,
  calendarDefaultDateView?: { year: number, month: number, dateType?: InputType },
  showPersianNumber?: boolean,
  placeholder?: string,
  jalaliMonthList?: string[] | null | undefined,
  gregorianMonthList?: string[] | null | undefined,
  overflowHandler?: "NONE" | "SLIDE",
  overflowRef?: RefObject<HTMLElement|null> | null,
  //
  disabled?: boolean,
  error?: string,
}
export function useJBDateInputAttribute(element: RefObject<JBDateInputWebComponent>, props: JBDateInputAttributes) {
  const onFormatChangeCallBackQueueRef = useRef<(() => void)[]>([]);
  useEffect(() => {
    if (props.format) {
      if (props.format !== element.current?.valueFormat) {
        element.current?.setAttribute('format', props.format);
      }
      if (onFormatChangeCallBackQueueRef.current.length > 0) {
        onFormatChangeCallBackQueueRef.current.forEach((callBack: () => void) => {
          callBack();
        });
        onFormatChangeCallBackQueueRef.current = [];
      }

    }
  }, [props.format]);
  useEffect(() => {
    if (props.max) {
      if (props.format && props.format !== element.current?.valueFormat) {
        onFormatChangeCallBackQueueRef.current.push(() => {
          if (props.max) { element.current?.setMaxDate(props.max); }
        });
      } else {
        element.current?.setMaxDate(props.max);
      }
    }

  }, [props.max]);
    useEffect(() => {
    if(props.name){
        element?.current?.setAttribute('name', props.name || '');
      }else{
        element?.current?.removeAttribute('name');
      }
  }, [props.name]);
  useEffect(() => {
    if (props.min) {
      if (props.format && props.format !== element.current?.valueFormat) {
        onFormatChangeCallBackQueueRef.current.push(() => {
          props.min && element.current?.setMinDate(props.min);
        });
      } else {
        element.current?.setMinDate(props.min);
      }
    }
  }, [props.min]);
  useEffect(() => {
    if (element.current && props.value) {
      element.current.value = props.value;
    }
  }, [props.value]);
  useEffect(() => {
    if (element.current) {
      element.current.setAttribute("message",props.message || "");
    }
  }, [props.message]);
  useEffect(() => {
    if (element.current && Array.isArray(props.jalaliMonthList)) {
      element.current.setMonthList("JALALI", props.jalaliMonthList);
    }
  }, [props.jalaliMonthList]);
  useEffect(() => {
    if (element.current && Array.isArray(props.gregorianMonthList)) {
      element.current.setMonthList("GREGORIAN", props.gregorianMonthList);
    }
  }, [props.gregorianMonthList]);
  useEffect(() => {
    if (element.current && props.placeholder !== undefined) {
      element.current.placeholder = props.placeholder;
    }
  }, [props.placeholder]);
  useEffect(() => {
    if (element.current && props.overflowHandler !== undefined) {
      element.current.elements.popover.overflowHandler = props.overflowHandler;
    }
  }, [props.overflowHandler]);
  useEffect(() => {
    if (element.current && props.overflowRef !== undefined) {
      element.current.elements.popover.overflowDom = props.overflowRef.current;
    }
  }, [props.overflowRef]);
  useEffect(() => {
    if (element.current && Array.isArray(props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList]);
  useEffect(() => {
    if (element.current && props.direction) {
      element.current.setAttribute('direction', props.direction);
    }
  }, [props.direction]);
  useEffect(() => {
    if (element.current) {
      if (props.required) {
        element.current.required = true;
      } else {
        element.current.required = false;
      }
    }

  }, [props.required,element.current]);
  useEffect(() => {
    if (typeof props.calendarDefaultDateView == "object" && props.calendarDefaultDateView.year && props.calendarDefaultDateView.month) {
      element.current?.setCalendarDefaultDateView(props.calendarDefaultDateView.year, props.calendarDefaultDateView.month, props.calendarDefaultDateView.dateType);
    }
  }, [props.calendarDefaultDateView]);
  useEffect(() => {
    if (props.showPersianNumber) {
      element.current?.setAttribute('show-persian-number', 'true');
    } else {
      element.current?.removeAttribute('show-persian-number');
    }
  }, [props.showPersianNumber]);
  //
  useEffect(() => {
    if (typeof props.disabled == "boolean") {
      element?.current?.setAttribute('disabled', `${props.disabled}`);
    }
  }, [props.disabled]);
  useEffect(() => {
    if (props.error) {
      element?.current?.setAttribute('error', props.error);
    } else {
      element?.current?.removeAttribute('error');
    }
  }, [props.error]);
}