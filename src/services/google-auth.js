import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import jwt_decode from "jwt-decode";

import GoogleAuthStatus from "../enums/google-auth-status.enum";
import server from "../utils/server";

export const googleLogin = async () => {
  // {
  //   "email": "...@gmail.com",
  //   "familyName": "...",
  //   "givenName": "...",
  //   "id": "...",
  //   "imageUrl": "...",
  //   "name": "...",
  //   "authentication": {
  //       "accessToken": "...",
  //       "idToken": "..."
  //   },
  //   "serverAuthCode": "..."
  // }

  const requestAccessToken = async (idToken) => {
    try {
      server.defaults.headers["Authorization"] = null;
      const response = await server.post("/api/token/obtain/social/", {
        idToken: idToken,
      });

      const jwtDecoded = jwt_decode(response.data.access);
      server.defaults.headers["Authorization"] = "Bearer " + response.data.access;
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("userId", jwtDecoded.user_id);
      
      return;
    } catch (error) {
      throw error;
    }
  };

  return await GoogleAuth.signIn().then(
    async (res) => {
      // success callback
      try {
        await requestAccessToken(res.authentication.idToken);
        console.log("successful auth");
        return GoogleAuthStatus.GOOGLE_AUTH_SUCCESS;
      } catch (error) {
        console.log("error", error);
        return GoogleAuthStatus.GOOGLE_AUTH_FAILURE;
      }
    },
    (error) => {
      // failure callback
      console.log("error", error);
      return GoogleAuthStatus.GOOGLE_AUTH_FAILURE;
    }
  );
};
