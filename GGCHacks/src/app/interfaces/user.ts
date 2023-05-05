import {Application} from './application';

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  adminLevel: number;
  registeredFor: number[];
  pastHacks: string[];
  application: Application;
}