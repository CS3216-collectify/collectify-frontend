import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { trackGoogleSignOutEvent } from "../../services/react-ga";
import { logoutUser } from "../../utils/auth/actions";
import "./button.scss";

const LogoutButton = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { setIsUserAuthenticated } = useUserContext();

  const logoutHandler = () => {
    logoutUser();
    trackGoogleSignOutEvent();
    setToast({ message: "Logged out successfully.", color: "success" });
    setIsUserAuthenticated(false);
    history.replace("/");
  };

  return (
    <IonButton fill="outline" expand="block" className="follow-button" size="medium" onClick={() => logoutHandler()}>
      Log Out
    </IonButton>
  );
};

export default LogoutButton;
