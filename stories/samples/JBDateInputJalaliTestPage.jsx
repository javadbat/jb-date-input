import React, {useState} from 'react';
import {JBDateInput} from 'jb-date-input/react';
function JBDateInputJalaliTest(props) {
  const [value, valueSetter] = useState("");
  const [dateValue,setDateValue] = useState(new Date());
  const validationList = [
    {
      validator:/^13.*$/g,
      message:'تاریخ باید قبل از تنها در قرن 13 شمسی باشد'
    },
    {
      validator:({text, inputObject, valueObject, valueText})=>{
        return valueObject.jalali.day >= 15;
      },
      message:'باید تاریخ بعد از  15 ماه انتخاب شود'
    }
  ];
  return (
    <div>
      <JBDateInput name="first-date-input" format={props.format} value={value} label={props.label} min={props.min} max={props.max} valueType={props.valueType} onSelect={e => {valueSetter(e.target.value);}} onChange={e => {valueSetter(e.target.value);}}></JBDateInput>
      <JBDateInput name="first-date-input" format={props.format} showPersianNumber={true} value={value} label={props.label+' با اعداد فارسی '} min={props.min} max={props.max} valueType={props.valueType} onSelect={e => {valueSetter(e.target.value);}} onChange={e => {valueSetter(e.target.value);}}></JBDateInput>
      <div>
        <br /><br />valueType is {props.valueType}
        <br /><br />Min date is: {props.min? props.min:"Unlimited"}
        <br /><br />Max date is: {props.max? props.max:"Unlimited"}
        <br /><br />Your chosen date is: {value}
        <br /><button onClick={()=>{valueSetter("1400-06-18T00:00:00.000Z");}}>set value to 1400-06-18T00:00:00.000Z</button>
      </div>
      <h3>Center Aligned</h3>
      <div style={{'--jb-date-input-text-align':'center'}}>
        <JBDateInput></JBDateInput>
      </div>
      <h3>test custom validation</h3>
      <JBDateInput validationList={validationList} value={value} label={props.label} valueType={props.valueType} onChange={e => {valueSetter(e.target.value);}} onSelect={e => {valueSetter(e.target.value);}} format={props.format}></JBDateInput>
      <h3>test via JS Date type value</h3>
      <JBDateInput value={dateValue} onChange={(e)=>setDateValue(e.target.valueInDate)}></JBDateInput>
    </div>
  );
}
export default JBDateInputJalaliTest;