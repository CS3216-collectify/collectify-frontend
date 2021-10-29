import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow, IonIcon } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { peopleOutline } from "ionicons/icons";

import "./Collection.scss";
import useUserContext from "../../hooks/useUserContext";
import AddButton from "../../components/button/AddButton";
import EditButton from "../../components/button/EditButton";
import UnfollowButton from "../../components/button/UnfollowButton";
import FollowButton from "../../components/button/FollowButton";
import CategoryChip from "../../components/chip/CategoryChip";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCollectionByCollectionId } from "../../services/collections";
import CollectionItems from "../../components/collection-items/CollectionItems";
import Text from "../../components/text/Text";
import { followByCollectionId, unfollowByCollectionId } from "../../services/followers";
import useToastContext from "../../hooks/useToastContext";

const Collection = (props) => {
  const setToast = useToastContext();
  const location = useLocation();
  const history = useHistory();
  const { collectionId } = useParams();
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [ownerId, setOwnerId] = useState(null);
  const [ownerUsername, setOwnerUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const { isCurrentUser, isUserAuthenticated } = useUserContext();

  const isCollectionOwner = isCurrentUser(ownerId);

  const loadCollectionData = useCallback(async () => {
    setLoading(true);
    try {
      const collectionData = await getCollectionByCollectionId(collectionId);
      const { collectionName, collectionDescription, categoryName, categoryId, ownerId, ownerUsername, isFollowed, followersCount } = collectionData;

      setCollectionName(collectionName);
      setCollectionDescription(collectionDescription);
      setCategoryName(categoryName);
      setCategoryId(categoryId);
      setOwnerId(ownerId);
      setOwnerUsername(ownerUsername);
      setFollowed(isFollowed);
      setFollowersCount(followersCount);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    if (location.pathname.startsWith("/collections/")) {
      loadCollectionData();
    }
  }, [loadCollectionData, location]);

  const followHandler = () => {
    if (!isUserAuthenticated) {
      setToast({ message: "Please log in to follow a collection", color: "danger" });
      return;
    }

    if (followed || isCollectionOwner) {
      return;
    }
    followByCollectionId(collectionId)
      .then(() => {
        setFollowersCount(followersCount + 1);
        setFollowed(true);
      })
      .catch((e) => {
        setToast({ message: "Unable to follow collection. Please try again later.", color: "danger" });
      });
  };

  const unfollowHandler = () => {
    if (!isUserAuthenticated) {
      setToast({ message: "Please log in to follow a collection", color: "danger" });
      return;
    }

    if (!followed || isCollectionOwner) {
      return;
    }
    unfollowByCollectionId(collectionId)
      .then(() => {
        setFollowersCount(followersCount - 1);
        setFollowed(false);
      })
      .catch((e) => {
        setToast({ message: "Unable to unfollow collection. Please try again later.", color: "danger" });
      });
  };

  const editPageRedirect = () => {
    const pathname = `/collections/${collectionId}/edit`;
    const collection = { collectionName, collectionDescription, categoryId };
    const state = { collection };
    history.push({
      pathname,
      state,
    });
  };

  return (
    <IonPage className="collection">
      <HomeToolbar title={`Collection`} />
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow>
            <div className="collection-title--container">
              <Text size="xl" className="collection--title">
                <b>
                  <b>{collectionName}</b>
                </b>
              </Text>

              <div className="collection-followers--container clickable" onClick={() => history.push(`/collections/${collectionId}/followers`)}>
                <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
                <Text size="xs">{followersCount} followers</Text>
              </div>
            </div>
          </IonRow>
          <IonRow className="ion-justify-content-between">
            <Text size="s" className="collection-owner clickable" onClick={() => history.push(`/profile/${ownerUsername}`)}>
              <b>by @{ownerUsername}</b>
            </Text>
          </IonRow>
          <IonRow className="ion-justify-content-start">
            <IonCol>{categoryName && <CategoryChip name={categoryName} />}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Text>{collectionDescription}</Text>
            </IonCol>
          </IonRow>
          {!isCollectionOwner && (followed ? <UnfollowButton onClick={unfollowHandler} /> : <FollowButton onClick={followHandler} />)}
          {isCollectionOwner && (
            <IonRow className="ion-justify-content-end">
              <IonCol>
                <AddButton className="collection--button" label="Item" onClick={() => history.push(`/collections/${collectionId}/add`)} />
              </IonCol>
              <IonCol>
                <EditButton className="collection--button" label="Collection" onClick={editPageRedirect} />
              </IonCol>
            </IonRow>
          )}
          <CollectionItems collectionId={collectionId} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
