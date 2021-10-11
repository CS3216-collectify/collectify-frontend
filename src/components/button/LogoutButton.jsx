import { IonButton, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./button.scss";
import useToastContext from "../../hooks/useToastContext";

const LogoutButton = () => {
  const history = useHistory();
  const setToast = useToastContext();

  return (
    <IonButton
      onClick={() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        history.replace("/");
        setToast({ message: "Logged out successfully.", color: "success" });
      }}
    >
      Log Out
    </IonButton>
  );
};

export default LogoutButton;
