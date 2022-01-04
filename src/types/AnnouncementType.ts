import { AnnouncementStatusEnum } from "enums";
import { IResponseUser } from "./UserType";

export interface IPicture {
  id: number;
  url: string;
}

export interface IAnnouncementEdit {
  pictures: string[];
  title: string;
  description: string;
  id: number;
  status: AnnouncementStatusEnum;
  owner: IResponseUser;
  closed: boolean;
}

export interface IAnnouncementCreate {
  pictures: string[];
  longitude: number;
  latitude: number;
  title: string;
  description: string;
}

export interface IAnnouncement {
  id: number;
  title: string;
  description: string;
  status: AnnouncementStatusEnum;
  pictures: IPicture[];
  owner: IResponseUser;
  closed: boolean;
  city: string;
  interestStatus: string;
  isMyAnnouncement: boolean;
}

export interface IAnnouncementForm {
  title: string;
  description: string;
  picture: string;
}
