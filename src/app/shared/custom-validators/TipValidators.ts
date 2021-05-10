import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type ErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type ValidationErrors = Record<string, ErrorsOptions>;

export class TipValidators extends Validators {
  static required(control: AbstractControl): ValidationErrors | null {
    if (Validators.required(control) == null) {
      return null;
    }

    return { required: { 'zh-cn': `必填项`, en: `Input is required` } };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (Validators.email(control) == null) {
      return null;
    }

    return { email: { 'zh-cn': `請填寫有效郵件`, en: `Please enter a valid email` } };
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : {
          mobile: {
            'zh-cn': `手机号码格式不正确`,
            en: `Mobile phone number is not valid`,
          },
        };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /^((\\+91-?)|0)?[0-9]{10}$/.test(value);
}
