import axios from "axios";
import { getAccessToken, getRefreshToken, loginUser } from "./user";
import { logoutUser } from "./user";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const REACT_LOGIN_REL_URL = "";

/** Wrapper for axios **/
const server = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    // Direct back to login page.
    if (error.response.status === 401 && originalRequest.url === SERVER_BASE_URL + "/api/token/refresh/") {
      window.location.href = REACT_LOGIN_REL_URL;
      logoutUser();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return server
            .post("/api/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              loginUser(response.data);
              originalRequest.headers["Authorization"] = "Bearer " + response.data.access;

              return server(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          logoutUser();
          window.location.href = REACT_LOGIN_REL_URL;
        }
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
