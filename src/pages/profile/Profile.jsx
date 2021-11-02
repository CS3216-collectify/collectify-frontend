import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import noProfileImage from "../../assets/no-profile-image.png";
import AddButton from "../../components/button/AddButton";
import EditProfileButton from "../../components/button/EditProfileButton";
import FollowedCollections from "../../components/followed-collections/FollowedCollections";
import GuestLoginPrompt from "../../components/guest-login-prompt/GuestLoginPrompt";
import FlexImage from "../../components/image/FlexImage";
import LikedItems from "../../components/liked-items/LikedItems";
import ProfileCollections from "../../components/profile-collection/ProfileCollections";
import Text from "../../components/text/Text";
import Toggle from "../../components/toggle/Toggle";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { trackPageView } from "../../services/react-ga";
import { getCurrentUser, getUserByUsername } from "../../services/users";
import "./Profile.scss";

const COLLECTIONS_MODE = 0;
const LIKED_ITEMS_MODE = 1;
const FOLLOWING_COLLECTIONS_MODE = 2;

const MODE_SELECT_OPTIONS = [
  {
    value: COLLECTIONS_MODE,
    label: "My Collections",
  },
  {
    value: FOLLOWING_COLLECTIONS_MODE,
    label: "Following",
  },
  {
    value: LIKED_ITEMS_MODE,
    label: "Liked",
  },
];

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
  const [mode, setMode] = useState(COLLECTIONS_MODE);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const isOwnProfile = isCurrentUser(profileUserId);

  const toggleMode = (mode) => {
    setMode(parseInt(mode));
    document.getElementById("toggle").scrollIntoView({ behavior: "smooth" });
  };

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
    if ((username || isUserAuthenticated) && location.pathname.startsWith("/profile")) {
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
    const pathname = "/chat";
    const state = { recipient: profileUserId.toString() };
    history.push({ pathname, state });
  };

  if (!isUserAuthenticated && !username) {
    // is guest user
    return (
      <IonPage className="profile">
        <IonContent>
          <ProfileToolbar showMenu={false} username="Guest User" />
          <GuestLoginPrompt />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="profile">
      <ProfileToolbar showMenu={isOwnProfile} username={profileUsername} />
      <IonContent>
        <IonGrid fixed className="profile--grid ion-padding">
          <IonRow>
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
                <IonRow>
                  <EditProfileButton onClick={editProfileHandler} />
                </IonRow>
              )}
              {!isOwnProfile && (
                <IonButton fill="outline" onClick={chatHandler}>
                  Chat
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

        {isOwnProfile && ( // Display my collections, liked items, and followed collections
          <IonGrid fixed className="profile-info--grid">
            <div id="toggle">
              <Toggle value={mode} options={MODE_SELECT_OPTIONS} onChange={toggleMode} />
            </div>

            <div id="profile-toggle-content" className="ion-padding">
              {mode === LIKED_ITEMS_MODE && <LikedItems />}
              {mode === FOLLOWING_COLLECTIONS_MODE && <FollowedCollections />}
              {mode === COLLECTIONS_MODE && (
                <>
                  <IonRow className="add-collection--container ion-justify-content-end">
                    <AddButton className="add-collection-button" label="Collection" onClick={() => history.push("/add-collections")} />
                  </IonRow>
                  <ProfileCollections profileUserId={profileUserId} />
                </>
              )}
            </div>
          </IonGrid>
        )}

        {!isOwnProfile && ( // Just display collections
          <IonGrid fixed className="ion-padding">
            <ProfileCollections profileUserId={profileUserId} />
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
