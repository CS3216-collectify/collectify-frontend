import { IonButton, IonLabel } from "@ionic/react";
import { trackGuestSignInEvent } from "../../services/react-ga";
import "./button.scss";

const GuestLoginButton = ({ handleGuestLogin }) => {
  return (
    <IonButton
      size="medium"
      fill="outline"
      onClick={() => {
        trackGuestSignInEvent();
        handleGuestLogin();
      }}
      className="google-login-button"
    >
      <IonLabel>Continue as Guest</IonLabel>
    </IonButton>
  );
};

export default GuestLoginButton;
