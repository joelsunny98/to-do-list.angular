import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HolidayService } from 'src/app/services/holiday.service';
import { MonthService } from 'src/app/services/month.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']

})
export class ToDoComponent implements OnInit {
  taskForm!: FormGroup;
  taskArray!: FormArray;
  holidayFormArray!: FormArray ;
  editMode: boolean[] = [];
  selectedMonth: number = new Date().getMonth()+1;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly holidayService: HolidayService,
    public monthService: MonthService
  ) {
    this.taskArray = this.formBuilder.array([]);
    this.holidayFormArray = this.formBuilder.array([]);
  }

  ngOnInit(): void {
    this.taskArray = this.getHolidays();
    this.buildForm();
  }

  /**
   * Method to check to sort task according to the month.
   *
   * @param date
   * @returns boolean
   */
  isThisMonth(date: string) {
    const selectedDate = new Date(date);
    if (selectedDate.getMonth() + 1 == this.selectedMonth) {
      return true;
    } else {
      return false
    }
  }

  /**
   * Method to get the drop down value of the month. 
   *
   * @param event 
   */
  onDropDownChange(event: Event) {
    this.selectedMonth = parseInt((event.target as HTMLSelectElement).value);
    console.log(this.selectedMonth)
  }

  /**
   * Method to generate form array with Holidays.
   * 
   * @returns Holiday Form Array
   */
  getHolidays() {
    for (const holiday of this.holidayService.holidayArray) {
      const formGroup = this.formBuilder.group({
        date: holiday.date,
        task: holiday.task,
        remarks: holiday.remarks
      });
      this.holidayFormArray.push(formGroup)
    }

    return this.holidayFormArray;
  }

  /**
   * Method to build the Forms
   */
  buildForm() {
    this.taskForm = this.formBuilder.group({
      date: [Date, [Validators.required, this.weekendValidator]],
      task: ['', Validators.required],
      remarks: ['']
    });
  }

  /**
   * Method to create a new form group for every task
   *
   * @param date
   * @param task
   * @param remarks
   * @returns Form Group
   */
  createNewFormGroup(date: Date, task: string, remarks: string): FormGroup {
    return this.formBuilder.group({
      date: [date, [Validators.required, this.weekendValidator]],
      task: [task, Validators.required],
      remarks: remarks
    });
  }

  /**
   * Method to add a new Task to FormArray
   */
  addFormGroup() {
    if (this.taskForm.valid) {
      const { date, task, remarks } = this.taskForm.value;
      const newTaskFormGroup = this.createNewFormGroup(date, task, remarks);
      this.taskArray.push(newTaskFormGroup);
      this.taskForm.reset();

      this.editMode = Array(this.taskArray.length).fill(false);
    }
  }

  /**
   * Method to Validate is selected Date is a week day. 
   *
   * @param control 
   * @returns error
   */
  weekendValidator(control: FormControl) {
    const form = control.parent
    const selectedDate= new Date(form?.get('date')?.value);
    const day = selectedDate.getDay()

    const isWeekEnd = day === 0 || day === 6;
    return isWeekEnd ? { isWeekend: true } : null;
  }

  /**
   * Method to patch value to edit form and start editing Mode.
   * 
   * @param index 
   */
  startEditing(index: number) {
    this.editMode = Array(this.taskArray.length).fill(false);
    const taskGroup = this.taskArray.at(index) as FormGroup;
    this.taskForm.patchValue(taskGroup.value);
    this.editMode[index] = true;
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
      this.editMode[index] = false;
      this.taskForm.reset()
    }
  }

  /**
   * Method to get current Date.
   *
   * @returns Date
   */
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

}
