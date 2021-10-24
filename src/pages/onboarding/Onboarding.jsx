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
import { updateProfile } from "../../services/users";
import Text from "../../components/text/Text";

// TODO: add redirect? 
// TODO: handle length < 8 and duplciate 
const Onboarding = () => {
  const { currentUserId } = useUserContext();
  const setToast = useToastContext();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");

  const getUserInformation = useCallback(() => {
    if (currentUserId) {
      getCurrentUser()
        .then((res) => {
          setInitialUsername(res.username);
          setUsername(res.username);
        })
        .catch((e) => console.log(e));
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId) {
      getUserInformation();
    }
  }, [currentUserId, getUserInformation, initialUsername]);

  const handleUpdateUsername = () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setToast("Username cannot be empty.");
      return;
    }
    updateProfile(initialUsername, { username: trimmedUsername }).then((res) => {
      setToast({ message: "Username updated!", color: "success" });
      history.replace("/home");
    });
  };

  // TODO: check if the username is duplicated
  return (
    <IonPage>
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

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
