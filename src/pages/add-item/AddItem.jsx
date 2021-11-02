import { IonContent, IonPage } from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import UploadingGif from "../../assets/uploading.gif";
import ItemForm from "../../components/form/ItemForm";
import FlexImage from "../../components/image/FlexImage";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useToastContext from "../../hooks/useToastContext";
import { postItem } from "../../services/items";
import { trackPageView } from "../../services/react-ga";
import "./AddItem.scss";

const AddItem = () => {
  const history = useHistory();
  const { collectionId } = useParams();
  // const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const setToast = useToastContext();

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const addCompleteHandler = async (item) => {
    try {
      setUploading(true);
      await postItem(collectionId, item).then((itemId) => {
        setTimeout(() => {
          setUploading(false);
          history.replace(`/collections/${collectionId}/items/${itemId}`);
        }, 1500);
      });
    } catch (e) {
      setUploading(false);
      setToast({ message: "Failed to add item. Please try again later.", color: "danger" });
    } finally {
    }
  };

  return (
    <IonPage>
      <HomeToolbar title="Add Item" />
      <IonContent>
        {uploading ? (
          <div className="uploading--container">
            <FlexImage src={UploadingGif} />
          </div>
        ) : (
          <ItemForm onComplete={addCompleteHandler} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddItem;
