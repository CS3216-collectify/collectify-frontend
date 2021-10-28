import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import FlexImage from "../../components/image/FlexImage";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { postItem } from "../../services/items";
import UploadingGif from "../../assets/uploading.gif";
import "./AddItem.scss";

const AddItem = () => {
  const history = useHistory();
  const { collectionId } = useParams();
  // const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
      console.log(e);
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
