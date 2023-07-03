import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  holidayArray = [
    {
      date: new Date('2023-01-01'),
      task: 'New Year',
    },
    {
      date: new Date('2023-01-26'),
      task: 'Republic Day',
    },
    {
      date: new Date('2023-04-07'),
      task: 'Good Friday',
    },
    {
      date: new Date('2023-04-28'),
      task: 'Ramzan',
    },
    {
      date: new Date('2023-05-01'),
      task: 'May Day',
    },
    {
      date: new Date('2023-07-28'),
      task: 'Bakrid',
    },
    {
      date: new Date('2023-08-15'),
      task: 'Independence Day',
    },
    {
      date: new Date('2023-08-28'),
      task: 'First Onam',
    },
    {
      date: new Date('2023-08-29'),
      task: 'Thiruvonam',
    },
    {
      date: new Date('2023-10-02'),
      task: 'Gandhi Jayanti',
    },
    {
      date: new Date('2023-10-23'),
      task: 'Mahanavami',
    },
    {
      date: new Date('2023-10-24'),
      task: 'Vijayadasami',
    },
    {
      date: new Date('2023-12-25'),
      task: 'Christmas',
    }
  ];

  monthsArray = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

}

