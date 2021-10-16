import {
  IonList,
} from "@ionic/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import UserCard from "./UserCard";

const LIMIT = 10;

const UserList = (props) => {
  const { onScrollEnd: fetchNextPage, users = [], listEnded } = props;

  return (
    <IonList>
      {/* <IonListHeader>Followers/Likes</IonListHeader> */}
      {users.map(({ profilePhotoUrl, username }, idx) => (
        <UserCard key={idx} profilePhotoUrl={profilePhotoUrl} username={username} />
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </IonList>
  );
};

export default UserList;
