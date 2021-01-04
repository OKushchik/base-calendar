import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-month-switcher',
  templateUrl: './month-switcher.component.html',
  styleUrls: ['./month-switcher.component.css']
})
export class MonthSwitcherComponent implements OnInit {
  
  date:Date
  value:any
  constructor(private _dateService: DateService) {
    this.date = new Date
   }

  ngOnInit() {
    this._dateService.switchMonth().subscribe(
      (val) => {
        this.date = val
        if(this.date.getMonth()<10){
          this.value = `${this.date.getFullYear()}-0${this.date.getMonth()+1}`
        } else {
          this.value = `${this.date.getFullYear()}-${this.date.getMonth()+1}`
        }
      }
    )
  }

  switchMonth(direction: number) {
    this._dateService.switchMonth(direction)
  }
  switchMonthInput(val) {
    this._dateService.switchMonthInput(val)
  }

}
