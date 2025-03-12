import React, {useState, useMemo, useCallback} from 'react';
import {JBDateInput} from 'jb-date-input/react';
function JBDateInputTimeStampTest(props) {
  const [setValue, setValueSetter] = useState(null);
  const valueInDate = useMemo(()=>{
    if(setValue){
      return new Date(parseInt(setValue)).toString();
    }else{
      return null;
    }
  },setValue);
  const onChange = useCallback((e)=>{
    setValueSetter(e.target.value);
  },[]);
  
  return (
    <div>
      <JBDateInput value={setValue} label={props.label} valueType="TIME_STAMP" min={props.min} max={props.max} onChange={onChange}></JBDateInput>
      <div>
        <br /><br />valueType is {props.valueType}
        <br /><br />Min date is: {props.min? props.min:"Unlimited"}
        <br /><br />Max date is: {props.max? props.max:"Unlimited"}
        <br /><br />Your chosen date is: {setValue}
        <br /><br />Your chosen date in greg is: {valueInDate}
      </div>
    </div>
  );
}
export default JBDateInputTimeStampTest;