import { getAuthorizationHeader } from "@core";
import { IAnnouncementEdit } from "@types";
import api from "./api";

const endpoint = "announcement";

export function getOpennedAnnouncements() {
  return api.get(endpoint);
}

export function createAnnouncement(announcement: IAnnouncementEdit) {
  const headers = getAuthorizationHeader();

  return api.post(endpoint, announcement, { headers });
}

export function getMyAnnouncements(req) {
  const headers = getAuthorizationHeader(req);

  return api.get(`${endpoint}/user`, { headers });
}
