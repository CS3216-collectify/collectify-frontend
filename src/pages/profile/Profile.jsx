import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonImg, IonText, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonLoading, IonAvatar } from "@ionic/react";
import "./Profile.scss";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import EditProfileButton from "../../components/button/EditProfileButton";
import LogoutButton from "../../components/button/LogoutButton";
import AddButton from "../../components/button/AddButton";
import { getCurrentUser, getUserByUsername } from "../../services/users";
import FlexImage from "../../components/image/FlexImage";
import ProfileCollections from "../../components/profile-collection/ProfileCollections";
import Toggle from "../../components/toggle/Toggle";
import LikedItems from "../../components/liked-items/LikedItems";
import FollowedCollections from "../../components/followed-collections/FollowedCollections";
import GuestLoginPrompt from "../../components/guest-login-prompt/GuestLoginPrompt";
import Text from "../../components/text/Text";

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
  const setToast = useToastContext();
  const { currentUserId, setIsUserAuthenticated, setCurrentUserId } = useUserContext();

  // if not username and isLoggedIn, redirect to /profile/{username_from_local_storage}
  // if not username and not isLoggedIn, prompt log in
  let { username } = useParams();

  // TODO : add profile description and pass to EditProfile
  const [profileUserId, setProfileUserId] = useState(null);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileProfilePicture, setProfileProfilePicture] = useState(null);
  const [mode, setMode] = useState(COLLECTIONS_MODE);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const isOwnProfile = parseInt(currentUserId) === profileUserId;

  const toggleMode = (mode) => {
    setMode(parseInt(mode));
  }

  // TODO: add api call for username
  const getUserInformation = useCallback(async () => {
    try {
      let res = null;
      setLoading(true);
      if (username) {
        console.log(username);
        res = await getUserByUsername(username);
      } else if (currentUserId) {
        console.log(currentUserId);
        res = await getCurrentUser();
      }
      if (res) {
        setProfileUserId(Number(res.userId));
        setProfileFirstName(res.firstName);
        setProfileLastName(res.lastName);
        setProfileUsername(res.username);
        setProfileProfilePicture(res.pictureUrl);
        setProfileDescription(res.description);
        setLikesCount(res.likesCount);
      }
    } catch (e) {
      console.log(e);
      // user not found
    } finally {
      setLoading(false);
    }
  }, [currentUserId, username]);

  useEffect(() => {
    if (username || currentUserId) {
      getUserInformation();
    }
  }, [currentUserId, username]);

  const editProfileHandler = () => {
    history.push({
      pathname: "/profile/edit",
      state: { profileUsername, profileProfilePicture, profileLastName, profileFirstName },
    });
  }

  if (!currentUserId && !username) {
    // is guest user
    return (
      <IonPage className="profile">
        <IonLoading isOpen={loading} />
        <IonContent className="ion-padding">
          <ProfileToolbar showMenu={false} username="Guest User" />
            <GuestLoginPrompt />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="profile">
      <IonLoading isOpen={loading} />
      <ProfileToolbar showMenu={isOwnProfile} username={profileUsername} />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* --ion-grid-width to modify the fixed width */}
        <IonGrid fixed className="profile--grid">
          <IonRow>
            <IonCol size="auto">
              {/* <Logo className="profile--img"/> */}
              <FlexImage className="profile--img" src={profileProfilePicture} />
            </IonCol>

            <IonCol>
              <IonRow className="profile-statistics--container ion-align-items-center ion-justify-content-center">
                <div className="profile-statistics ion-text-center">
                  <Text>
                    <b>{"3"}</b>
                  </Text>
                  <br />
                  <Text size="s">COLLECTIONS</Text>
                </div>
                <div className="profile-statistics ion-text-center">
                  <Text>
                    <b>{"15"}</b>
                  </Text>
                  <br />
                  <Text size="s">ITEMS</Text>
                </div>
                <div className="profile-statistics ion-text-center">
                  <Text>
                    <b>{likesCount}</b>
                  </Text>
                  <br />
                  <Text size="s">LIKES</Text>
                </div>
              </IonRow>

              {isOwnProfile && // can edit profile
                // <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                <IonRow>
                  <EditProfileButton
                    onClick={editProfileHandler}
                  />
                </IonRow>
              }
            </IonCol>
          </IonRow>

          <IonRow className="profile-details--container">
            <div>
              <b>{profileFirstName + " " + profileLastName}</b>
            </div>
            <div>
              {profileDescription}
            </div>
          </IonRow>

          {isOwnProfile && // Display my collections, liked items, and followed collections
            <>
              <Toggle value={mode} options={MODE_SELECT_OPTIONS} onChange={toggleMode} />
              {mode === LIKED_ITEMS_MODE &&
                <LikedItems />
              }
              {mode === FOLLOWING_COLLECTIONS_MODE &&
                <FollowedCollections />
              }
              {mode === COLLECTIONS_MODE &&
                <IonGrid>
                  <IonRow className="ion-justify-content-end">
                    <AddButton label="Collection" onClick={() => history.push("/add-collections")} />
                  </IonRow>
                  <ProfileCollections profileUserId={profileUserId}/>
                </IonGrid>
              }
            </>
          }
          {!isOwnProfile && // Just display collections
            <ProfileCollections profileUserId={profileUserId}/>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
