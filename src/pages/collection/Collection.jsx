import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
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
  const [title, setTitle] = useState("TODO");
  const [description, setDescription] = useState("TODO");
  const [ownerName, setOwnerName] = useState("TODO");
  const [ownerUsername, setOwnerUsername] = useState("todo");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadCollectionData();
  }, []);

  const loadCollectionData = async () => {
    setLoading(true);
    try {
      const collectionData = await getCollectionByCollectionId(collectionId);
      setTitle(collectionData.collectionName);
      setDescription(collectionData.collectionDescription);
      // setOwnerName("TODO");
      // setOwnerUsername("todo");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
 

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
          <IonRow className="ion-justify-content-end">
            <AddButton label="Item" onClick={() => history.push(`/collections/${collectionId}/items/add`)} />
            <EditButton label="Collection" onClick={() => history.push(`/collections/${collectionId}/edit`)} />
          </IonRow>
          <ImageGrid collectionId={collectionId} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
