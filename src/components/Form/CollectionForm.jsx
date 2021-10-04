import { IonContent, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import { useState } from "react";

const CollectionForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const nameChangeHandler = (e) => {
    setName(e.detail.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.detail.value);
  };

  const addCategoryHandler = (e) => {
    const newCat = e.detail.value;
    setCategories(newCat);
  }

  console.log(categories);

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
          <IonLabel>Categories</IonLabel>
          <IonSelect value={categories} multiple placeholder="Please choose at least 1 category" onIonChange={addCategoryHandler}>
            <IonSelectOption value="category1">FirstCategory</IonSelectOption>
            <IonSelectOption value="category2">SecondCategory</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default CollectionForm;
