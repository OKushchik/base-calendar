import { Component, OnInit } from "@angular/core";
import { send } from "process";
import { Day } from "src/app/models/day";
import { Team } from "src/app/models/team";
import { User, UserRealm } from "src/app/models/user";
import { Vacation } from "src/app/models/vacation";
import { DateService } from "../../services/date.service";
import { UserService } from "../../services/user.service";
import { VacationService } from "../../services/vacation.service";

@Component({
  selector: "app-calendar-table",
  templateUrl: "./calendar-table.component.html",
  styleUrls: ["./calendar-table.component.css"],
})
export class CalendarTableComponent implements OnInit {
  // private teams: { [key in UserRealm]?: Team } = {};
  private teams: Array<Team>;
  date: Date;
  daysInMonth: Number;
  arrOfDays: Array<Day>;

  users: User[];
  vacations: Vacation[];

  constructor(
    private _dateService: DateService,
    private _userService: UserService,
    private _vacationService: VacationService
  ) {
    this.date = new Date();
    // this.vacations = _vacationService.vacations
  }

  ngOnInit() {
    this.getDaysInMonth();
    this.getArrOfDays();
    console.log(this.arrOfDays);

    this._dateService.switchMonth().subscribe((val) => {
      this.date = val;
      this.getDaysInMonth();
      this.getArrOfDays();
    });

    this._userService.getUsers().subscribe((val) => {
      this.users = val;
      this.getTeams();
      console.log(this.users);
    });

    this._vacationService.getVacations().subscribe((val) => {
      this.vacations = val;
      console.log(this.vacations);
    });

   


    // you need to get users
    // then construct your team by getting users, such as

    // this.teams[user.realm] = {
    //   realm: user.realm,
    //   participants: []
    // };

    // and then add users to teams, such as
    /*
    * if (user.realm in this.teams) {
        this.teams[user.realm].participants.push(user);
      }
    * */
    // for now you should be have a teams
  }

  getDaysInMonth() {
    this.daysInMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
  }

  getArrOfDays() {
    this.arrOfDays = [];
    for (let i = 0; i < this.daysInMonth; i++) {
      this.arrOfDays.push({
        num: i + 1,
        week: new Date(this.date.getFullYear(), this.date.getMonth(), i + 1)
          .toString()
          .slice(0, 2),
        isWeekend: false,
      });
    }
    this.getWeekend();
  }

  getWeekend() {
    for (let i = 0; i < this.arrOfDays.length; i++) {
      if (this.arrOfDays[i].week == "Sa" || this.arrOfDays[i].week == "Su") {
        this.arrOfDays[i].isWeekend = true;
      }
    }
  }

  getTeams() {
    this.teams = [];
    for (let key in UserRealm) {
      this.teams.push({
        realm: UserRealm[String(key)],
        participants: [],
      });
    }
  }
  // getVacation() {
  //   let currentMonth = {
  //     start: new Date(this.date.getFullYear(), this.date.getMonth(), 1).getTime(),
  //     end: new Date(this.date.getFullYear(), this.date.getMonth()+1, 1).getTime()-1,

  //   }
  //   let currentVacation = {
  //     start: this.convertedDate(this.vacation.start).getTime(),
  //     end: this.convertedDate(this.vacation.end).getTime()-1
  //   }
  //   console.log(currentMonth)
  //   console.log(currentVacation)
  // }

  convertedDate(day){
    return new Date(day.split(".").reverse().join("-"))
  }
  // get teamsEntity(): Team[] {}

  // monthDaysEntity(): Day[] {}

  // generateMonth(date: Date): Month {} // should to get month

  // you can create the structure yourself too
}
