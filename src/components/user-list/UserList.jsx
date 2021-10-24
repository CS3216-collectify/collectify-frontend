import {
  IonGrid,
  IonList,
  IonCol
} from "@ionic/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import Text from "../text/Text";
import UserCard from "./UserCard";

const LIMIT = 10;

const UserList = (props) => {
  const { onScrollEnd: fetchNextPage, users = [], listEnded, emptyMessage = "No users found!" } = props;

  if (listEnded && users && users.length === 0 && emptyMessage) {
    return (
      <IonGrid className="ion-text-center ion-padding">
        <Text size="xl" >
          {emptyMessage}
        </Text>
      </IonGrid>
    )
  }

  return (
    <IonList>
      {/* <IonListHeader>Followers/Likes</IonListHeader> */}
      {users.map(({ profilePictureUrl, pictureUrl = profilePictureUrl, username }, idx) => (
        <UserCard key={idx} pictureUrl={pictureUrl} username={username} />
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </IonList>
  );
};

export default UserList;
