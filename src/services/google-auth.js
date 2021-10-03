import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

import GoogleAuthStatus from "../enums/google-auth-status.enum";

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

  return await GoogleAuth.signIn().then(
    (res) => {
      // success callback
      console.log("success", res);
      return GoogleAuthStatus.GOOGLE_AUTH_SUCCESS;
    },
    (error) => {
      // failure callback
      console.log("error", error);
      return GoogleAuthStatus.GOOGLE_AUTH_FAILURE;
    }
  );
};
