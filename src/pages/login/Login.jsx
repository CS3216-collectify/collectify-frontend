import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow } from "@ionic/react";

import "./Login.scss";
import Toast from "../../components/toast/Toast";
import GuestLoginButton from "../../components/button/GuestLoginButton";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Login = () => {
  // TODO: conditional Toast color
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleGoogleLogin = async (googleAuthStatus) => {
    if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_SUCCESS) {
      // success
      setToastMessage("Google authentication successful!");
      setToastColor("success");
      setShowToast(true);
    } else {
      // error
      setToastMessage("Google authentication failed. Please try again.");
      setToastColor("danger");
      setShowToast(true);
    }
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
            <GuestLoginButton />
          </IonRow>
        </IonGrid>

        <Toast showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} color={toastColor} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
