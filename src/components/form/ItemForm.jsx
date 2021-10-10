import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow, IonTextarea } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useState } from "react";
import FlexImage from "../image/FlexImage";
import ImageCarousel from "../gallery/ImageCarousel";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import UploadButton from "../button/UploadButton";
import SaveButton from "../button/SaveButton";

const sampleImage =
  "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

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
    const newFile = e.target.files[0];
    setImages([...images, newFile]);
    e.target.files = null;
  }

  return (
    <IonList>
      <IonItem>
        <TextInput
          label="Item Name"
          value={name}
          placeholder="Enter item name"
          onChange={setName}
        />
      </IonItem>
      <IonItem>
        <TextArea
          label="Description"
          value={description}
          placeholder="Enter item description"
          onChange={setDescription}
        />
      </IonItem>
      <IonItem>
        <IonGrid fixed>
          <IonLabel>Photos</IonLabel>
          <ImageEditList />
          <IonRow className="ion-justify-content-end">
            <UploadButton 
              onChange={imageChangeHandler}
            />
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <SaveButton onClick={() => console.log("Save item handler not yet implemented")} />
      </IonItem>
    </IonList>
  );
};

export default ItemForm;
