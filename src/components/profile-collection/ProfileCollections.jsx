import { IonGrid, IonRow } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { getCollections } from "../../services/collections";
import CollectionList from "./CollectionList";

const LIMIT = 10;

const ProfileCollections = (props) => {
  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  console.log(pages);
  // username = someone elses, userId = my own
  const { profileUserId } = props;
  // should check whether its guest clicking profile tab, or user clicking their own tab, or user viewing others' profile
  const loadUserCollections = useCallback(async (userId) => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedCollections = await getCollections(null, userId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedCollections && retrievedCollections.length >= LIMIT;
      setHasMore(updatedHasMore);
      setCollections([...collections, ...retrievedCollections]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [collections, hasMore, pages, profileUserId]);

  useEffect(() => {
    const { profileUserId } = props;
    if (profileUserId) {
      loadUserCollections(profileUserId);
    }
  }, [props.profileUserId]);

  const fetchNextPage = () => {
    console.log("load next");
    loadUserCollections();
  };

  return (
    <IonGrid>
      <CollectionList onScrollEnd={fetchNextPage} listEnded={!hasMore} collections={collections} />
    </IonGrid>
  )
}

export default ProfileCollections;
