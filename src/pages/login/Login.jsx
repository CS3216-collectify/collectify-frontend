import { IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow } from "@ionic/react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import GuestLoginButton from "../../components/button/GuestLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { trackPageView } from "../../services/react-ga";
import { loginGuest } from "../../utils/auth/actions";
import { hasAccessTokenStored, hasRefreshTokenStored, isGuest } from "../../utils/auth/store";
import "./Login.scss";
import LogoGif from "../../assets/logo.gif";
import LogoTextGif from "../../assets/logo-text.png"
import FlexImage from "../../components/image/FlexImage";
import Text from "../../components/text/Text";

const Login = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { isUserAuthenticated, setIsUserAuthenticated } = useUserContext();

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  useEffect(() => {
    if (hasAccessTokenStored() || hasRefreshTokenStored()) {
      history.replace("/home");
    } else if (isGuest()) {
      history.replace("/discover");
    } else {
      history.replace("/");
    }
  }, [history]);

  const handleGoogleLogin = async (googleAuthStatus) => {
    if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_SUCCESS) {
      // success
      setToast({ message: "Google authentication successful!", color: "success" });
      setIsUserAuthenticated(true);
      history.replace("/home");
    } else if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_ONBOARD) {
      setToast({ message: "Google authentication successful!", color: "success" });
      setIsUserAuthenticated(true);
      history.replace("/onboarding");
    } else {
      // error
      setToast({ message: "Google authentication failed. Please try again.", color: "danger" });
    }
  };

  const handleGuestLogin = async () => {
    loginGuest();
    history.replace("/discover");
  };

  return (
    <IonPage className="login">
      <IonContent className="ion-padding">
        <IonGrid fixed className="login--grid">
          <IonRow className="ion-justify-content-center">
            <FlexImage className="logo" src={LogoGif} />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonImg className="logo-text" src={LogoTextGif} />
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <Text size="xl">No fluff. Only collections.</Text>
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
