import { ValidationItem } from "../../../common/scripts/validation/validation-helper-types";
import { JBDateInputValidationValue } from "./types";

export const requiredValidation:ValidationItem<JBDateInputValidationValue> = {
  validator:(value:JBDateInputValidationValue)=>{
    //TODO: make it base on js native Date value existence
    if ((value.inputObject.year == null || value.inputObject.month == null || value.inputObject.day == null)) {
      return false;
    }else{
      return true;
    }
  },
  message:'لطفا مقدار تاریخ را کامل وارد کنید'
};
