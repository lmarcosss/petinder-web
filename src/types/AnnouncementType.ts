import { AnnouncementStatusEnum } from "enums";
import { IResponseUser } from "./UserType";

export interface IPicture {
  id: number;
  url: string;
}

export interface IAnnouncementEdit {
  id: number;
  title: string;
  description: string;
  picture: IPicture[];
}

export interface IAnnouncement {
  id: number;
  title: string;
  description: string;
  status: AnnouncementStatusEnum;
  pictures: IPicture[];
  owner: IResponseUser;
  closed: boolean;
  location: string;
}

export interface IAnnouncementForm extends IStepOneAnnouncement, IStepTwoAnnouncement {}

export interface IStepOneAnnouncement {
  title: string;
  description: string;
}

export interface IStepTwoAnnouncement {
  pictures: IPicture[];
}
