import { IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useState } from "react";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import UploadButton from "../button/UploadButton";
import SaveButton from "../button/SaveButton";

const sampleImage =
  "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const ItemForm = (props) => {
  const { itemData = getDefaultItemData(), onComplete: completeHandler } =
    props;

  const [name, setName] = useState(itemData.itemName);
  const [description, setDescription] = useState(itemData.itemDescription);
  const [images, setImages] = useState(itemData.images);

  const imageChangeHandler = (newFile) => {
    if (images.length > 3) {
      console.log("Cannot upload more than 4 photos");
      return;
    }
    const newUrl = URL.createObjectURL(newFile);
    const newFileData = { url: newUrl, position: images.length + 1 };
    setImages([...images, newFileData]);
    console.log("Image upload not implemented yet");
    console.log("file:", newFile);
  };

  const saveHandler = () => {
    const itemToSave = {
      name,
      description,
      images,
      // other data
    };
    completeHandler(itemToSave);
  };

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
            <UploadButton onChange={imageChangeHandler} />
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <SaveButton onClick={saveHandler} />
      </IonItem>
    </IonList>
  );
};

export default ItemForm;
