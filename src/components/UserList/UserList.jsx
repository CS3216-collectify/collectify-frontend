import { IonContent, IonImg, IonItem, IonLabel, IonList, IonThumbnail } from "@ionic/react";
import { useEffect } from "react";
import { useState } from "react";
import { getFollowersByCollectionId } from "../../services/followers";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  // TODO: Remove this useEffect, for testing only
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const retrievedUsers = await getFollowersByCollectionId(1, 1, 1);
        setUsers([...users, ...retrievedUsers]);
      } catch (e) {
        console.log(e);
      }
    };
    loadUsers();
  }, []);

  // TODO: Use IonInfiniteScroll
  return (
    <IonContent>
      <IonList>
        {users.map((userData) => (
          <IonItem key={userData.userId}>
            <IonThumbnail>
              <IonImg src={userData.profilePhotoUrl} />
            </IonThumbnail>
            <IonLabel>@{userData.username}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default UserList;
