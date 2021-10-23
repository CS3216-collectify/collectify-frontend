import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./Settings.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import LogoutButton from "../../components/button/LogoutButton";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import { getUserId } from "../../utils/user";
import Text from "../../components/text/Text";

// Pass user ID and load data\
// some redirect if accessed by Guest
const Settings = () => {
  const { isUserAuthenticated, setIsUserAuthenticated } = useUserContext();
  const setToast = useToastContext();
  const history = useHistory();

  const handleGoogleLogin = async (googleAuthStatus) => {
    if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_SUCCESS) {
      // success
      setToast({ message: "Google authentication successful!", color: "success" });
      setIsUserAuthenticated(true);
      history.replace("/home");
    } else {
      // error
      setToast({ message: "Google authentication failed. Please try again.", color: "danger" });
    }
  };

  return (
    <IonPage>
      <HomeToolbar title="Settings" />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

        <IonGrid fixed>
          {!isUserAuthenticated && (
            <Text>
              <h1>Log in to collectify to begin showcasing your collectables to the world!</h1>
            </Text>
          )}
          <IonRow>{isUserAuthenticated ? <LogoutButton /> : <GoogleLoginButton />}</IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
