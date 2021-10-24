import axios from "axios";
import { getAuthorizationValue, getRefreshToken } from "./auth/store";
import { loginUser, logoutUser } from "./auth/actions";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const REACT_LOGIN_REL_URL = "/";
const REFRESH_ENDPOINT = "/api/token/refresh/";

/** Wrapper for axios **/
const server = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: getAuthorizationValue(),
  },
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    console.log(error.response);
    console.log(originalRequest.url);

    // Direct back to login page.
    if (error.response.status === 401 && originalRequest.url === REFRESH_ENDPOINT) {
      window.location.href = REACT_LOGIN_REL_URL;
      logoutUser();
      return Promise.reject(error);
    }

    if (error.response.status === 404) {
      console.log("404: Redirecting to home...");
      window.location.href = REACT_LOGIN_REL_URL;
    }

    if (error.response.status === 401) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        return server
          .post(REFRESH_ENDPOINT, { refresh: refreshToken })
          .then((response) => {
            console.log("Refresh successful");
            loginUser(response.data);
            originalRequest.headers["Authorization"] = "Bearer " + response.data.access;

            return server(originalRequest);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Refresh token not available.");
        logoutUser();
        window.location.href = REACT_LOGIN_REL_URL;
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default server;
