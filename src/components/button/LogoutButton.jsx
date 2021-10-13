import { IonButton, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./button.scss";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";

const LogoutButton = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { setIsUserAuthenticated } = useUserContext();

  return (
    <IonButton
      onClick={() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("isGuest");
        history.replace("/");
        setToast({ message: "Logged out successfully.", color: "success" });
        setIsUserAuthenticated(false);
      }}
    >
      Log Out
    </IonButton>
  );
};

export default LogoutButton;
