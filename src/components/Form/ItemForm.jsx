import { IonContent, IonInput, IonItem, IonList } from "@ionic/react";
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
    setImages([...images, e.target.files[0]]);
  }

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonInput
            value={name}
            placeholder="Enter item name"
            onIonChange={nameChangeHandler}
          />
        </IonItem>
        <IonItem>
          <IonInput
            value={description}
            placeholder="Enter item description"
            onIonChange={descriptionChangeHandler}
          />
        </IonItem>
        <IonItem>
          {/* Display images here */}
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
