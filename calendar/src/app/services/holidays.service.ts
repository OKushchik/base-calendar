import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  arrHolidays:Array<String>
  constructor() { 
    this.arrHolidays = [
      "01-01-2021",
      "07-01-2021",
      "14-02-2021"
    ]
  }
  getHolidayInCurrentMonth (currentMonth){
    let arrHolidays = []
    for(let i=0; i<this.arrHolidays.length; i++){
      
      if(+this.arrHolidays[i].split('-')[1] === currentMonth) {
        arrHolidays.push(+this.arrHolidays[i].split('-')[0])
      }
      
    }
  return arrHolidays
  }
}
