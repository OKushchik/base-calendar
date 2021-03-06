import { Injectable } from '@angular/core';
import { User, UserRealm } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private _url: string = " http://localhost:3000/users"

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this._url)
  }
}
