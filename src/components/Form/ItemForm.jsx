import { IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonList, IonRow, IonTextarea } from "@ionic/react";
import ImageEditList from "../ImageGallery/ImageEditList";
import { useState } from "react";
import FlexImage from "../Image/FlexImage";
import ImageCarousel from "../ImageGallery/ImageCarousel";

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
    <IonContent>
      <IonList>
        <IonItem>
          <IonCol>
            <IonRow>
              <IonLabel>Item Name</IonLabel>
            </IonRow>
            <IonRow>
              <IonInput
                value={name}
                placeholder="Enter item name"
                onIonChange={nameChangeHandler}
              />
            </IonRow>
          </IonCol>
        </IonItem>
        <IonItem>
          <IonCol>
            <IonRow>
              <IonLabel>Description</IonLabel>
            </IonRow>
            <IonRow>
              <IonTextarea
                autoGrow
                value={description}
                placeholder="Enter item description"
                onIonChange={descriptionChangeHandler}
              />
            </IonRow>
          </IonCol>
        </IonItem>
      </IonList>
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
    </IonContent>
  );
};

export default ItemForm;
