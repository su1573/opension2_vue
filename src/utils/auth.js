import Cookies from "js-cookie";

const TokenKey = "token";

export function getToken(key = TokenKey) {
  return Cookies.get(key);
}

export function setToken(key = TokenKey, token) {
  return Cookies.set(key, token);
}

export function removeToken(key = TokenKey) {
  return Cookies.remove(key);
}
