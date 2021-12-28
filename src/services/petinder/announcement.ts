import { getAuthorizationHeader } from "@core";
import { AnnouncementStatusEnum } from "enums";
import api from "./api";

export function getOpennedAnnouncements() {
  return api.get("announcement", {
    params: {
      status: AnnouncementStatusEnum.ABERTO
    }
  });
}

export function getMyAnnouncements(req) {
  const headers = getAuthorizationHeader(req);

  return api.get("announcement/user", { headers });
}
