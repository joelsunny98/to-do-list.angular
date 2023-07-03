import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
  standalone: true
})
export class ValidationErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    if (errors['isWeekend']) {
      return 'Selected date falls on a weekend.';
    }
    if (errors['required']) {
      return 'This field is required.';
    }
    if (errors['minlength']) {
      return 'This field must be at least ' + errors['minlength'].requiredLength + ' characters long.';
    }
    if (errors['maxlength']) {
      return 'This field cannot exceed ' + errors['maxlength'].requiredLength + ' characters.';
    }
    if (errors['isHoliday']) {
      return 'This date is a Holiday';
    }
    return '';
  }
}
