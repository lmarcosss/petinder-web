import { AnnouncementStatusEnum } from "enums";
import { IResponseUser } from "./UserType";

export interface IPicture {
  id: number;
  url: string;
}

export interface IAnnouncement {
  id: number;
  description: string;
  status: AnnouncementStatusEnum;
  pictures: IPicture[];
  owner: IResponseUser;
  closed: boolean;
  location: string;
}
