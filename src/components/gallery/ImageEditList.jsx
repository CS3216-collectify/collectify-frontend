import {
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import FlexImage from "../image/FlexImage"
import { trashBin } from "ionicons/icons";
import "./gallery.scss";

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

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
}

const ImageEditList = (props) => {
  const [images, setImages] = useState(mockImages.slice(0, LIMIT));

  const groupsOfFour = groupElements(images, 4);

  return (
    <IonGrid className="image-grid">
      {groupsOfFour.map((grp, idx) => (
        <IonRow className="single-row-4 ion-justify-content-evenly" size={12} key={idx}>
          {grp.map((url, idx) => (
            <React.Fragment key={idx}>
              <IonCol className="single-image-4"  size={2}>
                <FlexImage src={url} />
              </IonCol>
              <IonCol size={1}>
                <IonIcon className="delete-icon" icon={trashBin} />
              </IonCol>
            </React.Fragment>
          ))}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default ImageEditList;
