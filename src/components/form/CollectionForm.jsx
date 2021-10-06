import {
  IonButton,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
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
import CategoryChip from "../../chip/CategoryChip";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";

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
    <IonList>
      <IonItem>
        <TextInput title="Collection Title" value={name} placeholder="Enter a title" onChange={setName} />
      </IonItem>
      {/* <IonItem>
        <IonGrid>
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
        </IonGrid>
      </IonItem> */}
      <IonItem>
        <TextArea
          title="Summary"
          value={description}
          placeholder="Enter collection summary"
          onChange={setDescription}
        />
      </IonItem>
      <IonItem>
        <IonRow className="ion-justify-content-start">
          {categories.map((cat, idx) => (
            <IonCol key={idx}>
              <CategoryChip 
                name={cat} 
                onDelete={() => console.log(`delete ${cat}`)}
              />
            </IonCol>
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

export default CollectionForm;
