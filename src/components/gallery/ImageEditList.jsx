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

const LIMIT = 4;

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
}

const ImageEditList = (props) => {
  const { images, onDelete: deleteImageHandler } = props;

  const groupsOfFour = groupElements(images, 4);

  return (
    <IonGrid className="image-grid">
      {groupsOfFour.map((grp, idx) => (
        <IonRow className="single-row-4 ion-justify-content-left" size={12} key={idx}>
          {grp.map(({ imageUrl }, idx) => (
            <React.Fragment key={idx}>
              <IonCol className="single-image-4"  size={2}>
                <FlexImage src={imageUrl} />
              </IonCol>
              <IonCol size={1}>
                <IonIcon onClick={() => deleteImageHandler(idx)} className="delete-icon" icon={trashBin} />
              </IonCol>
            </React.Fragment>
          ))}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default ImageEditList;
