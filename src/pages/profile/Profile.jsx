import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";

import "./Profile.scss";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import FollowButton from "../../components/button/FollowButton";
import UnfollowButton from "../../components/button/UnfollowButton";
import EditProfileButton from "../../components/button/EditProfileButton";
import ProfileCollection from "../../components/profile-collection/ProfileCollection";
import AddButton from "../../components/button/AddButton";
import { getUserId } from "../../utils/user";
import { getCollections } from "../../services/collections";

const LIMIT = 10;

const Profile = () => {
  const history = useHistory();

  // if not username and isLoggedIn, redirect to /profile/{username_from_local_storage}
  // if not username and not isLoggedIn, prompt log in
  let { username } = useParams();
  let userId = getUserId();

  // to keep track of which buttons to show, will need to be updated when unfollow/follow is pressed
  let isMyAccount = true;
  let hasFollowed = true;

  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const loadUserCollections = async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedCollections = await getCollections(
        null,
        userId,
        nextPage * LIMIT,
        LIMIT
      );
      console.log(retrievedCollections);
      if (
        (retrievedCollections && retrievedCollections.length < LIMIT) ||
        !retrievedCollections
      ) {
        setHasMore(false);
      }
      setCollections([...collections, ...retrievedCollections]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadUserCollections();
  }, []);

  const fetchNextPage = () => {
    console.log("load next");
    loadUserCollections();
  }
  return (
    <IonPage className="profile">
      <ProfileToolbar username={"my username"} />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* --ion-grid-width to modify the fixed width */}
        <IonGrid fixed className="profile--grid">
          <IonRow>
            <IonCol size="auto">
              {/* <Logo className="profile--img"/> */}
              <IonImg
                className="profile--img"
                src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
              />
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
                {isMyAccount ? (
                  <EditProfileButton
                    onClick={() => history.push("/profile/edit")}
                  />
                ) : hasFollowed ? (
                  <UnfollowButton />
                ) : (
                  <FollowButton />
                )}
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow className="profile-details--container">
            <div>
              <b>John Doe</b>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              vulputate fermentum venenatis. Proin feugiat nisi sit amet quam
              vestibulum tincidunt. Cras blandit, erat sed accumsan fermentum,
              mi ante dapibus libero, at ultrices lectus urna eu nisl.
            </div>
          </IonRow>
          <IonRow className="ion-justify-content-end">
            {/* Direct to AddCollection page */}
            <AddButton
              label="Collection"
              onClick={() => history.push("/collections/add")}
            />
          </IonRow>
          <IonRow className=" ion-justify-content-center">
            <IonList className="profile-collection--list">
              {collections.map((collection, idx) => (
                <ProfileCollection
                  key={idx}
                  collection={collection}
                  onClick={() =>
                    history.push(`/collections/${collection.collectionId}`)
                  }
                />
              ))}
              <IonInfiniteScroll disabled={!hasMore} onIonInfinite={fetchNextPage}>
                <IonInfiniteScrollContent
                  className="ion-margin-top"
                  loadingText="Loading..."
                />
              </IonInfiniteScroll>
            </IonList>
          </IonRow>
        </IonGrid>
        {/* TODO: Check the following */}
        {/* <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          color={toastColor}
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
