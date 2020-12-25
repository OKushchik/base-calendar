import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DateService {
  
  date: Date;
  subject:Subject<Date>

  constructor() {
    this.date = new Date;
    this.subject = new Subject();
  }

  switchMonth(direction:any = 0) { 
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + direction, 1);
    this.subject.next(this.date)
    return this.subject
  }
}