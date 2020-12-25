import { Component, OnInit } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { UserService } from "../../../services/user.service";
import { User } from "src/app/models/user";
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import * as _moment from 'moment';
import 'moment/locale/pt-br';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
    parentLocale: 'ru',
  },
  display: {
    parentLocale: 'ru',
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY MMMM ',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FormModalComponent implements OnInit {
  dateFirst:Number;
  dateSecond:Number;
  result:Number|string;
  dateCountTitle:String;
  users:User[];
  form: FormGroup
  selectedValue: string;
  isValid:boolean;
  states: string[] = [
  'Pd', 'UnPd'
];
private _url: string = " http://localhost:3000/vacations"

constructor(
  private _userService: UserService,
  private http: HttpClient
  ){
  this.result = 0;
  this.dateCountTitle = "Day"
  this.dateFirst = new Date().setHours(0, 0, 0, 0)
  this.dateSecond = new Date().setHours(0, 0, 0, 0)
  this.users = []
  this.isValid = false
}

ngOnInit() {
  this.form = new FormGroup({
    picker1: new FormControl(),
    picker2: new FormControl(),
    panelStates: new FormControl(),
    user: new FormControl()
  });

  this._userService.getUsers().subscribe((val) => {
    this.users = val;
  });
}

minDate = new Date();

valuechange1 (event){
  this.dateFirst = event._d.getTime()
  this.durationVocation()
}
valuechange2 (event){
  this.dateSecond = event._d.getTime()
  this.durationVocation()
}
durationVocation(){
  this.result = ((+this.dateSecond - +this.dateFirst + 86400000)/86400000);
  this.dateCountTitle = "Day"
  if(this.result > 1) {
    this.dateCountTitle = "Days"
  }
  if(this.result < 1) {
    this.dateCountTitle = "Invalid date"
    this.result = "";
  }
}

user = new FormControl('', Validators.required);
picker1 = new FormControl('', Validators.required);
picker2 = new FormControl('', Validators.required);
date = new FormControl(moment(), Validators.required);
panelStates = new FormControl('', Validators.required);

submit() {
  let formData = this.form.value;

  let userObj = {
    id: new Date().getTime(),
    startDate: this.convertDate (formData.picker1._d),
    endDate: this.convertDate (formData.picker2._d),
    userId: formData.user.id,
    type: formData.panelStates
    }

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    this.http.post(this._url, JSON.stringify(userObj), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
      document.location.reload();
    });
    
}

convertDate (date){
  let month:Number | String = new Date(date).getMonth()+1
  let day:Number | String = new Date(date).getDate()
  let year = new Date(date).getFullYear()
  if(day<10){
    day = '0'+ day
  }
  if(month<10){
    month = '0'+ month
  }
  return (`${day}.${month}.${year}`)
}

}
