import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCategories } from "../../services/categories";
import { getCollectionByCollectionId, updateCollection } from "../../services/collections";

const getDefaultCollectionData = () => {
  return { collectionName: "", collectionDescription: "", categoryId: null };
};

const EditCollection = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(getDefaultCollectionData());
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const loadExistingData = useCallback(async () => {
    setLoading(true);
    try {
      const currentCollection = await getCollectionByCollectionId(collectionId);
      const options = await getCategories();
      setCollection(currentCollection);
      setCategoryOptions(options);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    if (location.state) {
      console.log("Loading form data from state...");
      setCollection({ ...location.state.collection });
    } else {
      console.log("Fetching form data from server...");
      setLoading(true);
      loadExistingData();
    }
  }, [loadExistingData, location]);

  const editCompleteHandler = async (collection) => {
    setLoading(true);
    try {
      await updateCollection(collectionId, collection);
      history.goBack();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={loading} spinner="crescent"/>

      <HomeToolbar title="Edit Collection" />
      <IonContent>
        <CollectionForm categoryOptions={categoryOptions} onComplete={editCompleteHandler} collectionData={collection} />
      </IonContent>
    </IonPage>
  );
};

export default EditCollection;
