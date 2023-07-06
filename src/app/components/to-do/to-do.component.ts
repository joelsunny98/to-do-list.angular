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

  /**
   * 
   * @param taskGroup 
   * @returns 
   */
  trackByFn(taskGroup: any): number {
    return taskGroup.id;
  }

  /**
   * Method to generate form array with Holidays.
   *
   * @returns Holiday Form Array
   */
  getHolidays(): FormArray {
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
      isEditMode: false
    });
  }

  /**
   * Method to add Form Group for task
   */
  addFormGroup() {
    const { date, task, remarks } = this.taskForm.value;
    this.taskArray.push(this.buildTaskFormGroup(date, task, remarks));
    this.selectedMonth = new Date(date).getMonth() + 1;
    this.commonService.sortTaskArray(this.taskArray)
    this.taskForm.reset();
    this.isTaskFormVisible = false;
  }

  /**
   * Method to check form control validity
   * 
   * @param controlName
   */
  checkFormControlValidity(controlName: string) {
    const control = this.taskForm.get(controlName);
    if (control.invalid && control.touched) {
      this.formControlErrors[controlName] = this.getFormControlErrorMessage(controlName);
    } else {
      delete this.formControlErrors[controlName];
    }
  }

  /**
   * Method to check if FormControlError has property
   * 
   * @param controlName 
   * @returns boolean
   */
  isFormControlInvalid(controlName: string): boolean {
    return this.formControlErrors.hasOwnProperty(controlName);
  }

  /**
   * Method to get the Form Control Error Message
   * 
   * @param controlName 
   * @returns string
   */
  getFormControlErrorMessage(controlName: string): string {
    const control = this.taskForm.get(controlName);
    const errors = control.errors;
    return new ValidationErrorPipe().transform(errors, controlName);
  }


  /**
   * Method to Validate if selected Date is a week day.
   *
   * @param control
   * @returns error
   */
  weekendValidator(control: FormControl) {
    const selectedDay =  new Date(control.value).getDay()
    const isWeekEnd = selectedDay === 0 || selectedDay === 6;
    return isWeekEnd ? { isWeekend: true } : null;
  }

  /**
   * Method to Validate if selected Date is a Holiday 
   * 
   * @param control 
   * @returns error
   */
  isHolidayValidator(control: FormControl) {
    const selectedDate = new Date(control.value);

    const invalid = this.holidayFormArray.controls.some((holiday: AbstractControl) => {
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
    this.taskArray.at(index).get('isEditMode').setValue(true);
  }

  /**
   * Method to update the edited values and end Editing mode.
   *
   * @param index
   */
  finishEditing(index: number) {
    this.taskArray.at(index).patchValue(this.taskForm.value)
    this.taskArray.at(index).get('isEditMode').setValue(false);
    this.commonService.sortTaskArray(this.taskArray)
    this.taskForm.reset()
  }

  /**
   * Method to close the task form while editing and reset the entries
   *
   */
  cancelEditing(index: number) {
    this.taskArray.at(index).get('isEditMode').setValue(false);
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
