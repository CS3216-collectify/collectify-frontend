import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonItemDivider,
  IonItem,
  IonButton,
  IonIcon,
  IonChip,
  IonList,
  IonLabel,
} from "@ionic/react";
import { ellipsisVertical, peopleOutline } from "ionicons/icons";

import "./Profile.scss";
import Toast from "../../components/toast/Toast";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import ProfileToolbar from "../../components/toolbar/ProfileToolbar";
import FollowButton from "../../components/button/FollowButton";
import UnfollowButton from "../../components/button/UnfollowButton";

const Profile = () => {
  // TODO: conditional Toast color
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  // if not username and isLoggedIn, redirect to /profile/{username_from_local_storage}
  // if not username and not isLoggedIn, prompt log in
  let { username } = useParams();

  return (
    <IonPage className="profile">
      <ProfileToolbar username={"my username"} />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* --ion-grid-width to modify the fixed width */}
        <IonGrid fixed className="profile--grid">
          <IonRow>
            <IonCol size="auto">
              {/* <Logo className="profile--img"/> */}
              <IonImg
                className="profile--img"
                src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
              />
            </IonCol>

            <IonCol>
              <IonRow className="profile-statistics--container ion-align-items-center ion-justify-content-center">
                <div className="profile-statistics ion-text-center">
                  <IonText>
                    <b>{"3"}</b>
                  </IonText>
                  <br />
                  <IonText>COLLECTIONS</IonText>
                </div>
                <div className="profile-statistics ion-text-center">
                  <IonText>
                    <b>{"15"}</b>
                  </IonText>
                  <br />
                  <IonText>ITEMS</IonText>
                </div>
                <div className="profile-statistics ion-text-center">
                  <IonText>
                    <b>{"45"}</b>
                  </IonText>
                  <br />
                  <IonText>LIKES</IonText>
                </div>
                {/* <div>
                  <IonButton>
                    <IonIcon size="small" slot="icon-only" icon={ellipsisVertical} />
                  </IonButton>
                </div> */}
              </IonRow>

              <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                {/* <FollowButton /> */}
                <UnfollowButton />
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow className="profile-details--container">
            <div>
              <b>John Doe</b>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate fermentum venenatis. Proin feugiat nisi sit amet quam
              vestibulum tincidunt. Cras blandit, erat sed accumsan fermentum, mi ante dapibus libero, at ultrices lectus urna eu nisl.
            </div>
          </IonRow>
          <IonItemDivider />

          <IonRow>
            <IonList className="profile-collection--list">
              <div className="profile-collection--container ion-margin-vertical">
                <div className="profile-collection-title--container">
                  <IonText className="profile-collection--title">Title</IonText>
                  <div>
                    <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
                    20 followers
                  </div>
                </div>

                <div className="profile-collection--images">
                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />
                </div>

                <div>
                  <IonText className="profile-collection--desc">Description</IonText>
                </div>

                <div className="profile-collection-categories--container">
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                </div>
              </div>

              <div className="profile-collection--container ion-margin-vertical">
                <div className="profile-collection-title--container">
                  <IonText className="profile-collection--title">Title</IonText>
                  <div>
                    <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
                    20 followers
                  </div>
                </div>

                <div className="profile-collection--images">
                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />
                </div>

                <div>
                  <IonText className="profile-collection--desc">Description</IonText>
                </div>

                <div className="profile-collection-categories--container">
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                </div>
              </div>

              <div className="profile-collection--container ion-margin-vertical">
                <div className="profile-collection-title--container">
                  <IonText className="profile-collection--title">Title</IonText>
                  <div>
                    <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
                    20 followers
                  </div>
                </div>

                <div className="profile-collection--images">
                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />

                  <IonImg
                    className="profile-collection--image"
                    src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
                  />
                </div>

                <div>
                  <IonText className="profile-collection--desc">Description</IonText>
                </div>

                <div className="profile-collection-categories--container">
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                  <IonChip>
                    <IonLabel>Keyboard</IonLabel>
                  </IonChip>
                </div>
              </div>
            </IonList>
          </IonRow>
        </IonGrid>

        <Toast showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} color={toastColor} />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
