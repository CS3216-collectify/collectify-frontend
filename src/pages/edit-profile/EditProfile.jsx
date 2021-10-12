import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./EditProfile.scss";
import useToastContext from "../../hooks/useToastContext";
import TextInput from "../../components/text-input/TextInput";
import TextArea from "../../components/text-input/TextArea";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import SaveProfileButton from "../../components/button/SaveProfileButton";

// Pass user ID and load data\
// some redirect if accessed by Guest
const EditProfile = () => {
  const history = useHistory();
  const setToast = useToastContext();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveProfile = () => {
    setToast({ message: "Profile saved!", color: "success" });
    history.goBack();
  };

  return (
    <IonPage>
      <HomeToolbar title="Edit Profile" />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

        <IonGrid fixed>
          <IonList lines="full">
            <IonItem>
              <TextInput label="Username" value={username} onChange={setUsername} placeholder="Type text here" />
            </IonItem>
            <IonItem>
              <TextInput label="Name" value={name} onChange={setName} placeholder="Type text here" />
            </IonItem>
            <IonItem>
              <TextInput label="Description" value={description} onChange={setDescription} placeholder="Type text here" />
            </IonItem>
          </IonList>
          <IonRow>
            <SaveProfileButton onClick={saveProfile} />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
