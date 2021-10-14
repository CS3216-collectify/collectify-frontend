import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { IonContent, IonPage, IonGrid, IonRow } from "@ionic/react";

import "./Login.scss";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import GuestLoginButton from "../../components/button/GuestLoginButton";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import server from "../../utils/server";

const Login = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { isUserAuthenticated, setIsUserAuthenticated, setCurrentUserId} = useUserContext();

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null || localStorage.getItem("refreshToken") !== null || localStorage.getItem("isGuest") !== null) {
      history.replace("/home");
    } else {
      history.replace("/");
    }
  }, [history]);

  const handleGoogleLogin = async (googleAuthStatus) => {
    if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_SUCCESS) {
      // success
      setToast({ message: "Google authentication successful!", color: "success" });
      setIsUserAuthenticated(true);
      setCurrentUserId(localStorage.getItem("userId"));
      history.replace("/home");
    } else {
      // error
      setToast({ message: "Google authentication failed. Please try again.", color: "danger" });
    }
  };

  const handleGuestLogin = async () => {
    server.defaults.headers["Authorization"] = null;
    localStorage.setItem("isGuest", true);
    history.replace("/discover");
  };

  return (
    <IonPage className="login">
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        <IonGrid fixed className="login--grid">
          <IonRow className="ion-justify-content-center">
            <Logo />
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
          </IonRow>
          <IonRow>or</IonRow>
          <IonRow className="ion-justify-content-center">
            <GuestLoginButton handleGuestLogin={handleGuestLogin} />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
