import React, { useEffect, useRef } from "react";
import { JBDateInput } from "jb-date-input/react";
function InFormData() {
  const formRef = useRef();
  useEffect(() => {
    // formRef.current.addEventListener('formdata', ({ formData }) => {
    //     console.log(formData);
    //     debugger;
    // });
    function handleForm(event) {
      var formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      console.log(data);
      event.preventDefault();
    }
    formRef.current.addEventListener("submit", handleForm);
  }, [formRef]);
  return (
    <div>
      <form ref={formRef}>
        <input name="test-input" value="test value"></input>
        <JBDateInput label="date in form" name="birthdate"></JBDateInput>
        <div>see console after submit clicked</div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default InFormData;
