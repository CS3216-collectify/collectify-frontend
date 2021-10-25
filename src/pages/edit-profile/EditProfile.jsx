import { useState, useEffect } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonItem, IonList, IonLoading, IonAvatar, IonImg, IonCol } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";

import "./EditProfile.scss";
import useToastContext from "../../hooks/useToastContext";
import TextInput from "../../components/text-input/TextInput";
import TextArea from "../../components/text-input/TextArea";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import SaveProfileButton from "../../components/button/SaveProfileButton";
import UploadButton from "../../components/button/UploadButton";
import { getCurrentUser, updateProfile } from "../../services/users";
import FlexImage from "../../components/image/FlexImage";

const MEGABYTE = 1048576;
const MAX_FILE_SIZE = 10 * MEGABYTE;

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
  const [loading, setLoading] = useState(false);
  const [pictureWasUpdated, setPictureWasUpdated] = useState(false);

  const validationErrorMessage = (msg) => {
    setToast({ message: msg, color: "danger" });
  };

  const saveProfile = () => {
    const trimmedUsername = username.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedDescription = description.trim();

    if (trimmedUsername !== initialUsername && 
      (!trimmedUsername || trimmedUsername.length < 8 || trimmedUsername.length > 15)) {
      validationErrorMessage("Your new username must be between 8 to 15 characters!");
      return;
    }
    if (!trimmedFirstName) {
      validationErrorMessage("First Name cannot be empty!");
      return;
    }

    let profilePictureUpdate = null;
    if (pictureWasUpdated) {
      profilePictureUpdate = profilePicture;
    }

    updateProfile(trimmedUsername, trimmedFirstName, trimmedLastName, trimmedDescription, profilePictureUpdate)
      .then((res) => {
        setToast({ message: "Profile saved!", color: "success" });
        history.replace("/profile");
      })
      .catch((e) => {
        console.log(e);
        setToast({ message: e.data, color: "danger" });
      });
  };

  useEffect(() => {
    if (location.state) {
      const { profileUsername, profileFirstName, profileLastName, profileProfilePicture, profileDescription } = location.state;
      setInitialUsername(profileUsername);
      setUsername(profileUsername);
      setFirstName(profileFirstName);
      setLastName(profileLastName);
      setProfilePicture(profileProfilePicture);
      setDescription(profileDescription);
    } else {
      setLoading(true);
      getCurrentUser().then((data) => {
        const { username, firstName, lastName, pictureUrl, description } = data;
        setInitialUsername(username);
        setUsername(username);
        setFirstName(firstName);
        setLastName(lastName);
        setProfilePicture(pictureUrl);
        setDescription(description);
      }).catch((e) => {
        setToast({ message: "Unable to load profile info", color: "danger" });
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [location]);

  const profilePhotoChangeHandler = (newFile) => {
    if (!newFile) {
      return;
    }
    if (newFile.size > MAX_FILE_SIZE) {
      setToast({ message: "Image must not be more than 10MB.", color: "danger" })
    }
    const newUrl = URL.createObjectURL(newFile);
    setProfilePicture(newUrl);
    setPictureWasUpdated(true);
  }

  return (
    <IonPage>
      <IonLoading isOpen={loading} />
      <HomeToolbar title="Edit Profile" />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

        <IonGrid fixed>
          <IonRow className="ion-justify-content-between ion-align-items-center">
            <IonCol size="auto">
              <FlexImage className="profile--img" src={profilePicture} />
            </IonCol>
            <UploadButton label="Change Profile Photo" onChange={profilePhotoChangeHandler} />
          </IonRow>
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
              <TextArea label="Description" value={description} onChange={setDescription} placeholder="Type text here" />
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
