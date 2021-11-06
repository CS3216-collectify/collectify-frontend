import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import noProfileImage from "../../assets/no-profile-image.png";
import EditProfileButton from "../../components/button/EditProfileButton";
import GuestLoginPrompt from "../../components/guest-login-prompt/GuestLoginPrompt";
import FlexImage from "../../components/image/FlexImage";
import ProfileCollections from "../../components/profile-collection/ProfileCollections";
import Text from "../../components/text/Text";
import AppToolbar from "../../components/toolbar/AppToolbar";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { trackPageView } from "../../services/react-ga";
import { getCurrentUser, getUserByUsername } from "../../services/users";
import "./Profile.scss";

const COLLECTIONS_MODE = 0;
const LIKED_ITEMS_MODE = 1;
const FOLLOWING_COLLECTIONS_MODE = 2;

const Profile = () => {
  const history = useHistory();
  const location = useLocation();
  const { isUserAuthenticated, isCurrentUser, chatClient } = useUserContext();

  // if not username and isLoggedIn, redirect to /profile/{username_from_local_storage}
  // if not username and not isLoggedIn, prompt log in
  let { username } = useParams();
  const setToast = useToastContext();

  const [profileUserId, setProfileUserId] = useState(null);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileProfilePicture, setProfileProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const isOwnProfile = isCurrentUser(profileUserId);

  // TODO: add api call for username
  const getUserInformation = useCallback(async () => {
    try {
      let res = null;
      setLoading(true);
      if (username) {
        res = await getUserByUsername(username);
      } else if (isUserAuthenticated) {
        res = await getCurrentUser();
      }

      if (res) {
        setProfileUserId(parseInt(res.userId));
        setProfileFirstName(res.firstName);
        setProfileLastName(res.lastName);
        setProfileUsername(res.username);
        setProfileProfilePicture(res.pictureUrl);
        setProfileDescription(res.description);
        setLikesCount(res.likesCount);
        setItemsCount(res.itemsCount);
        setCollectionsCount(res.collectionsCount);
      }
    } catch (e) {
      setToast({ message: "Unable to load your profile. Please try again.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [isUserAuthenticated, setToast, username]);

  useEffect(() => {
    if ((username && location.pathname.startsWith("/profile")) || (isUserAuthenticated &&location.pathname.startsWith("/my-profile"))) {
      getUserInformation();
    }
  }, [isUserAuthenticated, username, location, getUserInformation]);

  const editProfileHandler = () => {
    history.push({
      pathname: "/edit-profile",
      state: { profileUsername, profileProfilePicture, profileLastName, profileFirstName, profileDescription },
    });
  };

  const chatHandler = async () => {
    if (isOwnProfile) {
      return;
    }
    if (!isUserAuthenticated) {
      setToast({ message: "Please log in to chat with the collector.", color: "danger" });
      return;
    }
    const pathname = "/chat";
    const state = { recipient: profileUserId.toString() };
    history.push({ pathname, state });
  };

  if (!isUserAuthenticated && !username) {
    // is guest user
    return (
      <IonPage className="profile">
        <AppToolbar title="Guest User" />
        <IonContent className="ion-padding">
          <GuestLoginPrompt />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="profile">
      <AppToolbar showMenu={isOwnProfile} title={profileUsername} />
      <IonContent>
        <IonGrid fixed className="profile--grid ion-padding">
          <IonRow className="ion-justify-content-evenly ion-margin-bottom">
            <IonCol size={4}>
              <FlexImage className="profile--img" src={profileProfilePicture || noProfileImage} />
            </IonCol>

            <IonCol className="profile-header--container">
              <IonRow className="profile-statistics--container ion-align-items-center ion-justify-content-between">
                <div className="profile-statistics ion-text-center">
                  <Text>
                    <b>{collectionsCount}</b>
                  </Text>
                  <br />
                  <Text size="xs">COLLECTIONS</Text>
                </div>
                <div className="profile-statistics ion-text-center">
                  <Text>
                    <b>{itemsCount}</b>
                  </Text>
                  <br />
                  <Text size="xs">ITEMS</Text>
                </div>
                <div className="profile-statistics ion-text-center">
                  <Text>
                    <b>{likesCount}</b>
                  </Text>
                  <br />
                  <Text size="xs">LIKES</Text>
                </div>
              </IonRow>

              {isOwnProfile && ( // can edit profile
                // <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                <IonRow className="edit-profile-button--container">
                  <EditProfileButton onClick={editProfileHandler} />
                </IonRow>
              )}
              {!isOwnProfile && (
                <IonButton onClick={chatHandler}>
                  <IonIcon icon={chatbubbleEllipsesOutline} className="item-chat-icon" />
                  <IonLabel>Chat</IonLabel>
                </IonButton>
              )}
            </IonCol>
          </IonRow>

          <IonRow className="profile-details--container">
            <div>
              <b>{profileFirstName + " " + profileLastName}</b>
            </div>
            <div>{profileDescription}</div>
          </IonRow>
        </IonGrid>

        <IonGrid fixed className="ion-padding">
          {/* {isOwnProfile && (
            <IonRow className="add-collection--container ion-justify-content-end">
              <AddButton className="add-collection-button" label="Collection" onClick={() => history.push("/add-collections")} />
            </IonRow>
          )} */}
          <ProfileCollections profileUserId={profileUserId} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
