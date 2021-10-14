import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonImg, IonText, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

import "./Profile.scss";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import FollowButton from "../../components/button/FollowButton";
import UnfollowButton from "../../components/button/UnfollowButton";
import EditProfileButton from "../../components/button/EditProfileButton";
import ProfileCollection from "../../components/profile-collection/ProfileCollection";
import AddButton from "../../components/button/AddButton";
import useUserContext from "../../hooks/useUserContext";
import { getUserId } from "../../utils/user";
import { getCollections } from "../../services/collections";
import { getUserByUserId } from "../../services/users";
const LIMIT = 10;

const Profile = () => {
  const history = useHistory();
  const { currentUserId } = useUserContext();

  // if not username and isLoggedIn, redirect to /profile/{username_from_local_storage}
  // if not username and not isLoggedIn, prompt log in
  let { username } = useParams();
  let userId = getUserId();

  const [profileUserId, setProfileUserId] = useState(null);
  const [profileFullName, setProfileFullName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileProfilePicture, setProfileProfilePicture] = useState(null);
  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const getUserInformation = useCallback(() => {
    getUserByUserId(currentUserId)
      .then((res) => {
        console.log(res);
        setProfileUserId(Number(res.userId));
        setProfileFullName(res.firstName + " " + res.lastName);
        setProfileUsername(res.username);
        setProfileProfilePicture(res.pictureUrl);
      })
      .catch((e) => console.log(e));
  },[currentUserId]);

  const loadUserCollections = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedCollections = await getCollections(null, userId, nextPage * LIMIT, LIMIT);

      if ((retrievedCollections && retrievedCollections.length < LIMIT) || !retrievedCollections) {
        setHasMore(false);
      }
      setCollections([...collections, ...retrievedCollections]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [collections, hasMore, pages, userId]);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  useEffect(() => {
    loadUserCollections();
  }, [loadUserCollections]);

  const fetchNextPage = () => {
    console.log("load next");
    loadUserCollections();
  };
  return (
    <IonPage className="profile">
      <ProfileToolbar username={profileUsername} />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* --ion-grid-width to modify the fixed width */}
        <IonGrid fixed className="profile--grid">
          <IonRow>
            <IonCol size="auto">
              {/* <Logo className="profile--img"/> */}
              <IonImg className="profile--img" src={profileProfilePicture} />
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
                {/* <div>
                  <IonButton>
                    <IonIcon size="small" slot="icon-only" icon={ellipsisVertical} />
                  </IonButton>
                </div> */}
              </IonRow>

              <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                {Number(currentUserId) === profileUserId ? (
                  <EditProfileButton onClick={() => history.push("/profile/edit")} />
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
              <b>{profileFullName}</b>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate fermentum venenatis. Proin feugiat nisi sit amet quam
              vestibulum tincidunt. Cras blandit, erat sed accumsan fermentum, mi ante dapibus libero, at ultrices lectus urna eu nisl.
            </div>
          </IonRow>
          <IonRow className="ion-justify-content-end">
            {/* Direct to AddCollection page */}
            <AddButton label="Collection" onClick={() => history.push("/collections/add")} />
          </IonRow>
          <IonRow className=" ion-justify-content-center">
            <IonList className="profile-collection--list">
              {collections.map((collection, index) => (
                <ProfileCollection collection={collection} key={index} onClick={() => history.push(`/collections/${collection.collectionId}`)} />
              ))}
              <IonInfiniteScroll disabled={!hasMore} onIonInfinite={fetchNextPage}>
                <IonInfiniteScrollContent className="ion-margin-top" loadingText="Loading..." />
              </IonInfiniteScroll>
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
