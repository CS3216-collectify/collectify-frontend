import { IonGrid, IonRow, IonText } from "@ionic/react";
import { useHistory } from "react-router";
import GoogleLoginButton from "../button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { getUserId } from "../../utils/user";

const GuestLoginPrompt = (props) => {
  const history = useHistory();
  const setToast = useToastContext();
  const { currentUserId, setIsUserAuthenticated, setCurrentUserId } = useUserContext();

  const handleGoogleLogin = async (googleAuthStatus) => {
    if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_SUCCESS) {
      // success
      setToast({ message: "Google authentication successful!", color: "success" });
      setIsUserAuthenticated(true);
      setCurrentUserId(getUserId());
      history.replace("/home");
    } else {
      // error
      setToast({ message: "Google authentication failed. Please try again.", color: "danger" });
    }
  };

  return (
    <IonGrid fixed>
      <IonRow className="ion-justify-content-center ion-margin-top">
        <IonText>
          <h1>Log in to collectify to begin showcasing your collectables to the world!</h1>
        </IonText>
        <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
      </IonRow>
    </IonGrid>
  )
}

export default GuestLoginPrompt;