import { IonContent, IonPage } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import DeletingGif from "../../assets/deleting.gif";
import SavingGif from "../../assets/saving.gif";
import ItemForm from "../../components/form/ItemForm";
import FlexImage from "../../components/image/FlexImage";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { deleteItem, getItemFromCollection, updateItem } from "../../services/items";

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
      setToast({ message: "Failed to load item information. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [collectionId, history, isCurrentUser, itemId, setToast]);

  useEffect(() => {
    if (location.state) {
      setItem({ ...location.state.item });
    } else if (collectionId && itemId && location.pathname.startsWith(`/collections/${collectionId}/items/${itemId}/edit`)) {
      loadExistingData();
    }
  }, [collectionId, itemId, loadExistingData, location]);

  const editCompleteHandler = async (item) => {
    try {
      setUploading(true);
      await updateItem(collectionId, itemId, item).then(() => {
        setTimeout(() => {
          setUploading(false);
          setToast({ message: "Item updated successfully", color: "success" });
          history.replace(`/collections/${item.updatedCollection}/items/${itemId}`);
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
          <ItemForm onComplete={editCompleteHandler} itemData={item} collectionId={collectionId} onDelete={deleteHandler} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditItem;
