import { FormGroup, FormControl, Validators } from '@angular/forms';

export const HOLIDAYS_ARRAY = [
  {
    date: new FormControl(new Date('2023-01-01'), Validators.required),
    task: new FormControl('New Year', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-01-26'), Validators.required),
    task: new FormControl('Republic Day', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-04-07'), Validators.required),
    task: new FormControl('Good Friday', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-04-28'), Validators.required),
    task: new FormControl('Ramzan', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-05-01'), Validators.required),
    task: new FormControl('May Day', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-07-28'), Validators.required),
    task: new FormControl('Bakrid', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-08-15'), Validators.required),
    task: new FormControl('Independence Day', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-08-28'), Validators.required),
    task: new FormControl('First Onam', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-08-29'), Validators.required),
    task: new FormControl('Thiruvonam', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-10-02'), Validators.required),
    task: new FormControl('Gandhi Jayanti', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-10-23'), Validators.required),
    task: new FormControl('Mahanavami', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-10-24'), Validators.required),
    task: new FormControl('Vijayadasami', Validators.required),
    remarks: new FormControl('')
  },
  {
    date: new FormControl(new Date('2023-12-25'), Validators.required),
    task: new FormControl('Christmas', Validators.required),
    remarks: new FormControl('')
  }
];
