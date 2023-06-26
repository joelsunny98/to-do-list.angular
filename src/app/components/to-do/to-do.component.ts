import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    private readonly formbuilder: FormBuilder
  ) {
    this.taskArray = this.formbuilder.array([]);
  }

  ngOnInit(): void {
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

  addFormGroup() {
  }
}
