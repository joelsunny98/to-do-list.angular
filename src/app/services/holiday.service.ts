import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HOLIDAYS_ARRAY } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  holidayFormArray: FormArray;

  constructor(private readonly formBuilder: FormBuilder) {
    this.holidayFormArray = this.formBuilder.array([])
  }

  getFormArray() {
    for (const holiday of HOLIDAYS_ARRAY) {
      const formGroup = this.formBuilder.group({
        date: holiday.date,
        task: holiday.task,
        remarks: holiday.remarks
      });
      this.holidayFormArray.push(formGroup)
    }

    return this.holidayFormArray;
  }
}
