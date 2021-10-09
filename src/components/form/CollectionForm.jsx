import {
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import CategoryChip from "../../chip/CategoryChip";
import SaveButton from "../button/SaveButton";
import SelectButton from "../button/SelectButton";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";

const CollectionForm = (props) => {
  // TODO: fetch from backend
  const categoryOptions = [
    {
      id: 1,
      name: "Cat1"
    },
    {
      id: 2,
      name: "Cat2"
    },
  ];

  const selectOptions = categoryOptions.map((cat) => ({ value: cat.id, text: cat.name }));
  const convertCategoryIdToName = (selectedId) => categoryOptions.filter((cat) => cat.id === selectedId)[0]?.name ?? "Unknown";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  return (
    <IonList>
      <IonItem>
        <TextInput label="Collection Title" value={name} placeholder="Enter a title" onChange={setName} />
      </IonItem>
      <IonItem>
        <TextArea
          label="Summary"
          value={description}
          placeholder="Enter collection summary"
          onChange={setDescription}
        />
      </IonItem>
      <IonItem>
        <IonRow className="ion-justify-content-start">
          {categories.map((catId, idx) => (
            <IonCol key={idx}>
              <CategoryChip 
                name={convertCategoryIdToName(catId)} 
                onDelete={() => console.log(`delete ${catId}`)}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow className="ion-justify-content-end">
            <SelectButton 
              onChange={setCategories} 
              options={selectOptions}
              buttonLabel="Edit Categories"
              selectLabel="Categories"
            />
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <SaveButton onClick={() => console.log("Save collection handler not yet implemented")} />
      </IonItem>
    </IonList>
  );
};

export default CollectionForm;
