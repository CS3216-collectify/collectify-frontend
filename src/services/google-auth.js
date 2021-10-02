import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

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

  await GoogleAuth.signIn().then(
    (res) => {
      // success callback
      console.log("success", res);
      return true;
    },
    (error) => {
      // failure callback
      console.log(error, "error");
      return false;
    }
  );
};
