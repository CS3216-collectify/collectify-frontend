import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { googleLogin } from "../../services/google-auth";
import { trackGoogleSignInEvent } from "../../services/react-ga";
import "./button.scss";

const GoogleLoginButton = ({ handleGoogleLogin }) => {
  return (
    <IonButton
      size="medium"
      fill="solid"
      className="google-login-button"
      onClick={async () => {
        trackGoogleSignInEvent();
        handleGoogleLogin(await googleLogin());
      }}
    >
      <IonIcon size="medium" slot="icon-only" icon={logoGoogle} className="ion-margin-horizontal" />
      <IonLabel>Log In with Google</IonLabel>
    </IonButton>
  );
};

export default GoogleLoginButton;
