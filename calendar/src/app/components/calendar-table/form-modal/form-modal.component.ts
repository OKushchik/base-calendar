import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';




import * as _moment from 'moment';
import 'moment/locale/pt-br';

// import {default as _rollupMoment} from 'moment';

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
  result:Number;
  dateCountTitle:String;


constructor(){
  moment.locale('ru');
  this.result = 1;
  this.dateCountTitle = "Day"
  this.dateFirst = new Date().setHours(0, 0, 0, 0)
  this.dateSecond = new Date().setHours(0, 0, 0, 0)
  

}
ngOnInit(): void {

}


 minDate = new Date();
 date = new FormControl(moment());
 selectedValue: string;

 panelStates = new FormControl('Paid PD');
 states: string[] = [
  'Paid PD', 'Unpaid UP'
];
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
  if(this.result > 1) {
    this.dateCountTitle = "Days"
  }
}
}
