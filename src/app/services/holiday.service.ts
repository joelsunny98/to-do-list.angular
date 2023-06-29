import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HOLIDAYS_ARRAY } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  holidayArray = [
    {
      date: new FormControl(new Date('2023-01-01')),
      task: new FormControl('New Year'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-01-26')),
      task: new FormControl('Republic Day'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-04-07')),
      task: new FormControl('Good Friday'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-04-28')),
      task: new FormControl('Ramzan'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-05-01')),
      task: new FormControl('May Day'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-07-28')),
      task: new FormControl('Bakrid'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-08-15')),
      task: new FormControl('Independence Day'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-08-28')),
      task: new FormControl('First Onam'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-08-29')),
      task: new FormControl('Thiruvonam'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-10-02')),
      task: new FormControl('Gandhi Jayanti'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-10-23')),
      task: new FormControl('Mahanavami'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-10-24')),
      task: new FormControl('Vijayadasami'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    },
    {
      date: new FormControl(new Date('2023-12-25')),
      task: new FormControl('Christmas'),
      remarks: new FormControl(''),
      isHoliday: new Boolean(true)
    }
  ]; ;
}
