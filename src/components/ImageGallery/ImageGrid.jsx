import {
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import FlexImage from "../Image/FlexImage"
import "./styles.css";

const sampleImage =
  "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

const mockImages = [
  sampleImage,
  sampleImage,
  sampleImage,
  sampleImage,
  sampleImage,
];

const groupElementsByThree = (arr) => {
  const groupsOfThree = [];
  var i = 0;
  var group = [];
  for (let elem of arr) {
    if (i === 3) {
      groupsOfThree.push(group);
      group = [];
      i = 0;
    }
    group.push(elem);
    i = i + 1;
  }
  groupsOfThree.push(group);

  console.log(groupsOfThree);
  return groupsOfThree;
};

const ImageGrid = (props) => {
  const [images, setImages] = useState(mockImages);

  const groupsOfThree = groupElementsByThree(images);

  return (
    <IonGrid className="image-grid">
      {groupsOfThree.map((grp, idx) => (
        <IonRow className="single-row-3" size={12} key={idx}>
          {grp.map((url, idx) => (
            <IonCol key={idx} className="single-image-3"  size={4}>
              <FlexImage src={url} />
            </IonCol>
          ))}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default ImageGrid;
