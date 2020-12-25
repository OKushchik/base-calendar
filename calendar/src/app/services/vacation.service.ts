import { Injectable } from '@angular/core';
import { Vacation } from 'src/app/models/vacation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class VacationService {
  vacations:[]
  
  constructor(private http: HttpClient) {
    this.vacations = [];
  }

  private _url: string = " http://localhost:3000/vacations"
  
  getVacations():Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this._url)
  }
}
