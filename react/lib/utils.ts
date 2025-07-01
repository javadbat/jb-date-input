import { useEffect, useRef, useState, type MutableRefObject, type RefObject } from "react"
import { handleBeforeInput, type InputType, emptyInputValueString, type BeforeInputHandlerResponse } from 'jb-date-input';
import {useEvent} from 'jb-core/react'
type RefDom = {
  selectionStart: number | null,
  selectionEnd: number | null,
  setSelectionRange: (start: number, end: number) => void,
  // set value(value:string)
}
type Params = {
  ref: MutableRefObject<RefDom> | RefObject<RefDom>,
  dateInputType: InputType,
  showPersianNumber: false
}
export function useJBDateInput(params: Params) {
  const [value, setValue] = useState(emptyInputValueString);
  const resRef = useRef<BeforeInputHandlerResponse>(null)
  useEffect(() => {
    if (resRef.current) {
      setTimeout(() => {
        params.ref.current.setSelectionRange(resRef.current.selectionStart, resRef.current.selectionEnd);
        resRef.current = null;
      }, 0)
    }
  }, [value,resRef.current]);
  function onBeforeInput(e: InputEvent) {
    resRef.current = handleBeforeInput({
      dateInputType: params.dateInputType,
      selection: {
        start: params.ref.current.selectionStart,
        end: params.ref.current.selectionEnd,
      },
      value: value,
      showPersianNumber: params.showPersianNumber,
      event: {
        inputType: e.inputType,
        data: e.data
      }
    });
    e.preventDefault();
    setValue(resRef.current.value);
    //we set it twice because in some scenario value dont change but selection range should be set
    params.ref.current.setSelectionRange(resRef.current.selectionStart, resRef.current.selectionEnd);
    // set the selection range after the value is set

  }
  useEvent(params.ref, 'beforeinput', onBeforeInput);
  return {value, setValue, onChange:()=>{} }
}