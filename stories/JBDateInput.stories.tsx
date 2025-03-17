import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from "react";

import { JBDateInput, Props } from "jb-date-input/react";
import JBDateInputGregorianTest from "./samples/JBDateInputGregorianTestPage";
import JBDateInputJalaliTest from "./samples/JBDateInputJalaliTestPage";
import JBDateInputTimeStampTest from "./samples/JBDateInputTimeStampTestPage";
import DarkModeTest from "./samples/DarkmodeTest";
import JBDateInputSizeTest from "./samples/JBDateInputSizeTest";
import InFormData from "./samples/InFormData";


const meta: Meta<Props> = {
  title: "Example/form elements/Inputs/JBDateInput",
  component: JBDateInput,
};
export default meta;
type Story = StoryObj<typeof JBDateInput>;

export const Normal: Story = {
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    direction: "ltr",
  }
};

export const CustomFormat: Story = {
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "JALALI",
    format: "YYYY/MM/DD",
    direction: "ltr",
  }
};

export const Placeholder: Story = {
  args: {
    label: "date",
    placeholder: "date را وارد کنید",
    valueType: "GREGORIAN",
    inputType: "JALALI",
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
    label: "با اعداد فارسی",
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
    label: "فیلد اجباری",
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
      const ref = useRef(null);
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
  render: () => <DarkModeTest />
};

export const sizeTest: Story = {
  render: () => <JBDateInputSizeTest></JBDateInputSizeTest>
};

export const GregorianTest: Story = {
  render: (args) => (
    <JBDateInputGregorianTest {...args}></JBDateInputGregorianTest>
  ),
  args: {
    label: "date",
    valueType: "GREGORIAN",
    inputType: "GREGORIAN",
    direction: "ltr",
  }
};

export const GregorianMinMaxTest: Story = {
  ...GregorianTest,
  args: {
    label: "date",
    valueType: "GREGORIAN",
    min: "2020-09-05T08:51:23.176Z",
    max: "2020-10-15T08:51:23.176Z",
    inputType: "GREGORIAN",
    direction: "ltr",
  }
};

export const JalaliTest: Story = {
  render: (args) => (
    <div style={{ direction: "rtl" }}>
      <JBDateInputJalaliTest {...args}></JBDateInputJalaliTest>
    </div>
  ),
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
  render: (args) => (
    <JBDateInputTimeStampTest
      label={args.label}
      min={args.min}
      max={args.max}
      valueType={args.valueType}
    >
    </JBDateInputTimeStampTest>
  ),
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
    label: "rtl",
    style: "direction:rtl;"
  }
}
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
    style: "--jb-date-input-calendar-trigger-display:none",
  }
};

export const WithStartSection: Story = {
  render: (args) => (
    <JBDateInput {...args}>
      <div
        slot="end-section"
        style={{ width: "24px", height: "24px", backgroundColor: "#262626" }}
      >
      </div>
      <div
        slot="start-section"
        style={{ width: "24px", height: "24px", backgroundColor: "#262626" }}
      >
      </div>
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
  render: (args) => <InFormData {...args}></InFormData>,
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