import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow, IonIcon } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import { peopleOutline } from "ionicons/icons";

import useUserContext from "../../hooks/useUserContext";
import AddButton from "../../components/button/AddButton";
import EditButton from "../../components/button/EditButton";
import CategoryChip from "../../components/chip/CategoryChip";
import ImageGrid from "../../components/gallery/ImageGrid";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCollectionByCollectionId } from "../../services/collections";
import "./Collection.scss";
import CollectionItems from "../../components/collection-items/CollectionItems";
import Text from "../../components/text/Text";

const Collection = (props) => {
  const history = useHistory();
  // const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  const { collectionId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ownerUserId, setOwnerUserId] = useState(null);
  const [ownerUsername, setOwnerUsername] = useState("Username");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  const { currentUserId } = useUserContext();

  const loadCollectionData = useCallback(async () => {
    setLoading(true);
    try {
      const collectionData = await getCollectionByCollectionId(collectionId);
      const { collectionName, collectionDescription, categoryName, categoryId, userId, ownerUsername } = collectionData;
      setTitle(collectionName);
      setDescription(collectionDescription);
      setCategoryName(categoryName);
      setCategoryId(categoryId);
      setOwnerUserId(userId);
      // setOwnerUsername(ownerUsername);
      setCategoryId(collectionData.categoryId);
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
                20 followers
              </div>
            </div>
          </IonRow>
          <IonRow className="ion-justify-content-between">
            <Text size="s" className="collection-owner">
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
          {/* TODO: add follow button */}
          {Number(currentUserId) === Number(ownerUserId) && (
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
