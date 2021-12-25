import api from "./api";

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
