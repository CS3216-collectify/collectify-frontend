import { IonCol, IonGrid, IonItem, IonList, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import CategoryChip from "../../chip/CategoryChip";
import { getCategories } from "../../services/categories";
import SaveButton from "../button/SaveButton";
import SelectButton from "../button/SelectButton";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";

const getDefaultCollectionData = () => {
  return { collectionName: "", collectionDescription: "", categoryId: null };
};

const CollectionForm = (props) => {
  const {
    collectionData = getDefaultCollectionData(),
    onComplete: completeHandler,
    categoryOptions,
  } = props;

  // const [categoryOptions, setCategoryOptions] = useState([]);
  const [name, setName] = useState(collectionData.collectionName);
  const [description, setDescription] = useState(collectionData.collectionDescription);
  const [categoryId, setCategory] = useState(null);

  // useEffect(() => {
  //   loadCategoryOptions();
  // }, []);

  // const loadCategoryOptions = async () => {
  //   const options = await getCategories();
  //   setCategoryOptions(options);
  // };

  console.log(categoryOptions);
  const selectOptions = categoryOptions.map((cat) => ({
    value: cat.categoryId,
    text: cat.name,
  }));

  const convertCategoryIdToName = (selectedId) =>
    categoryOptions.filter((cat) => cat.categoryId === selectedId)[0]?.name ??
    "Unknown";

  const saveHandler = () => {
    const collectionToSave = {
      name,
      description,
      categoryId,
      // other data
    };
    completeHandler(collectionToSave);
  };

  return (
    <IonList>
      <IonItem>
        <TextInput
          label="Collection Title"
          value={name}
          placeholder="Enter a title"
          onChange={setName}
        />
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
          <IonCol>
            {categoryId && 
              <CategoryChip
                name={convertCategoryIdToName(categoryId)}
                onDelete={() => console.log(`delete ${categoryId}`)}
              />
            }
          </IonCol>
        </IonRow>
      </IonItem>
      <IonItem>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-end">
            <SelectButton
              onChange={setCategory}
              options={selectOptions}
              buttonLabel="Edit Categories"
              selectLabel="Categories"
            />
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <SaveButton onClick={saveHandler} />
      </IonItem>
    </IonList>
  );
};

export default CollectionForm;
