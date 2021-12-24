import { StorageEnum } from "@enums";

export function useToken() {
  const isClientSide = typeof window !== "undefined" && window.localStorage;

  if (!isClientSide) return {};

  const token = localStorage.getItem(StorageEnum.TOKEN);
  
  const clearToken = () => localStorage.removeItem(StorageEnum.TOKEN);
  const setToken = (tokenType, token) => localStorage.setItem(StorageEnum.TOKEN, `${tokenType} ${token}`);

  return {
    token,
    hasAuth: !!token,
    setToken,
    clearToken
  };
}
