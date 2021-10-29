import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLoading, IonButton } from "@ionic/react";
import "./Profile.scss";
import useUserContext from "../../hooks/useUserContext";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import EditProfileButton from "../../components/button/EditProfileButton";
import AddButton from "../../components/button/AddButton";
import { getCurrentUser, getUserByUsername } from "../../services/users";
import FlexImage from "../../components/image/FlexImage";
import ProfileCollections from "../../components/profile-collection/ProfileCollections";
import Toggle from "../../components/toggle/Toggle";
import LikedItems from "../../components/liked-items/LikedItems";
import FollowedCollections from "../../components/followed-collections/FollowedCollections";
import GuestLoginPrompt from "../../components/guest-login-prompt/GuestLoginPrompt";
import Text from "../../components/text/Text";
import noProfileImage from "../../assets/no-profile-image.png";

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

  const isOwnProfile = isCurrentUser(profileUserId);

  const toggleMode = (mode) => {
    setMode(parseInt(mode));
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
      console.log(e);
      // user not found
    } finally {
      setLoading(false);
    }
  }, [isUserAuthenticated, username]);

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
    const state = { recipient: profileUserId.toString() }
    history.push({ pathname, state });
  }

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

      {/* Ion padding applies 16px  */}
      <IonContent>
        {/* --ion-grid-width to modify the fixed width */}
        <IonGrid fixed className="profile--grid ion-padding">
          <IonRow>
            <IonCol size="auto">
              {/* <Logo className="profile--img"/> */}
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
          <IonGrid fixed>
            <Toggle value={mode} options={MODE_SELECT_OPTIONS} onChange={toggleMode} />

            <div className="ion-padding">
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

        <IonGrid fixed className="ion-padding">
          {!isOwnProfile && ( // Just display collections
            <ProfileCollections profileUserId={profileUserId} />
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
