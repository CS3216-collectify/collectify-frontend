import axios from "axios";
import { getRefreshToken, loginUser } from "./user";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const REACT_LOGIN_REL_URL = "";

/** Wrapper for axios **/
const server = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
});

server.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Direct back to login page.
    if (error.response.status === 401 && originalRequest.url === SERVER_BASE_URL + "/api/token/refresh/") {
      console.log(error);
      console.log("abc");
      // window.location.href = REACT_LOGIN_REL_URL;
      return Promise.reject(error);
    }

    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      const refreshToken = getRefreshToken();
      console.log("def");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

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
          // window.location.href = REACT_LOGIN_REL_URL;
        }
      } else {
        console.log("Refresh token not available.");
        // window.location.href = REACT_LOGIN_REL_URL;
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default server;
