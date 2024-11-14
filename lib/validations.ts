import { type ValidationItem } from "jb-validation";
import { type ValidationValue } from "./types";

export const requiredValidation:ValidationItem<ValidationValue> = {
  validator:(value:ValidationValue)=>{
    //TODO: make it base on js native Date value existence
    if ((value.inputObject.year == null || value.inputObject.month == null || value.inputObject.day == null)) {
      return false;
    }else{
      return true;
    }
  },
  message:'لطفا مقدار تاریخ را کامل وارد کنید',
  stateType:"valueMissing"
};
