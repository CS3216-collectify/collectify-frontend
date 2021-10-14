import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router";

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
    <IonPage>
      <IonLoading isOpen={loading} />
      <HomeToolbar title={`Collection`} />
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol size={8}>
              <p>{title}</p>
            </IonCol>
            <IonCol size={4}>
              <p>20 followers</p>
            </IonCol>
          </IonRow>
          <IonRow className="top-margin-s">
            <IonCol>
              <p>
                by @{ownerUsername} ({ownerName}){" "}
              </p>
            </IonCol>
          </IonRow>
          <IonRow className="top-margin-s">
            <IonCol>
              <p>{description}</p>
            </IonCol>
          </IonRow>
          {Number(currentUserId) === Number(ownerUserId) && (
            <IonRow className="ion-justify-content-end">
              <AddButton label="Item" onClick={() => history.push(`/collections/${collectionId}/items/add`)} />
              <EditButton label="Collection" onClick={() => history.push(`/collections/${collectionId}/edit`)} />
            </IonRow>
          )}
          <ImageGrid collectionId={collectionId} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
