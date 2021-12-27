import { StorageEnum } from "@enums";
import { useCookies } from "react-cookie";

const COOKIE_CONFIG = {
  path: "/",
  maxAge: 3600,
  sameSite: true
};

export function useToken() {
  const [cookie, setCookie, removeCookie] = useCookies([StorageEnum.TOKEN]);
  
  const clearToken = () => removeCookie(StorageEnum.TOKEN, COOKIE_CONFIG);
  const setToken = (tokenType, token) => setCookie(
    StorageEnum.TOKEN,
    `${tokenType} ${token}`,
    COOKIE_CONFIG
  );

  return {
    token: cookie.token,
    hasAuth: !!cookie.token,
    setToken,
    clearToken
  };
}
