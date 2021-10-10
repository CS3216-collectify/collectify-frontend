import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getItemFromCollection, updateItem } from "../../services/items";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const EditItem = () => {
  const { collectionId, itemId } = useParams();
  const [item, setItem] = useState(getDefaultItemData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(loadExistingData, 1500); // TODO: Remove timeout
  }, []);

  const loadExistingData = async () => {
    setLoading(true);
    try {
      const currentItem = await getItemFromCollection(collectionId, itemId);
      console.log(currentItem);
      setItem(currentItem);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const editCompleteHandler = async (item) => {
    const updatedItem = await updateItem(collectionId, itemId, item);
    setItem(updatedItem);
    // redirect
  };

  if (loading) {
    return (<IonLoading isOpen={loading}/>)
  }

  return (
    <IonPage>
      <HomeToolbar title="Edit Item" />
      <IonContent>
        <ItemForm onComplete={editCompleteHandler} itemData={item} />
      </IonContent>
    </IonPage>
  );
};

export default EditItem;
