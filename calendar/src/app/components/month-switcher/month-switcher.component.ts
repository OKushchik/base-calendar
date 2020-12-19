import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-month-switcher',
  templateUrl: './month-switcher.component.html',
  styleUrls: ['./month-switcher.component.css']
})
export class MonthSwitcherComponent implements OnInit {
  
  date:Date

  constructor(private _dateService: DateService) {
    this.date = new Date
   }

  ngOnInit() {
    this._dateService.switchMonth().subscribe(
      (val) => this.date = val
    )
  }

  switchMonth(direction: number) {
    this._dateService.switchMonth(direction)
  }

}
