import { getAuthorizationHeader } from "@core";
import api from "./api";

const endpoint = "interest";

export function getAnnouncementInterests(announcementId) {
  const headers = getAuthorizationHeader();

  return api.get(`${endpoint}/announcement/${announcementId}`, { headers });
}

export function declineInterest(interestId) {
  const headers = getAuthorizationHeader();

  return api.post(`${endpoint}/${interestId}/decline`, null, { headers });
}

export function acceptInterest(interestId) {
  const headers = getAuthorizationHeader();

  return api.post(`${endpoint}/${interestId}/accept`, null, { headers });
}

