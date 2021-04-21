import { AbstractControl, ValidatorFn } from '@angular/forms';

export function localizationValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value.center ? null : { localizationError: true };
  };
}
