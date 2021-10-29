import { IonContent, IonLoading, IonPage, IonGrid } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useToastContext from "../../hooks/useToastContext";
import { deleteItem, getItemFromCollection, updateItem } from "../../services/items";
import FlexImage from "../../components/image/FlexImage";
import SavingGif from "../../assets/saving.gif";
import DeletingGif from "../../assets/deleting.gif";
import useUserContext from "../../hooks/useUserContext";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const EditItem = () => {
  const location = useLocation();
  const { isCurrentUser } = useUserContext();
  const history = useHistory();
  const setToast = useToastContext();
  const { collectionId, itemId } = useParams();
  const [item, setItem] = useState(getDefaultItemData());
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadExistingData = useCallback(async () => {
    setLoading(true);
    try {
      const currentItem = await getItemFromCollection(collectionId, itemId);
      if (!isCurrentUser(currentItem.ownerId)) {
        history.push(`/collections/${collectionId}/items/${itemId}`);
        return;
      }
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
    } else if (collectionId && itemId && location.pathname.startsWith(`/collections/${collectionId}/items/${itemId}/edit`)) {
      console.log("Fetching form data from server...");
      loadExistingData();
    }
  }, [loadExistingData, location]);

  const editCompleteHandler = async (item) => {
    try {
      setUploading(true);
      await updateItem(collectionId, itemId, item).then(() => {
        setTimeout(() => {
          setUploading(false);
          setToast({ message: "Item updated successfully", color: "success" });
          history.goBack();
        }, 1500);
      });
    } catch (e) {
      setUploading(false);
      setToast({ message: "Failed to update item.", color: "danger" });
    }
  };

  const deleteHandler = async () => {
    try {
      setDeleting(true);
      await deleteItem(collectionId, itemId).then(() => {
        setTimeout(() => {
          setDeleting(false);
          setToast({ message: "Successfully deleted item.", color: "success" });
          history.replace(`/collections/${collectionId}`);
        }, 2400);
      });
    } catch (e) {
      setDeleting(false);
      setToast({ message: "Failed to delete item.", color: "danger" });
    } finally {
    }
  };

  return (
    <IonPage>
      <HomeToolbar title="Edit Item" />
      <IonContent>
        {uploading ? (
          <div className="uploading--container">
            <FlexImage src={SavingGif} />
          </div>
        ) : deleting ? (
          <div className="uploading--container">
            <FlexImage src={DeletingGif} />
          </div>
        ) : (
          <ItemForm onComplete={editCompleteHandler} itemData={item} onDelete={deleteHandler} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditItem;
