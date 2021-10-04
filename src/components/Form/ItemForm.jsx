import { IonContent, IonInput, IonItem, IonLabel, IonList, IonTextarea } from "@ionic/react";
import ImageEditList from "../ImageGallery/ImageEditList";
import { useState } from "react";

const ItemForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const nameChangeHandler = (e) => {
    setName(e.detail.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.detail.value);
  };

  const imageChangeHandler = (e) => {
    if (images.length > 3) {
      console.log("Cannot upload more than 4 photos");
      return;
    }
    setImages([...images, e.target.files[0]]);
  }

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput
            value={name}
            placeholder="Enter item name"
            onIonChange={nameChangeHandler}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Description</IonLabel>
          <IonTextarea
            value={description}
            placeholder="Enter item description"
            onIonChange={descriptionChangeHandler}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Images</IonLabel>
        </IonItem>
        <IonItem>
          <ImageEditList />
        </IonItem>
        <IonItem>
          <IonInput
            type="file"
            accept="image/png, image/jpg"
            onIonChange={imageChangeHandler}
            multiple={false}
          />
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default ItemForm;
