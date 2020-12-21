import { Injectable } from '@angular/core';
import { User, UserRealm } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // observable:Observable<User[]>
  
  constructor() {
    // this.observable = new Observable<User[]>();
   }

   users: User[] = [
    {
      id:1,
      name: 'FE_User_1',
      realm: UserRealm.FRONT_END
    },
    {
      id:2,
      name: 'FE_User_2',
      realm: UserRealm.FRONT_END
    },
    {
      id:3,
      name: 'FE_User_3',
      realm: UserRealm.FRONT_END
    },
    {
      id:4,
      name: 'BA_User_1',
      realm: UserRealm.BACK_END
    },
    {
      id:5,
      name: 'BA_User_2',
      realm: UserRealm.BACK_END
    },
    {
      id:6,
      name: 'DS_User_1',
      realm: UserRealm.DESIGNER
    }
  ]

  getUsers() {
    return new Observable<User[]>(subscriber => {
      subscriber.next(this.users);
    })
  }
  

  // getUserById(): Observable<User>
}
