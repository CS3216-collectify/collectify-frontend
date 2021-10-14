import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AddButton from "../../components/button/AddButton";
import EditButton from "../../components/button/EditButton";
import CategoryChip from "../../components/chip/CategoryChip";
import ImageGrid from "../../components/gallery/ImageGrid";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCollectionByCollectionId } from "../../services/collections";
import "./Collection.scss";
import CollectionItems from "../../components/collection-items/CollectionItems";

const Collection = (props) => {
  const history = useHistory();
  // const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  const { collectionId } = useParams();
  const [title, setTitle] = useState("TODO");
  const [description, setDescription] = useState("TODO");
  const [ownerName, setOwnerName] = useState("TODO");
  const [ownerUsername, setOwnerUsername] = useState("todo");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    setLoading(true);
    loadCollectionData();
  }, []);

  const loadCollectionData = async () => {
    setLoading(true);
    try {
      const collectionData = await getCollectionByCollectionId(collectionId);
      const { collectionName, collectionDescription, categoryName, categoryId } = collectionData;
      setTitle(collectionName);
      setDescription(collectionDescription);
      setCategoryName(categoryName);
      setCategoryId(categoryId);
      // setOwnerName("TODO");
      // setOwnerUsername("todo");
      // setCategoryId(collectionData.categoryId);
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
          <IonRow className="ion-justify-content-start">
            <IonCol>{categoryName && <CategoryChip name={categoryName} />}</IonCol>
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
          <CollectionItems collectionId={collectionId} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
