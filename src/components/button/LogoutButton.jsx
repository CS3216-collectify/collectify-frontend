import { IonButton, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./button.scss";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { logoutUser } from "../../utils/user";

const LogoutButton = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { setIsUserAuthenticated, setCurrentUserId } = useUserContext();

  const logoutHandler = () => {
    logoutUser();
    history.replace("/");
    setToast({ message: "Logged out successfully.", color: "success" });
    setIsUserAuthenticated(false);
    setCurrentUserId(null);
  };

  return <IonButton fill="outline" expand="block" className="follow-button" size="small" onClick={() => logoutHandler()}>Log Out</IonButton>;
};

export default LogoutButton;
