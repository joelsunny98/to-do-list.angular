import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
  standalone: true
})
export class ValidationErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined, fieldName: string): string {
    if (!errors) {
      return '';
    }
    
    switch (true) {
      case errors?.['required'] && fieldName === 'date':
        return 'Date is required.';

      case errors?.['required'] && fieldName === 'task':
        return 'Task is required.';

      case errors?.['isWeekend'] && fieldName === 'date':
        return 'Selected date falls on a weekend.';

      case errors?.['minlength'] && fieldName === 'task':
        return 'This field must be at least ' + errors['minlength'].requiredLength + ' characters long.';

      case errors?.['maxlength'] && fieldName === 'task':
        return 'This field cannot exceed ' + errors['maxlength'].requiredLength + ' characters.';

      case errors?.['maxlength'] && fieldName === 'remarks':
        return 'This field cannot exceed ' + errors['maxlength'].requiredLength + ' characters.';

      case errors?.['isHoliday'] && fieldName === 'date':
        return 'This date is a Holiday.';

      case errors?.['isPreviousDate'] && fieldName === 'date':
        return 'Selected date is in the past.';

      default:
        return '';
    }
  }
}
