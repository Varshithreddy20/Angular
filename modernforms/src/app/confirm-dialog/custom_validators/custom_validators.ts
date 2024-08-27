import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateName(control: AbstractControl): ValidationErrors | null {
  const name: string = control.value || '';

  const valid = /^[a-zA-Z ]*$/.test(name);

  return valid ? null : { invalidName: true };
}
