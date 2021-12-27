import cookie from "cookie";
import { StorageEnum } from "@enums";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function getAuthorizationHeader(req = null) {
  const cookies = parseCookies(req);

  return { "Authorization": cookies[StorageEnum.TOKEN] };
}