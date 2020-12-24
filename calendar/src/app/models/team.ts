import { User, UserRealm } from './user';

export interface Team {
  realm: UserRealm;
  participants: User[];
  procent: Number;
}
