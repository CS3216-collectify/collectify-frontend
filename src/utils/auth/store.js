import { USER_ID_KEY, REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY, IS_GUEST_KEY } from "./constants";

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const isGuest = () => {
  return localStorage.getItem(IS_GUEST_KEY) ?? false;
};

export const getAuthorizationValue = () => {
  return `Bearer ${getAccessToken()}`;
};

export const hasAccessTokenStored = () => {
  return getAccessToken() !== null;
}

export const hasRefreshTokenStored = () => {
  return getRefreshToken() !== null;
}
