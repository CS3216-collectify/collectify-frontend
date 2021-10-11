import { IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useState } from "react";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import UploadButton from "../button/UploadButton";
import SaveButton from "../button/SaveButton";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const ItemForm = (props) => {
  const { itemData = getDefaultItemData(), onComplete: completeHandler } =
    props;

  const [name, setName] = useState(itemData.itemName);
  const [description, setDescription] = useState(itemData.itemDescription);
  const [images, setImages] = useState(itemData.images);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  const newImageHandler = (newFile) => {
    if (images.length > 3) {
      console.log("Cannot upload more than 4 photos");
      return;
    }
    const newUrl = URL.createObjectURL(newFile);
    const newFileData = { url: newUrl, position: images.length, isNew: true };
    setImages([...images, newFileData]);
    console.log("Image upload not implemented yet");
    console.log("file:", newFile);
  };

  console.log("images", images);

  const deleteImageHandler = (selectedIndex) => {
    const deletedImage = images[selectedIndex];
    const remainingImages = images.filter((_, idx) => idx !== selectedIndex);
    if (!deletedImage.isNew) {
      // image needs to be deleted from database
      setDeletedImageIds([...deletedImageIds, deletedImage.imageId]);
    }
    setImages(remainingImages);
  }

  const saveHandler = () => {
    // const newImages = images.filter((img) => img.isNew);
    // const imageUpdates = {
    //   deletedImageIds,
    //   newImages,
    //   images
    // }

    const itemToSave = {
      name,
      description,
      images,
      // imageUpdates
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
          <ImageEditList images={images} onDelete={deleteImageHandler} />
          <IonRow className="ion-justify-content-end">
            <UploadButton onChange={newImageHandler} />
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
