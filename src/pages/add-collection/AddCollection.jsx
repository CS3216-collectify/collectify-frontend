import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCategories } from "../../services/categories";
import { postCollection } from "../../services/collections";

const AddCollection = () => {
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const addCollectionHandler = async (collection) => {
    const collectionId = await postCollection(collection);
    // redirect to new addedCollection
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(loadCategoryOptions, 1500); // TODO: Remove timeout
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
