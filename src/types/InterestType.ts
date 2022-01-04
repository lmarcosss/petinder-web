import { IUser } from "./UserType";

export interface IInterest {
  id: number;
  status: string;
  interested: IUser;
}