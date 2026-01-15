import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from "react";
import { JBDateInput, Props, useJBDateInput } from "jb-date-input/react";

import './styles/themes.css';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import type { ValidationValue } from 'jb-form';
import type { JBDateInputEventType } from '../dist/types';
import {JBButton} from 'jb-button/react';
const meta: Meta<Props> = {
  title: "Components/form elements/Inputs/JBDateInput",
  component: JBDateInput,
  //we create custom docs for this stories so we don't need them in display
  // excludeStories:['Headless','WithInlineSections','WithCustomIcon', 'Jalali', 'Gregorian','JalaliWithPersianSetup']
};
export default meta;
type Story = StoryObj<typeof JBDateInput>;

export const Normal: Story = {
  args: {
    label: "date",
  }
};
export const Jalali: Story = {
  args: {
    label: "jalali date",
    inputType: "JALALI",
  }
};
export const Gregorian: Story = {
  args: {
    label: "gregorian date",
    inputType: "GREGORIAN",
  }
};
export const JalaliWithPersianSetup: Story = {
  globals:{
    locale:"fa",
    dir:"rtl"
  },
    args: {
    label: "تاریخ جلالی",
    inputType: "JALALI",
    direction:'rtl',
    showPersianNumber:true,
    message:"تاریخ جلالی با اعداد فارسی و به صورت راست به چپ"
  }
}
export const CustomFormat: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    return (
      <div>
        <h2>input.value in different format</h2>
        <p>try to input some value inside date-input and see the changes in the paragraphs below</p>
        <JBDateInput label={`value with arguments format(${args.format})`} format={args.format} value={value} onChange={(e) => setValue(e.target.value)} />
        <p>your inputted value is: {value}</p>
        <JBDateInput label="value with YYYY-MM-DD format" format="YYYY-MM-DD format" value={value2} onChange={(e) => setValue2(e.target.value)} />
        <p>your inputted value is: {value2}</p>
      </div>
    )
  },
  args: {
    format: "YYYY/MM/DD",
  }
};

export const Placeholder: Story = {
  args: {
    label: "date",
    placeholder: "please enter your date",
    direction: "ltr",
  }
};

export const WithDefaultCalendarDate: Story = {
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    format: "YYYY/MM/DD",
    direction: "ltr",
    calendarDefaultDateView: { year: 1360, month: 5 },
  }
};
export const PersianNumber: Story = {
  args: {
    label: "with persian number",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    format: "YYYY/MM/DD",
    direction: "ltr",
    showPersianNumber: true,
    calendarDefaultDateView: { year: 1360, month: 5 },
  }
}
export const CustomMonthName: Story = {
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    jalaliMonthList: [
      "حَمَل",
      "ثَور",
      "جَوزا",
      "سَرَطان",
      "اَسَد",
      "سُنبُله",
      "میزان",
      "عَقرَب",
      "قَوس",
      "جَدْی",
      "دَلو",
      "حوت",
    ],
  }
}
export const Required: Story = {
  args: {
    label: "required field",
    message: "please focus and then unfocus the input to see require validation message",
    required: true,
    direction: "ltr",
  }
};

export const WithOverflowHandler: Story = {
  args: {
    label: "will jump on overflow",
    overflowHandler: "SLIDE",
  }
};

export const OverflowWithinParent: Story = {
  render:
    (args) => {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <div ref={ref} style={{ height: "10rem", border: "solid 1px #666", overflow: "hidden" }}>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <JBDateInput {...args} overflowRef={ref} />
        </div>
      );
    },
  args: {
    label: "will jump on overflow",
    overflowHandler: "SLIDE",
  }
};

export const DarkMode: Story = {
  render: () => {
    return (
      <div className="dark-theme">
        <h1>dark mode test</h1>
        <JBDateInput></JBDateInput>
      </div>
    );
  }
};

export const withError: Story = {
  args: {
    label: "with default error",
    error: 'error message',
    message: 'default message'
  }
};

export const ValueSetGet:Story = {
  render:()=>{
    const [value,setValue] = useState<Date | string>("");
    return (
    <div style={{display:'flex', flexDirection:"column", gap:"0.5rem"}}>
      <JBDateInput value={value} onChange={(e)=>setValue(e.target.value)}></JBDateInput>
      <JBButton onClick={()=>setValue(new Date())}>set value to Today</JBButton>
    </div>
    )
  }
}
export const sizeTest: Story = {
  render: () => {
    return (
      <>
        <div style={{ width: '100%' }}>
          <h3>parent full width</h3>
          <JBDateInput></JBDateInput>
        </div>
        <div style={{ width: '50%' }}>
          <h3>parent percent width</h3>
          <JBDateInput></JBDateInput>
        </div>
        <div style={{ width: '300px' }}>
          <h3>parent pixel width</h3>
          <JBDateInput></JBDateInput>
        </div>

        <h3>self full width</h3>
        <JBDateInput style={{ width: '100%' }}></JBDateInput>

        <h3>self percent width</h3>
        <JBDateInput style={{ width: '50%' }}></JBDateInput>

        <h3>self pixel width</h3>
        <JBDateInput style={{ width: '300px' }}></JBDateInput>

        <h3>self pixel height</h3>
        <JBDateInput style={({ "--jb-input-height": "70px" } as any)}></JBDateInput>
      </>
    );
  }
};

export const ValueTypeTest: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div>
        <JBDateInput
          {...args}

          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
        </JBDateInput>
        <div>
          <table style={{margin:'1rem'}}>
            <tr>
              <td>valueType is</td>
              <td>{args.valueType}</td>
            </tr>
            <tr>
              <td>inputType is</td>
              <td>{args.inputType}</td>
            </tr>
            <tr>
              <td>Min date is:</td>
              <td>{args.min ? args.min.toString() : "Unlimited"}</td>
            </tr>
            <tr>
              <td>Max date is:</td>
              <td>{args.max ? args.max.toString() : "Unlimited"}</td>
            </tr>
            <tr>
              <td>Your chosen date is:</td>
              <td>{value}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  },
  args: {
    valueType: "GREGORIAN",
    inputType: "GREGORIAN",
    min:"",
    max:""
  },
  //TODO add arg types so control in Value doc works better for test
};

export const GregorianMinMaxTest: Story = {
  ...ValueTypeTest,
  args: {
    valueType: "GREGORIAN",
    inputType: "GREGORIAN",
    min: "2020-09-05T08:51:23.176Z",
    max: "2020-10-15T08:51:23.176Z",
    direction: "ltr",
  }
};

export const JalaliTest: Story = {
  render: (args) => {
    const [value, valueSetter] = useState("");
    const [dateValue, setDateValue] = useState(new Date());
    const validationList = [
      {
        validator: /^13.*$/g,
        message: 'date must be in 13 century'
      },
      {
        validator: ({ valueObject }: ValidationValue) => {
          return valueObject.jalali.day >= 15;
        },
        message: 'you can only choose 15th day of month'
      }
    ];
    return (
      <div>
        <JBDateInput name="first-date-input" value={value} onSelect={e => { valueSetter(e.target.value); }} onChange={e => { valueSetter(e.target.value); }} {...args} />
        <JBDateInput name="first-date-input" showPersianNumber={true} value={value} label={args.label + ' با اعداد فارسی '} onSelect={e => { valueSetter(e.target.value); }} onChange={e => { valueSetter(e.target.value); }} {...args} />
        <div>
          <br /><br />valueType is {args.valueType}
          <br /><br />Min date is: {args.min ? args.min.toString() : "Unlimited"}
          <br /><br />Max date is: {args.max ? args.max.toString() : "Unlimited"}
          <br /><br />Your chosen date is: {value}
          <br /><button onClick={() => { valueSetter("1400-06-18T00:00:00.000Z"); }}>set value to 1400-06-18T00:00:00.000Z</button>
        </div>
        <h3>Center Aligned</h3>
        <div style={({ '--jb-date-input-text-align': 'center' } as any)}>
          <JBDateInput></JBDateInput>
        </div>
        <h3>test custom validation</h3>
        <JBDateInput validationList={validationList} value={value} onChange={e => { valueSetter(e.target.value); }} onSelect={e => { valueSetter(e.target.value); }} {...args}></JBDateInput>
        <h3>test via JS Date type value</h3>
        <JBDateInput value={dateValue} onChange={(e) => setDateValue(e.target.valueInDate as Date)}></JBDateInput>
      </div>
    );
  },
  args: {
    label: "date",
    valueType: "JALALI",
    min: "1402-08-01T12:05:39.530Z",
    max: "1402-09-01T12:05:39.530Z",
  },
};

export const JalaliMinMaxTest: Story = {
  ...JalaliTest,
  args: {
    label: "date",
    valueType: "JALALI",
    min: "1399-05-01T12:05:39.530Z",
    max: "1400-08-01T12:05:39.530Z",
  }
};

export const JalaliMinMaxTestWithCustomFormat: Story = {
  ...JalaliTest,
  args: {
    format: "YYYY/MM/DD",
    label: "date",
    valueType: "JALALI",
    min: "1399/05/01",
    max: "1400/08/01",
  }
};

export const TimeStampTest: Story = {
  render: (args) => {
    const [setValue, setValueSetter] = useState<string | null>(null);
    const valueInDate = useMemo(() => {
      if (setValue) {
        return new Date(parseInt(setValue)).toString();
      } else {
        return null;
      }
    }, [setValue]);
    const onChange = useCallback((e: JBDateInputEventType<Event>) => {
      setValueSetter(e.target.value);
    }, []);

    return (
      <div>
        <JBDateInput value={setValue} valueType="TIME_STAMP" onChange={onChange} {...args} />
        <div>
          <br /><br />valueType is {args.valueType}
          <br /><br />Min date is: {args.min ? args.min.toString() : "Unlimited"}
          <br /><br />Max date is: {args.max ? args.max.toString() : "Unlimited"}
          <br /><br />Your chosen date is: {setValue}
          <br /><br />Your chosen date in greg is: {valueInDate}
        </div>
      </div>
    );
  },
  args: {
    label: "date",
    valueType: "TIME_STAMP",
  }
}
export const TimeStampMinMaxTest: Story = {
  ...TimeStampTest,
  args: {
    label: "date",
    valueType: "TIME_STAMP",
    min: "1596291030322",
    max: "1696291030322",
  }
};

export const GregorianInputTest: Story = {
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "GREGORIAN",
  }
};

export const RightToLeftTest: Story = {
  args: {
    label: "راست به چپ",
    style: { direction: "rtl" }
  }
}

export const Headless: Story = {
  render: (args) => {
    const ref = useRef<HTMLInputElement>(null);
    const { value, onChange, onClick, onFocus } = useJBDateInput({ dateInputType: "JALALI", ref, showPersianNumber: false })
    return (
      <input ref={ref} value={value} onChange={onChange} onClick={onClick} onFocus={onFocus} />
    )
  },
  name: 'headless sample',
  args: {

  }
};
export const WithCustomIcon: Story = {
  render: (args) => (
    <JBDateInput {...args}>
      <div slot="calendar-trigger-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 610.398 610.398"
        >
          <g>
            <g>
              <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052    c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553    V35.544V24.992C180.791,11.188,171.291,0,159.567,0z" />
              <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992    h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z" />
              <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117    V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818    c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764    V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z" />
              <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017    c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z" />
              <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017    c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z" />
              <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017    c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z" />
              <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017    c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z" />
              <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032    c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z" />
              <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032    c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z" />
              <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032    c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z" />
              <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032    c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z" />
            </g>
          </g>
        </svg>
      </div>
    </JBDateInput>
  ),
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
  }
};
export const WithoutIcon: Story = {
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    direction: "ltr",
    style: { "--jb-date-input-calendar-trigger-display": "none" } as CSSProperties,
  }
};

export const WithInlineSections: Story = {
  render: (args) => (
    <JBDateInput {...args}>
      <div slot="inline-start-section" style={{ height: "1.5rem", borderInlineEnd: "2px solid #262626", paddingInline: "0.5rem" }}>
        🎉Birthday
      </div>
      <div slot="inline-end-section">⭐</div>
    </JBDateInput>
  ),
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    direction: "ltr",
  }
};

export const InFormTest: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
      // formRef.current.addEventListener('formdata', ({ formData }) => {
      //     console.log(formData);
      //     debugger;
      // });
      function handleForm(event: SubmitEvent) {
        var formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(data);
        event.preventDefault();
      }
      formRef.current?.addEventListener("submit", handleForm);
    }, [formRef]);
    return (
      <div>
        <h3>Form Submit Test</h3>
        <p>change inputs value and click on submit to submit the form, then see the browser console to see the submitted value</p>
        <form ref={formRef}>
          <input name="test-input" value="test value"></input>
          <JBDateInput label="date in form" name="birthdate"></JBDateInput>
          <div>see console after submit clicked</div>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  },
}

export const EventTest: Story = {
  args: {
    label: "event test:",
    message: "check the console",
    onChange: (e) => { console.log("onChange", e); },
    onLoad: (e) => { console.log("onLoad", e); },
    onInit: (e) => { console.log("onInit", e); },
    onInvalid: (e) => { console.log("onInvalid", e); },
    onBeforeInput: (e) => { console.log("onBeforeInput", e); },
    onInput: (e) => { console.log("onInput", e); },
    onKeyUp: (e) => { console.log("onKeyUp", e.composedPath()); },
    onKeyDown: (e) => { console.log("onKeyDown", e); },
    onKeyPress: (e) => { console.log("onKeyPress", e); },
    onSelect: (e) => { console.log("onSelect", e); },
    onFocus: (e) => { console.log("onFocus", e); },
    onBlur: (e) => { console.log("onBlur", e); },
  }
};