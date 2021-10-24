import server from "./server";

const USER_ID_KEY = "userId";
const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_KEY = "accessToken";
const IS_GUEST_KEY = "isGuest";

const AUTHORIZATION_HEADER = "Authorization";
const formatAuthorizationValue = (accessToken) => {
  return `Bearer ${accessToken}`;
};

export const getUserId = () => {
  // TODO: Null Handling (if userId not in local storage)
  return localStorage.getItem(USER_ID_KEY);
};

export const getRefreshToken = () => {
  // TODO: Null handling
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = () => {
  // TODO: Null handling
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getIsGuest = () => {
  // TODO: Null handling
  return localStorage.getItem(IS_GUEST_KEY);
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
