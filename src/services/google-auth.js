import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

import GoogleAuthStatus from "../enums/google-auth-status.enum";
import server from "../utils/server";
import { loginUser } from "../utils/user";

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
    server.defaults.headers["Authorization"] = null;
    const response = await server.post("/api/token/obtain/social/", {
      idToken: idToken,
    });
    loginUser(response.data);
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
