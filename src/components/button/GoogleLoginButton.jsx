import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";

import "./button.scss";
import { googleLogin } from "../../services/google-auth";

const GoogleLoginButton = ({ handleGoogleLogin }) => {
  return (
    <IonButton size="medium" fill="solid" className="google-login-button" onClick={async () => handleGoogleLogin(await googleLogin())}>
      <IonIcon size="medium" slot="icon-only" icon={logoGoogle} className="ion-margin-horizontal" />
      <IonLabel>Log In with Google</IonLabel>
    </IonButton>
  );
};

export default GoogleLoginButton;
