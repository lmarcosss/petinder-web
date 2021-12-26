import api from "./api";
import { getAuthorizationHeader } from "@core";

export function doRegister({
  name,
  birthDay,
  cpf,
  phone,
  description,
  email,
  password
}) {
  return api.post("user", {
    name,
    birthDay,
    cpf,
    phone,
    description,
    email,
    password
  });
}

export function getUserInfo(req) {
  const headers = getAuthorizationHeader(req);

  return api.get("user/info", { headers });
}

export function saveUser({
  cpf,
  name,
  phone,
  birthDay,
  email,
  description
}) {
  const headers = getAuthorizationHeader();
  
  return api.put("user", {
    cpf,
    name,
    phone,
    birthDay,
    email,
    description
  }, { headers });
}