import { getAuthorizationHeader } from "@core";
import { IAnnouncement, IAnnouncementCreate, IAnnouncementEdit } from "@types";
import { AxiosPromise } from "axios";
import api from "./api";

const endpoint = "announcement";

export function getOpennedAnnouncements() {
  return api.get(endpoint);
}

export function createAnnouncement(announcement: IAnnouncementCreate): AxiosPromise<IAnnouncement> {
  const headers = getAuthorizationHeader();

  return api.post(endpoint, announcement, { headers });
}

export function editAnnouncement(announcement: IAnnouncementEdit) {
  const headers = getAuthorizationHeader();

  return api.put(`${endpoint}/${announcement.id}`, announcement, { headers });
}

export function getMyAnnouncements(req) {
  const headers = getAuthorizationHeader(req);

  return api.get(`${endpoint}/user`, { headers });
}