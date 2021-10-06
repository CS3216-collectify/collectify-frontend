import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import TextArea from "../text-input/TextArea";

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
  };

  console.log(categories);

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonCol>
            <IonRow>
              <IonLabel>Collection Title</IonLabel>
            </IonRow>
            <IonRow>
              <IonInput
                value={name}
                placeholder="Enter collection title"
                onIonChange={nameChangeHandler}
              />
            </IonRow>
          </IonCol>
        </IonItem>
        <IonItem>
          <IonRow className="ion-justify-content-start">
            {categories.map((cat, idx) => (
              <IonCol key={idx}>{cat}</IonCol>
            ))}
          </IonRow>
        </IonItem>
        <IonItem>
          <IonCol>
            <IonRow className="ion-justify-content-end">
              <IonButton
                onClick={() => document.getElementById("cat-select").click()}
              >
                Edit Categories
              </IonButton>
            </IonRow>
            <IonLabel hidden={true}>Categories</IonLabel>
            <IonSelect
              id="cat-select"
              multiple
              onIonChange={addCategoryHandler}
              hidden={true}
            >
              <IonSelectOption value="Cat1">Cat1</IonSelectOption>
              <IonSelectOption value="Cat2">Cat2</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonItem>
        <IonItem>
          <IonCol>
            <IonRow>
              <IonLabel>Summary</IonLabel>
            </IonRow>
            <IonRow>
              <TextArea
                value={description}
                placeholder="Enter collection summary"
                onChange={descriptionChangeHandler}
              />
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
    </IonContent>
  );
};

export default CollectionForm;
