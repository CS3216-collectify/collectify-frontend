import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCategories } from "../../services/categories";
import {
  getCollectionByCollectionId,
  updateCollection,
} from "../../services/collections";

const getDefaultCollectionData = () => {
  return { collectionName: "", collectionDescription: "", categoryId: null };
};

const EditCollection = (props) => {
  const history = useHistory();
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(getDefaultCollectionData());
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadExistingData(); // TODO: Remove timeout
  }, []);

  const loadExistingData = async () => {
    setLoading(true);
    try {
      const currentCollection = await getCollectionByCollectionId(collectionId);
      const options = await getCategories();
      console.log(currentCollection);
      setCollection(currentCollection);
      setCategoryOptions(options);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <IonLoading isOpen={loading} />;
  }

  const editCompleteHandler = async (collection) => {
    setLoading(true);
    try {
      await updateCollection(collectionId, collection);
      history.push(`/collections/${collectionId}`);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <HomeToolbar title="Edit Collection" />
      <IonContent>
        <CollectionForm
          categoryOptions={categoryOptions}
          onComplete={editCompleteHandler}
          collectionData={collection}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditCollection;
