import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateName(
  control: AbstractControl
): ValidationErrors | null {
  const name: string = control.value || '';

  const valid = /^[a-zA-Z ]*$/.test(name);

  return valid ? null : { invalidName: true };
}

export function validateAddress(
  control: AbstractControl
): ValidationErrors | null {
  const address: string = control.value || '';
  const valid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d,/#\-_@& ]+$/.test(address);

  return valid ? null : { invalidAddress: true };
}
