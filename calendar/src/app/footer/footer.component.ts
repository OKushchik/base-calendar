import { Component, OnInit } from '@angular/core';
import { Day } from "src/app/models/day";
import { Team } from "src/app/models/team";
import { Vacation } from "src/app/models/vacation";
import { User, UserRealm } from "src/app/models/user";
import { DateService } from "../services/date.service";
import { UserService } from "../services/user.service";
import { VacationService } from "../services/vacation.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private teams: Array<Team>;
  vacations: Vacation[];
  date:Date
  users: User[];
  constructor(private _dateService: DateService,private _userService: UserService,
    private _vacationService: VacationService,) {
    this.date = new Date
   }
 

  ngOnInit() {
    this._dateService.switchMonth().subscribe(
      (val) => this.date = val
    )
  }


  }


