import { IonGrid, IonList } from "@ionic/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import Text from "../text/Text";
import UserCard from "./UserCard";

const UserList = (props) => {
  const { onScrollEnd: fetchNextPage, users = [], listEnded, emptyMessage = "No users found!" } = props;

  if (listEnded && users && users.length === 0 && emptyMessage) {
    return (
      <IonGrid className="ion-text-center ion-padding">
        <Text size="xl">{emptyMessage}</Text>
      </IonGrid>
    );
  }

  return (
    <IonList>
      <IonGrid fixed>
        {users.map(({ profilePictureUrl, pictureUrl = profilePictureUrl, username }, idx) => (
          <UserCard key={idx} pictureUrl={pictureUrl} username={username} />
        ))}
        <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
      </IonGrid>
    </IonList>
  );
};

export default UserList;
