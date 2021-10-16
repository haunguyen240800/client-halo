import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl!.errors && !checkControl!.errors.matching) {
        return null;
      }
      if (control!.value >= checkControl!.value) {
        controls.get(checkControlName)!.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
  static dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const today = new Date();
      
      if(!(control && control.value)) {   
        return null;
      }
      let date = new Date(control.value)
      if (date < today){
        return {invalidDate: true };
      }else{
        return null;
      }
    }
  }
}

