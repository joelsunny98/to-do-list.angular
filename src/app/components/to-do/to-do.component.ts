import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import { ValidationErrorPipe } from 'src/app/pipes/validation-error.pipe';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationErrorPipe,
    FormsModule
  ],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  providers: [DatePipe]
})
export class ToDoComponent implements OnInit {
  taskForm: FormGroup;
  taskArray: FormArray;
  holidayFormArray: FormArray;
  selectedMonth: number = new Date().getMonth() + 1;
  isTaskFormVisible = false;
  currentDate = new Date();
  formControlErrors: { [key: string]: string } = {};

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly commonService: CommonService,
  ) {
    this.taskArray = this.formBuilder.array([]);
    this.holidayFormArray = this.formBuilder.array([]);
  }

  ngOnInit(): void {
    this.taskArray = this.getHolidays();
    this.taskForm = this.buildTaskFormGroup(new Date(), '', '');
  }

  trackByFn(taskGroup: any): number {
    return taskGroup.id;
  }

  /**
   * Method to generate form array with Holidays.
   *
   * @returns Holiday Form Array
   */
  getHolidays() {
    this.commonService.holidayArray.forEach((holiday) => {
      const formGroup = this.formBuilder.group({
        date: holiday.date,
        task: holiday.task,
        isHoliday: true
      });
      this.holidayFormArray.push(formGroup)
    })
    return this.holidayFormArray;
  }

  /**
   * Method to build the task form group.
   *
   * @param date
   * @param task
   * @param remarks
   * @returns Form Group
   */
  buildTaskFormGroup(date: Date, task: string, remarks: string): FormGroup {
    return this.formBuilder.group({
      date: [date, [Validators.required, this.weekendValidator, this.isHolidayValidator.bind(this)]],
      task: [task, [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
      remarks: [remarks, Validators.maxLength(50)],
      isHoliday: false,
      editMode: false
    });
  }

  addFormGroup() {
    if (this.taskForm.valid) {
      const { date, task, remarks } = this.taskForm.value;
      const newTaskFormGroup = this.buildTaskFormGroup(date, task, remarks); // Call the buildTaskFormGroup function
      this.taskArray.push(newTaskFormGroup);

      const month = new Date(date).getMonth() + 1;

      this.commonService.sortTaskArray(this.taskArray)

      this.taskForm.reset();
      this.selectedMonth = month;
      console.log(this.taskArray.value)
    }
    this.isTaskFormVisible = false;
  }

  checkFormControlValidity(controlName: string) {
    const control = this.taskForm.get(controlName);
    if (control.invalid && control.touched) {
      this.formControlErrors[controlName] = this.getFormControlErrorMessage(controlName);
    } else {
      delete this.formControlErrors[controlName];
    }
  }

  isFormControlInvalid(controlName: string) {
    return this.formControlErrors.hasOwnProperty(controlName);
  }

  getFormControlErrorMessage(controlName: string) {
    const control = this.taskForm.get(controlName);
    const errors = control.errors;
    return new ValidationErrorPipe().transform(errors, controlName);
  }


  /**
   * Method to Validate is selected Date is a week day.
   *
   * @param control
   * @returns error
   */
  weekendValidator(control: FormControl) {
    const selectedDate = new Date(control.value);
    const day = selectedDate.getDay()
    const isWeekEnd = day === 0 || day === 6;
    return isWeekEnd ? { isWeekend: true } : null;
  }

  isHolidayValidator(control: FormControl) {
    const selectedDate = new Date(control.value);
    const invalid = this.taskArray.controls.some((holiday: AbstractControl) => {
      const holidayDate = new Date(holiday.get('date')?.value);
      return holidayDate.getTime() === selectedDate.getTime() && holiday.get('isHoliday')?.value;
    })
    return invalid ? { isHoliday: true } : null
  }

  /**
   * Method to patch value to edit form and start editing Mode.
   *
   * @param index
   */
  startEditing(index: number) {
    const taskGroup = this.taskArray.at(index) as FormGroup;
    this.taskForm.patchValue(taskGroup.value);
    this.taskArray.at(index).get('editMode').setValue(true);
  }

  /**
   * Method to update the edited values and end Editing mode.
   *
   * @param index
   */
  finishEditing(index: number) {
    const taskGroup = this.taskArray.at(index) as FormGroup;
    if (taskGroup.valid) {
      taskGroup.patchValue(this.taskForm.value);
    }
    this.taskArray.at(index).get('editMode').setValue(false);
    this.commonService.sortTaskArray(this.taskArray)
    this.taskForm.reset()
  }

  /**
* Method to close the task form while editing and reset the entries
*
*/
  cancelEditing(index: number) {
    this.taskArray.at(index).get('editMode').setValue(false);
    this.taskForm.reset();
  }

  /**
 * Method to close the task form while adding a task and reset the entries
 *
 */
  closeForm() {
    this.taskForm.reset();
    this.isTaskFormVisible = false;
  }
}
