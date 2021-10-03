import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const GuestLoginButton = ({ handleGuestLogin }) => {
  return (
    <IonButton size="small" fill="outline" routerLink="/" className="google-login-button">
      <IonLabel>Continue as Guest</IonLabel>
    </IonButton>
  );
};

export default GuestLoginButton;
