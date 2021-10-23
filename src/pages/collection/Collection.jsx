import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow, IonIcon } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import { peopleOutline } from "ionicons/icons";

import useUserContext from "../../hooks/useUserContext";
import AddButton from "../../components/button/AddButton";
import EditButton from "../../components/button/EditButton";
import UnfollowButton from "../../components/button/UnfollowButton";
import FollowButton from "../../components/button/FollowButton";
import CategoryChip from "../../components/chip/CategoryChip";
import ImageGrid from "../../components/gallery/ImageGrid";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCollectionByCollectionId } from "../../services/collections";
import "./Collection.scss";
import CollectionItems from "../../components/collection-items/CollectionItems";
import Text from "../../components/text/Text";
import { followByCollectionId, unfollowByCollectionId } from "../../services/followers";

const Collection = (props) => {
  const history = useHistory();
  // const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  const { collectionId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState(null);
  const [ownerUsername, setOwnerUsername] = useState("Username");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const { currentUserId } = useUserContext();

  const isCollectionOwner = Number(currentUserId) === Number(ownerId);

  const loadCollectionData = useCallback(async () => {
    setLoading(true);
    try {
      const collectionData = await getCollectionByCollectionId(collectionId);
      const { 
        collectionName, 
        collectionDescription, 
        categoryName, 
        categoryId, 
        ownerId, 
        ownerUsername, 
        isFollowed, 
        followersCount, 
      } = collectionData;
      setTitle(collectionName);
      setDescription(collectionDescription);
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
    setLoading(true);
    loadCollectionData();
  }, [loadCollectionData]);

  const followHandler = () => {
    if (followed || isCollectionOwner) {
      return;
    }
    followByCollectionId(collectionId).then(() => {
      setFollowersCount(followersCount + 1);
      setFollowed(true);
    })
  }

  const unfollowHandler = () => {
    if (!followed || isCollectionOwner) {
      return;
    }
    unfollowByCollectionId(collectionId).then(() => {
      setFollowersCount(followersCount - 1);
      setFollowed(false);
    })
  }

  return (
    <IonPage className="collection">
      <IonLoading isOpen={loading} spinner="crescent" />
      <HomeToolbar title={`Collection`} />
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow>
            <div className="collection-title--container">
              <Text size="xl" className="collection--title">
                <b>
                  <b>{title}</b>
                </b>
              </Text>

              <div className="collection-followers--container">
                <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
                {followersCount} followers
              </div>
            </div>
          </IonRow>
          <IonRow className="ion-justify-content-between">
            <Text size="s" className="collection-owner" onClick={() => history.push(`/profile/${ownerUsername}`)}>
              <b>
                by @{ownerUsername} 
              </b>
            </Text>
          </IonRow>
          <IonRow className="ion-justify-content-start">
            <IonCol>{categoryName && <CategoryChip name={categoryName} />}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Text>{description}</Text>
            </IonCol>
          </IonRow>
          {!isCollectionOwner && (followed ? (
              <UnfollowButton onClick={unfollowHandler} /> 
            ):( 
              <FollowButton onClick={followHandler} />
          ))}
          {isCollectionOwner && (
            <IonRow className="ion-justify-content-end">
              <IonCol>
                <AddButton className="collection--button" label="Item" onClick={() => history.push(`/collections/${collectionId}/add`)} />
              </IonCol>
              <IonCol>
                <EditButton className="collection--button" label="Collection" onClick={() => history.push(`/collections/${collectionId}/edit`)} />
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
