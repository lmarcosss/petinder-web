import { AnnouncementStatusEnum } from "enums";
import { IUser } from "./UserType";

export interface IPicture {
  id: number;
  url: string;
}

export interface IAnnouncement {
  id: number;
  description: string;
  status: AnnouncementStatusEnum;
  pictures: IPicture[];
  owner: IUser;
  closed: boolean;
}
