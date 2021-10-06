import { IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonList, IonRow, IonTextarea } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useState } from "react";
import FlexImage from "../image/FlexImage";
import ImageCarousel from "../gallery/ImageCarousel";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";

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
        <IonCol>
          <IonRow>
            <IonLabel>Photos</IonLabel>
          </IonRow>
          <IonRow>
            <ImageEditList />
          </IonRow>
          <input
            id="my-image-input"
            type="file"
            accept="image/png, image/jpg"
            onChange={imageChangeHandler}
            multiple={false}
            hidden={true}
          />
          <IonRow className="ion-justify-content-end">
            <IonButton
              onClick={() => document.getElementById("my-image-input").click()}
            >
              Add Photos
            </IonButton>
          </IonRow>
        </IonCol>
      </IonItem>
      <IonItem>
        <IonRow>
          <IonButton
            onClick={() => console.log("Clicked save")}
          >
            Save
          </IonButton>
        </IonRow>
      </IonItem>
    </IonList>
  );
};

export default ItemForm;
