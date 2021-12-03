import api from "./api";

export function getAnnouncements() {
  return api.get("announcement");
}
