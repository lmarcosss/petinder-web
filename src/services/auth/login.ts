import api from "./api";

export function doLogin(email, password) {
  return api.post("login", {
    email,
    password
  });
}
