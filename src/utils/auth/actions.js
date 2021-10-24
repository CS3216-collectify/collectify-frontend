import server from "../server";
import { USER_ID_KEY, REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY, IS_GUEST_KEY, AUTHORIZATION_HEADER } from "./constants";

const formatAuthorizationValue = (accessToken) => {
  return `Bearer ${accessToken}`;
};

export const logoutUser = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);

  localStorage.removeItem(IS_GUEST_KEY);

  delete server.defaults.headers[AUTHORIZATION_HEADER];
};

export const loginUser = (loginData) => {
  const { access: accessToken, refresh: refreshToken, id: userId } = loginData;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  
  if (localStorage.getItem(USER_ID_KEY) === null || localStorage.getItem(USER_ID_KEY) === undefined) {
    localStorage.setItem(USER_ID_KEY, userId);
  }

  localStorage.removeItem(IS_GUEST_KEY);

  server.defaults.headers[AUTHORIZATION_HEADER] = formatAuthorizationValue(accessToken);
  return loginData;
};

export const loginGuest = () => {
  logoutUser();

  localStorage.setItem(IS_GUEST_KEY, true);
};

export const storeUserId = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
}
