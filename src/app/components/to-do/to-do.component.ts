import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']

})
export class ToDoComponent implements OnInit {
  fields: string[] = [];
  model = {
    date: Date,
    task: '',
    remarks: ''
  };
  taskForm!: FormGroup;
  taskArray!: FormArray;

  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly holidayService: HolidayService
  ) {
    this.taskArray = this.formbuilder.array([]);
  }

  ngOnInit(): void {
    this.taskArray = this.holidayService.getFormArray();
    this.buildForm();
  }

  buildForm() {
    const formGroupFields = this.getFormControlField();
    this.taskForm = new FormGroup(formGroupFields);
    this.taskArray.push(this.taskForm);
    console.log(this.taskArray);
  }

  getFormControlField() {
    const formGroupFields: { [key: string]: FormControl } = {};
    for (var field of Object.keys(this.model)) {
      formGroupFields[field] = new FormControl("");
      this.fields.push(field);
    }
    return formGroupFields;
  }

  /**
   * Method to add a new Task to FormArray
   */
  addFormGroup() {
    const newForm = this.formbuilder.group({
      date : [Date, Validators.required],
      task: ['', Validators.required],
      remarks: ['']
    });

    this.taskArray.push(newForm);
  }
}
