import { Component, OnInit } from "@angular/core";
import { Day } from "src/app/models/day";
import { Team } from "src/app/models/team";
import { User, UserRealm } from "src/app/models/user";
import { Vacation } from "src/app/models/vacation";
import { DateService } from "../../services/date.service";
import { UserService } from "../../services/user.service";
import { VacationService } from "../../services/vacation.service";
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from "../calendar-table/form-modal/form-modal.component";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: "app-calendar-table",
  templateUrl: "./calendar-table.component.html",
  styleUrls: ["./calendar-table.component.css"],
})
export class CalendarTableComponent implements OnInit {
  private teams: Array<Team>;
  date: Date;
  daysInMonth: Number;
  arrOfDays: Array<Day>;
  arr: Array<any>
  obs:any
  isLoading: boolean
  users: User[];
  vacations: Vacation[];
  hideme: any = {};
  vacationType: boolean = true;
  procentInFooter: Number;

  constructor(
    private _dateService: DateService,
    private _userService: UserService,
    private _vacationService: VacationService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    this.date = new Date();
    this.vacations = _vacationService.vacations
    this.procentInFooter = 0;
    }

  ngOnInit() {
    this.getDaysInMonth();
    this.getArrOfDays();
    this.isLoading = true;
    

    this._dateService.switchMonth().subscribe((val) => {
      this.date = val;
      this.getDaysInMonth();
      this.getArrOfDays();
      this.checkVacation()
      this.addVacationToUser ()
    });

    this._userService.getUsers().subscribe((val) => {
      this.users = val;
      this.getTeams();
      this.checkVacation()
      // this.addVacationToUser();
      this.isLoading = false;
    });

    this._vacationService.getVacations().subscribe((val) => {
      this.vacations = val;
      this.checkVacation();
      this.addVacationToUser()
    });
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
        realm: <UserRealm>key,
        participants: [],
        procent:0
      });
    }
    for (let key in this.teams){
      for (let keyuser in this.users){
        if (UserRealm[this.teams[key].realm] == this.users[keyuser].realm){
          this.teams[key].participants.push(this.users[keyuser]);
        }
      }
    }

  }

  procentVacationInTeam(){
    for (let i = 0; i < this.teams.length; i++) {
       let countDaysInVacation = 0
      for (let j = 0; j < this.teams[i].participants.length; j++) {
        for (let k = 0; k < this.teams[i].participants[j].vacation.length; k++) {
          countDaysInVacation += this.teams[i].participants[j].vacation[k].duration
        }
      }
      this.teams[i].procent = Math.round(countDaysInVacation/(+this.daysInMonth*this.teams[i].participants.length)*100)
    }
    this.getProcentInFooter () 
  }

  getProcentInFooter () {
    let count = 0
    for (let i = 0; i < this.teams.length; i++) {
      count = count + Number(this.teams[i].procent)
    }
    this.procentInFooter = count / this.teams.length
  }


  convertedDate(day){
    return new Date(day.split(".").reverse().join("-"))
  }

  checkVacation(){
    let currentMonth = {
      start: new Date(this.date.getFullYear(), this.date.getMonth(), 1).getTime(),
      end: new Date(this.date.getFullYear(), this.date.getMonth()+1, 1).getTime()-1,
    }
    this.arr = [];
    for (let i = 0; i < this.vacations.length; i++) {
      if(this.convertedDate(this.vacations[i].startDate).getTime() > currentMonth.start &&
         this.convertedDate(this.vacations[i].endDate).getTime() < currentMonth.end){
      let obj = {
        id: this.vacations[i].userId,
        idVacation: this.vacations[i].id,
        start: this.convertedDate(this.vacations[i].startDate).getDate(),
        end: this.convertedDate(this.vacations[i].endDate).getDate(),
        duration: this.convertedDate(this.vacations[i].endDate).getDate() - this.convertedDate(this.vacations[i].startDate).getDate() + 1,
        type:this.vacations[i].type
      }
      this.arr.push(obj)
      }
      if(this.convertedDate(this.vacations[i].startDate).getTime() > currentMonth.start &&
         this.convertedDate(this.vacations[i].endDate).getTime() > currentMonth.end &&
         this.convertedDate(this.vacations[i].startDate).getTime() < currentMonth.end){
          let obj = {
            id: this.vacations[i].userId,
            idVacation: this.vacations[i].id,
            start: this.convertedDate(this.vacations[i].startDate).getDate(),
            end: this.daysInMonth,
            duration: +this.daysInMonth - this.convertedDate(this.vacations[i].startDate).getDate() + 1,
            type:this.vacations[i].type
          }
          this.arr.push(obj)
         }
      if(this.convertedDate(this.vacations[i].startDate).getTime() < currentMonth.start &&
        this.convertedDate(this.vacations[i].endDate).getTime() < currentMonth.end &&
        this.convertedDate(this.vacations[i].endDate).getTime() > currentMonth.start){
        let obj = {
          id: this.vacations[i].userId,
          idVacation: this.vacations[i].id,
          start: 1,
          end: this.convertedDate(this.vacations[i].endDate).getDate(),
          duration: this.convertedDate(this.vacations[i].endDate).getDate(),
          type:this.vacations[i].type
        }
        this.arr.push(obj)
      }
      if(this.convertedDate(this.vacations[i].startDate).getTime() < currentMonth.start &&
      this.convertedDate(this.vacations[i].endDate).getTime() > currentMonth.end){
      let obj = {
        id: this.vacations[i].userId,
        idVacation: this.vacations[i].id,
        start: 1,
        end: this.daysInMonth,
        duration: this.daysInMonth,
        type:this.vacations[i].type
      }
      this.arr.push(obj)
    }

    }
  }
  
  addVacationToUser (){
    if (this.users){
      for(let i=0; i<this.users.length; i++){
        this.users[i].vacation = []
        for(let j=0; j<this.arr.length; j++) {
          if(this.users[i].id === this.arr[j].id){
            this.users[i].vacation.push(this.arr[j])
          }
        }  
      }
    }
    this.procentVacationInTeam()
  }

  countSum(vacations:any){
    let sum : number = 0;
    if(vacations){
      vacations.forEach((elem) => {
        sum += elem.duration;
        this.arrOfDays.forEach((element)=>{
          if(element.num >= elem.start && element.num <= elem.end && element.isWeekend){
            sum -= 1;
          }
        });
      });
    }

    return sum;
  }

  countStats(day:Day){
    let sum :number= 0;
    if(this.users){
      if(day.isWeekend){
      return;
      }
      this.users.forEach(user => {
        user.vacation.forEach(vacation => {
          if(day.num>=vacation.start && day.num <= vacation.end){
            sum+=1;
          }
        });
      });
    }
    return sum;
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteVacation(event){
    let test = confirm("Delete this vacation?")
    if(test){
    let _url = " http://localhost:3000/vacations"
    let endPoints = `/${event.target.closest('.vacation').getAttribute('data-id')}`
    this.http.delete(_url + endPoints).subscribe(data => {
      console.log(data);
    });
    document.location.reload();
    }
  }
}

