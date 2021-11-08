import { useState, useEffect, useCallback } from "react";
import { IonContent, IonPage, IonGrid, IonItem, IonList } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./Onboarding.scss";
import LogoutButton from "../../components/button/LogoutButton";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import TextInput from "../../components/text-input/TextInput";
import UpdateUsernameButton from "../../components/button/UpdateUsernameButton";
import { getCurrentUser } from "../../services/users";
import { updateUsername } from "../../services/users";
import Text from "../../components/text/Text";

const Onboarding = () => {
  const { isUserAuthenticated } = useUserContext();
  const setToast = useToastContext();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");

  const getUserInformation = useCallback(() => {
    if (isUserAuthenticated) {
      getCurrentUser()
        .then((res) => {
          setInitialUsername(res.username);
          setUsername(res.username);
        })
        .catch((e) => setToast({ message: "Unable to load your user information. Please try again.", color: "danger" }));
    }
  }, [isUserAuthenticated, setToast]);

  useEffect(() => {
    if (isUserAuthenticated) {
      getUserInformation();
    }
  }, [isUserAuthenticated, getUserInformation, initialUsername]);

  const validationErrorMessage = (msg) => {
    setToast({ message: msg, color: "danger" });
  };

  const handleUpdateUsername = () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setToast("Username cannot be empty.");
      return;
    }
    if (!trimmedUsername || trimmedUsername.length < 8 || trimmedUsername.length > 15) {
      validationErrorMessage("Your new username must be between 8 to 15 characters!");
      return;
    }
    updateUsername(trimmedUsername)
      .then((res) => {
        setToast({ message: "Username updated!", color: "success" });
        history.replace("/home");
      })
      .catch((e) => {
        setToast({ message: "Unable to update your username. Please try again.", color: "danger" });
      });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonList lines="full">
            <Text size="l">Please provide a username so the community can identify you.</Text>
            <IonItem>
              <TextInput label="Username" value={username} onChange={setUsername} placeholder="Type text here" />
            </IonItem>
            <UpdateUsernameButton onClick={() => handleUpdateUsername()} />
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
