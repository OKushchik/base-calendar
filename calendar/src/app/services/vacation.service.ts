import { Injectable } from '@angular/core';
import { Vacation } from 'src/app/models/vacation';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})


export class VacationService {
    vacations: Vacation[] = [ 
     {
      id: 1,
      startDate: "08.12.2020",
      endDate: "11.01.2021",
      userId: 1
     },
     {
      id: 2,
      startDate: "20.02.2020",
      endDate: "22.04.2020",
      userId: 2
     },
     {
      id: 3,
      startDate:  "20.03.2020",
      endDate: "22.03.2020",
      userId: 3
     },
     {
      id: 4,
      startDate:"15.12.2020",
      endDate: "22.12.2020",
      userId: 4
     },
     {
      id: 5,
      startDate: "22.12.2020",
      endDate: "25.12.2020",
      userId: 5
     },
     {
      id: 6,
      startDate: "20.03.2020",
      endDate: "22.03.2020",
      userId: 1
     },
     {
      id: 7,
      startDate: "10.12.2020",
      endDate: "18.12.2020",
      userId: 2
     },
     {
      id: 8,
      startDate: "25.01.2020",
      endDate: "28.01.2020",
      userId: 3
     },
     {
      id: 9,
      startDate: "13.02.2020",
      endDate: "19.02.2020",
      userId: 4
     },
     {
      id: 10,
      startDate: "09.04.2020",
      endDate: "16.04.2020",
      userId: 5
     },
     {
      id: 11,
      startDate: "02.12.2020",
      endDate: "05.12.2020",
      userId: 1
     }
    ]

  getVacations(): Observable<Vacation[]> {
    return new Observable(subscriber => {
      subscriber.next(this.vacations);
     
    })

  }



  // getVacationById(): Observable<Vacation>
}
