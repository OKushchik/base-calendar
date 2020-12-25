export enum UserRealm {
  FRONT_END = 'fe',
  BACK_END = 'be',
  DESIGNER = 'designer',
}

export interface User {
  id: number;
  name: string;
  realm: UserRealm;
  vacation: any;
}
