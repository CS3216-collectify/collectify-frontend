import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonImg, IonText, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

import "./Profile.scss";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import FollowButton from "../../components/button/FollowButton";
import UnfollowButton from "../../components/button/UnfollowButton";
import EditProfileButton from "../../components/button/EditProfileButton";
import AddButton from "../../components/button/AddButton";
import { getUserId } from "../../utils/user";
import { getCurrentUser, getUserByUsername } from "../../services/users";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import FlexImage from "../../components/image/FlexImage";
import ProfileCollections from "../../components/profile-collection/ProfileCollections";
import Toggle from "../../components/toggle/Toggle";

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
  const [profileProfilePicture, setProfileProfilePicture] = useState(null);
  const [mode, setMode] = useState(COLLECTIONS_MODE);

  const toggleMode = (mode) => {
    setMode(parseInt(mode));
  }

  // TODO: add api call for username
  const getUserInformation = useCallback(() => {
    if (currentUserId) {
      getCurrentUser()
        .then((res) => {
          setProfileUserId(Number(currentUserId));
          setProfileFirstName(res.firstName);
          setProfileLastName(res.lastName);
          setProfileUsername(res.username);
          setProfileProfilePicture(res.pictureUrl);
        })
        .catch((e) => console.log(e));
    } else {
      if (username) {
        getUserByUsername()
          .then((res) => {
            setProfileUserId(Number(res.userId));
            setProfileFirstName(res.firstName);
            setProfileLastName(res.lastName);
            setProfileUsername(res.username);
            setProfileProfilePicture(res.pictureUrl);
          })
          .catch((e) => console.log(e));
      }
    }
  }, [currentUserId, username]);

  useEffect(() => {
    if (!username && currentUserId) {
      getUserInformation();
    }
  }, [currentUserId, getUserInformation, username]);

  const handleGoogleLogin = async (googleAuthStatus) => {
    if (googleAuthStatus === GoogleAuthStatus.GOOGLE_AUTH_SUCCESS) {
      // success
      setToast({ message: "Google authentication successful!", color: "success" });
      setIsUserAuthenticated(true);
      setCurrentUserId(getUserId());
      history.replace("/home");
    } else {
      // error
      setToast({ message: "Google authentication failed. Please try again.", color: "danger" });
    }
  };

  return (
    <IonPage className="profile">
      <ProfileToolbar username={profileUsername} />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* --ion-grid-width to modify the fixed width */}

        {username ? (
          <>Show other people's profile</>
        ) : currentUserId ? (
          <IonGrid fixed className="profile--grid">
            <IonRow>
              <IonCol size="auto">
                {/* <Logo className="profile--img"/> */}
                <FlexImage className="profile--img" src={profileProfilePicture} />
              </IonCol>

              <IonCol>
                <IonRow className="profile-statistics--container ion-align-items-center ion-justify-content-center">
                  <div className="profile-statistics ion-text-center">
                    <IonText>
                      <b>{"3"}</b>
                    </IonText>
                    <br />
                    <IonText>COLLECTIONS</IonText>
                  </div>
                  <div className="profile-statistics ion-text-center">
                    <IonText>
                      <b>{"15"}</b>
                    </IonText>
                    <br />
                    <IonText>ITEMS</IonText>
                  </div>
                  <div className="profile-statistics ion-text-center">
                    <IonText>
                      <b>{"45"}</b>
                    </IonText>
                    <br />
                    <IonText>LIKES</IonText>
                  </div>
                </IonRow>

                <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                  {Number(currentUserId) === profileUserId ? (
                    <EditProfileButton
                      onClick={() =>
                        history.push({
                          pathname: "/profile/edit",
                          state: { profileUsername, profileProfilePicture, profileLastName, profileFirstName },
                        })
                      }
                    />
                  ) : true ? (
                    <UnfollowButton />
                  ) : (
                    <FollowButton />
                  )}
                </IonRow>
              </IonCol>
            </IonRow>

            <IonRow className="profile-details--container">
              <div>
                <b>{profileFirstName + " " + profileLastName}</b>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate fermentum venenatis. Proin feugiat nisi sit amet quam
                vestibulum tincidunt. Cras blandit, erat sed accumsan fermentum, mi ante dapibus libero, at ultrices lectus urna eu nisl.
              </div>
            </IonRow>
            <IonRow className="ion-justify-content-end">
              {/* Direct to AddCollection page */}
              <AddButton label="Collection" onClick={() => history.push("/add-collections")} />
            </IonRow>
            <IonRow>
              <Toggle value={mode} options={MODE_SELECT_OPTIONS} onChange={toggleMode} />
            </IonRow>
            <IonRow className=" ion-justify-content-center">
              {mode === LIKED_ITEMS_MODE &&
                null // TODO: Display liked items
              }
              {mode === FOLLOWING_COLLECTIONS_MODE &&
                null // TODO: Display followed collections
              }
              {mode === COLLECTIONS_MODE &&
                <ProfileCollections username={username} currentUserId={currentUserId} profileUserId={profileUserId}/>
              }
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid fixed>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <IonText>
                <h1>Log in to collectify to begin showcasing your collectables to the world!</h1>
              </IonText>
              <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
