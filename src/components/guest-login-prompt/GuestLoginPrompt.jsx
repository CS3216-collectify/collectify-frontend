import { IonGrid, IonRow, IonText } from "@ionic/react";
import { useHistory } from "react-router";
import GoogleLoginButton from "../button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { getUserId } from "../../utils/auth/store";
import Text from "../text/Text";

const GuestLoginPrompt = (props) => {
  const history = useHistory();
  const setToast = useToastContext();
  const { setIsUserAuthenticated } = useUserContext();

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
    <IonGrid fixed className="ion-padding">
      <IonRow className="ion-justify-content-center ion-margin-top">
        <Text size="xl" className="ion-text-center">
          Log in to collectify to begin showcasing your collectables to the world!
        </Text>
      </IonRow>
      <IonRow className="ion-justify-content-center ion-margin-top">
        <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
      </IonRow>
    </IonGrid>
  )
}

export default GuestLoginPrompt;