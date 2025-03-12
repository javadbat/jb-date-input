import React from 'react';
import {JBDateInput} from 'jb-date-input/react';
import './JBDateInputSizeTest.css';

const JBDateInputSizeTest = () => {
  return (
    <>
      <div className='parent-full-width'>
        <h3>parent full width</h3>
        <JBDateInput></JBDateInput>
      </div>
      <div className='parent-percent-width'>
        <h3>parent percent width</h3>
        <JBDateInput></JBDateInput>
      </div>
      <div className='parent-pixel-width'>
        <h3>parent pixel width</h3>
        <JBDateInput></JBDateInput>
      </div>

      <h3>self full width</h3>
      <JBDateInput className="self-full-width"></JBDateInput>

      <h3>self percent width</h3>
      <JBDateInput className="self-percent-width"></JBDateInput>

      <h3>self pixel width</h3>
      <JBDateInput className="self-pixel-width"></JBDateInput>

      <h3>self pixel height</h3>
      <JBDateInput className="self-pixel-height" label="calender"></JBDateInput>
      <div className="parent-pixel-height">
        <h3>parent pixel height</h3>
        <JBDateInput label="calender"></JBDateInput>
      </div>

    </>


  );
};

export default JBDateInputSizeTest;