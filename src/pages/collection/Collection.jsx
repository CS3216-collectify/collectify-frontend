import { IonCol, IonContent, IonGrid, IonLoading, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageGrid from "../../components/gallery/ImageGrid";
import { getCollectionByCollectionId } from "../../services/collections";
import "./Collection.scss";

const Collection = (props) => {
  // const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  const { collectionId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  if (loading) {
    return <IonLoading isOpen={loading} />;
  }

  return (
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
        <ImageGrid />
      </IonGrid>
    </IonContent>
  );
};

export default Collection;
