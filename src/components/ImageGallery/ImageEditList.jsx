import {
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import FlexIonImg from "../Image/FlexIonImg"
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

const LIMIT = 4;

const groupElementsByFour = (arr) => {
  const groupsofFour = [];
  var i = 0;
  var group = [];
  for (let elem of arr) {
    if (i === 4) {
      groupsofFour.push(group);
      group = [];
      i = 0;
    }
    group.push(elem);
    i = i + 1;
  }
  groupsofFour.push(group);

  console.log(groupsofFour);
  return groupsofFour;
};

const ImageEditList = (props) => {
  const [images, setImages] = useState(mockImages.slice(0, LIMIT));

  const groupsOfFour = groupElementsByFour(images);

  return (
    <IonGrid className="image-grid">
      {groupsOfFour.map((grp, idx) => (
        <IonRow className="single-row-4 ion-justify-content-evenly" size={12} key={idx}>
          {grp.map((url, idx) => (
            <IonCol key={idx} className="single-image-4"  size={2}>
              <FlexIonImg src={url} />
            </IonCol>
          ))}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default ImageEditList;
