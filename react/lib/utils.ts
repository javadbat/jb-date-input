import { useEffect, useRef, useState, type MutableRefObject, type InputEvent, type RefObject } from "react"
import { handleBeforeInput, type InputType, emptyInputValueString, type BeforeInputHandlerResponse } from 'jb-date-input';
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
  function onBeforeInput(e: InputEvent<HTMLInputElement>) {
    resRef.current = handleBeforeInput({
      dateInputType: params.dateInputType,
      selection: {
        selectionStart: params.ref.current.selectionStart,
        selectionEnd: params.ref.current.selectionEnd,
      },
      value: value,
      showPersianNumber: params.showPersianNumber,
      event: {
        inputType: e.type,
        data: e.data
      }
    });
    e.preventDefault();
    setValue(resRef.current.value);
  }
  
  return { onBeforeInput, value, setValue, onChange:()=>{} }
}