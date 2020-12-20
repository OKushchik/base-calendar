export enum UserRealm {
  FRONT_END = 'fe',
  BACK_END = 'be',
  DESIGNER = 'designer',
}

export interface User {
  id: number;
  name: string;
  // email: string;
  // role: string;
  realm: UserRealm;
}
