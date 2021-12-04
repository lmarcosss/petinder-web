import { AnnouncementStatusEnum } from "enums";
import api from "./api";

export function getOpennedAnnouncements() {
  return api.get("announcement", {
    params: {
      status: AnnouncementStatusEnum.ABERTO
    }
  });
}
