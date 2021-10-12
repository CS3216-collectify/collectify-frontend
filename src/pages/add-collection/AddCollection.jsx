import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCategories } from "../../services/categories";
import { postCollection } from "../../services/collections";

const AddCollection = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const addCollectionHandler = async (collection) => {
    setLoading(true);
    try {
      const collectionId = await postCollection(collection);
      history.push(`/collections/${collectionId}`);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadCategoryOptions(); // TODO: Remove timeout
  }, []);

  const loadCategoryOptions = async () => {
    setLoading(true);
    try {
      const options = await getCategories();
      setCategoryOptions(options);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <HomeToolbar title="Add Collection" />
      <IonContent>
        <CollectionForm
          onComplete={addCollectionHandler}
          categoryOptions={categoryOptions}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddCollection;
