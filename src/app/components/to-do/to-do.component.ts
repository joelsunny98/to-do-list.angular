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

  /**
   * Method to build the Forms
   */
  buildForm() {
    this.taskForm = this.formbuilder.group({
      date: [Date, Validators.required],
      task: ['', Validators.required],
      remarks: ['']
    });
  }

  /**
   * Method to add a new Task to FormArray
   */
  addFormGroup() {
    this.taskArray.push(this.taskForm);
  }
}
