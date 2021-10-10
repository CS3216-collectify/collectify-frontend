import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { postItem } from "../../services/items";

const AddItem = () => {
  const { collectionId } = useParams();

  const addCompleteHandler = async (item) => {
    const itemId = await postItem(collectionId, item);
    // redirect
  };

  return (
    <IonPage>
      <HomeToolbar title="Add Item" />
      <IonContent>
        <ItemForm onComplete={addCompleteHandler} />
      </IonContent>
    </IonPage>
  );
};

export default AddItem;
