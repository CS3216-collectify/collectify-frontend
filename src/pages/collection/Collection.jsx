import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow, IonText, IonIcon } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import { peopleOutline } from "ionicons/icons";

import useUserContext from "../../hooks/useUserContext";
import AddButton from "../../components/button/AddButton";
import EditButton from "../../components/button/EditButton";
import ImageGrid from "../../components/gallery/ImageGrid";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCollectionByCollectionId } from "../../services/collections";
import "./Collection.scss";

const Collection = (props) => {
  const history = useHistory();
  // const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  const { collectionId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ownerUserId, setOwnerUserId] = useState(null);
  const [ownerName, setOwnerName] = useState("User's Name");
  const [ownerUsername, setOwnerUsername] = useState("Username");
  const [loading, setLoading] = useState(false);

  const { currentUserId } = useUserContext();

  const loadCollectionData = useCallback(async () => {
    setLoading(true);
    try {
      const collectionData = await getCollectionByCollectionId(collectionId);
      console.log(collectionData);
      setTitle(collectionData.collectionName);
      setDescription(collectionData.collectionDescription);
      setOwnerUserId(collectionData.userId);
      // setOwnerName("TODO");
      // setOwnerUsername("todo");
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
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonText className="collection-owner">
              <b>
                @{ownerUsername} ({ownerName})
              </b>
            </IonText>
          </IonRow>

          <IonRow>
            <div className="collection-title--container">
              <IonText className="collection--title">
                <b>
                  <b>{title}</b>
                </b>
              </IonText>

              <div className="collection-followers--container">
                <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
                20 followers
              </div>
            </div>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonText>{description}</IonText>
            </IonCol>
          </IonRow>
          {/* TODO: add follow button */}
          {Number(currentUserId) === Number(ownerUserId) && (
            <IonRow className="ion-justify-content-end">
              <IonCol><AddButton className="collection--button" label="Item" onClick={() => history.push(`/collections/${collectionId}/items/add`)} /></IonCol>
              <IonCol><EditButton className="collection--button" label="Collection" onClick={() => history.push(`/collections/${collectionId}/edit`)} /></IonCol>
            </IonRow>
          )}
          <ImageGrid collectionId={collectionId} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
