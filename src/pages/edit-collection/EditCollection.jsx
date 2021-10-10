import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(getDefaultCollectionData());
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(loadExistingData, 1500); // TODO: Remove timeout
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
    const updatedCollection = await updateCollection(collectionId, collection);
    // redirect
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
