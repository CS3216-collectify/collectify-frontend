import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

import GoogleAuthStatus from "../enums/google-auth-status.enum";
import server from "../utils/server";
import { loginUser } from "../utils/auth/actions";

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
    return loginUser(response.data);
  };

  return await GoogleAuth.signIn().then(
    async (res) => {
      // success callback
      try {
        const tokenRes = await requestAccessToken(res.authentication.idToken);
        
        if (tokenRes.isNew) {
          return GoogleAuthStatus.GOOGLE_AUTH_ONBOARD;
        }
        return GoogleAuthStatus.GOOGLE_AUTH_SUCCESS;
      } catch (error) {
        return GoogleAuthStatus.GOOGLE_AUTH_FAILURE;
      }
    },
    (error) => {
      return GoogleAuthStatus.GOOGLE_AUTH_FAILURE;
    }
  );
};
