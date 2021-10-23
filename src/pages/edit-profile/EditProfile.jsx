import { useState, useEffect } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";

import "./EditProfile.scss";
import useToastContext from "../../hooks/useToastContext";
import TextInput from "../../components/text-input/TextInput";
import TextArea from "../../components/text-input/TextArea";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import SaveProfileButton from "../../components/button/SaveProfileButton";
import { updateProfile } from "../../services/users";

// Pass user ID and load data\
// some redirect if accessed by Guest
const EditProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const setToast = useToastContext();

  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [description, setDescription] = useState("");

  const saveProfile = () => {
    // if (username.length < 8) {
    //   setToast({ message: "Your username cannnot be less than 8 characters.", color: "danger" });
    // }

    updateProfile(initialUsername, { username, firstName, lastName, description }).then((res) => {
      setToast({ message: "Profile saved!", color: "success" });
      history.replace('/profile');
      // window.location.reload();
    });
  };

  useEffect(() => {
    if (location.state) {
      setInitialUsername(location.state.profileUsername);
      setUsername(location.state.profileUsername);
      setFirstName(location.state.profileFirstName);
      setLastName(location.state.profileLastName);
      setProfilePicture(location.state.profileProfilePicture);
    }
  }, [location]);

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
              <TextInput label="First Name" value={firstName} onChange={setFirstName} placeholder="Type text here" />
            </IonItem>
            <IonItem>
              <TextInput label="Last Name" value={lastName} onChange={setLastName} placeholder="Type text here" />
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
