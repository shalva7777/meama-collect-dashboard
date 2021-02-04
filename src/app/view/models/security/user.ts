import {Role} from './role';

export class User {
  public id: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public personalId: string;
  public email: string;
  public sapCode: string;
  public phone: string;
  public password: string;
  public active: boolean;
  public changePassword: boolean;
  public rating: number;
  public imageUrl: string;
  public type: string;
  public roles: Role[];
  public privileges: {};
}
