import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList } from "@ionic/react";
import TextInput from "../../components/text-input/TextInput";
import TextArea from "../../components/text-input/TextArea";
import HomeToolbar from "../../components/toolbar/HomeToolbar";

// Pass user ID and load data
const EditProfile = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
