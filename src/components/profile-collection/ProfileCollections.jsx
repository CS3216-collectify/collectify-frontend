import { IonGrid, IonRow } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCollections } from "../../services/collections";
import CollectionList from "./CollectionList";

const LIMIT = 10;

const ProfileCollections = (props) => {
  const location = useLocation();
  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  console.log(pages);
  // username = someone elses, userId = my own
  const { profileUserId } = props;
  // should check whether its guest clicking profile tab, or user clicking their own tab, or user viewing others' profile
  const loadUserCollections = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore || !profileUserId) {
        return;
      }
      const retrievedCollections = await getCollections(null, profileUserId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedCollections && retrievedCollections.length >= LIMIT;
      setHasMore(updatedHasMore);
      setCollections([...collections, ...retrievedCollections]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [collections, hasMore, pages, profileUserId]);

  const loadInitialCollections = useCallback(async () => {
    if (!profileUserId) {
      return;
    }
    const nextPage = 0;
    try {
      const retrievedCollections = await getCollections(null, profileUserId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedCollections && retrievedCollections.length >= LIMIT;
      setHasMore(updatedHasMore);
      setCollections(retrievedCollections);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [profileUserId]);

  useEffect(() => {
    loadInitialCollections();
  }, [props.profileUserId, location, loadInitialCollections]);

  const fetchNextPage = () => {
    console.log("load next");
    loadUserCollections();
  };

  return (
    <IonGrid>
      <CollectionList 
        onScrollEnd={fetchNextPage} 
        listEnded={!hasMore} 
        collections={collections} 
        emptyMessage="Start adding new collections!"
      />
    </IonGrid>
  );
};

export default ProfileCollections;
