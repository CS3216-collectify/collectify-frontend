import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getItemFromCollection, updateItem } from "../../services/items";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const EditItem = () => {
  const history = useHistory();
  const { collectionId, itemId } = useParams();
  const [item, setItem] = useState(getDefaultItemData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadExistingData(); // TODO: Remove timeout
  }, []);

  const loadExistingData = async () => {
    setLoading(true);
    try {
      const currentItem = await getItemFromCollection(collectionId, itemId);
      console.log(currentItem);
      setItem(currentItem);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const editCompleteHandler = async (item) => {
    setLoading(true);
    try {
      await updateItem(collectionId, itemId, item);
      history.push(`/collections/${collectionId}/items/${itemId}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={loading} spinner="crescent"/>
      <HomeToolbar title="Edit Item" />
      <IonContent>
        <ItemForm onComplete={editCompleteHandler} itemData={item} />
      </IonContent>
    </IonPage>
  );
};

export default EditItem;
