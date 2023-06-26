import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  static weekend(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value instanceof Date) {
      const day = value.getDay();
      if (day === 0 || day === 6) {
        return { weekend: true };
      }
    }
    return null;
  }
}
