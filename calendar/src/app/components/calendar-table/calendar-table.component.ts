import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.css']
})
export class CalendarTableComponent implements OnInit {

  // private teams: { [key in UserRealm]?: Team } = {};
  date: Date;
  daysInMonth: Number;
  arrOfDays: Array<any>;

  constructor(private _dateService: DateService) {
    this.date = new Date
   }

  ngOnInit() {
    
    this.getDaysInMonth ();
    this.getArrOfDays ();

    this._dateService.switchMonth().subscribe(
      (val) => {
        this.date = val
        this.getDaysInMonth ();
        this.getArrOfDays ()
      })
      


    // you need to get users
    // then construct your team by getting users, such as
    /*
    * this.teams[user.realm] = {
          realm: user.realm,
          participants: []
        };
    * */
    // and then add users to teams, such as
    /*
    * if (user.realm in this.teams) {
        this.teams[user.realm].participants.push(user);
      }
    * */
    // for now you should be have a teams
  }
  
  getDaysInMonth () {
    this.daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
  }

  getArrOfDays (){
    this.arrOfDays = [];
    for(let i = 0; i<this.daysInMonth; i++){
      this.arrOfDays.push({
        num:i+1,
        week: new Date(this.date.getFullYear(), this.date.getMonth(), i+1).toString().slice(0, 2),
        isWeekend: false
      })
    }
    this.getWeekend();
  }

  getWeekend (){
    for(let i = 0; i<this.arrOfDays.length; i++){
      if(this.arrOfDays[i].week == 'Sa' || this.arrOfDays[i].week == 'Su') {
        this.arrOfDays[i].isWeekend = true
      }
    }

  }
  // get teamsEntity(): Team[] {}

  // monthDaysEntity(): Day[] {}

  // generateMonth(date: Date): Month {} // should to get month

  // you can create the structure yourself too

}
