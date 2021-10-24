import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useToastContext from "../../hooks/useToastContext";
import { deleteItem, getItemFromCollection, updateItem } from "../../services/items";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const EditItem = () => {
  const location = useLocation();
  const history = useHistory();
  const setToast = useToastContext();
  const { collectionId, itemId } = useParams();
  const [item, setItem] = useState(getDefaultItemData());
  const [loading, setLoading] = useState(false);

  const loadExistingData = useCallback(async () => {
    setLoading(true);
    try {
      const currentItem = await getItemFromCollection(collectionId, itemId);
      setItem(currentItem);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [collectionId, itemId]);

  useEffect(() => {
    if (location.state) {
      console.log("Loading form data from state...");
      setItem({ ...location.state.item });
    } else {
      console.log("Fetching form data from server...");
      setLoading(true);
      loadExistingData();
    }
  }, [loadExistingData, location]);

  const editCompleteHandler = async (item) => {
    setLoading(true);
    try {
      await updateItem(collectionId, itemId, item);
      setLoading(false);
      history.goBack(); //(`/collections/${collectionId}/items/${itemId}`);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      await deleteItem(collectionId, itemId);
      history.push(`/collections/${collectionId}`);
      setToast({ message: "Successfully item.", color: "success" });
    } catch (e) {
      setToast({ message: "Failed to delete item.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <IonPage>
      <IonLoading isOpen={loading} spinner="crescent" />
      <HomeToolbar title="Edit Item" />
      <IonContent>
        <ItemForm onComplete={editCompleteHandler} itemData={item} onDelete={deleteHandler} />
      </IonContent>
    </IonPage>
  );
};

export default EditItem;
