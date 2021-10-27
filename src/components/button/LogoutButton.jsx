import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./button.scss";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { logoutUser } from "../../utils/auth/actions";

const LogoutButton = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { setIsUserAuthenticated } = useUserContext();

  const logoutHandler = () => {
    logoutUser();
    history.replace("/");
    setToast({ message: "Logged out successfully.", color: "success" });
    setIsUserAuthenticated(false);
  };

  return <IonButton fill="outline" expand="block" className="follow-button" size="small" onClick={() => logoutHandler()}>Log Out</IonButton>;
};

export default LogoutButton;
