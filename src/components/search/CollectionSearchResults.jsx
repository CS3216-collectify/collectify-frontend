import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import { searchCollections } from "../../services/search";
import CollectionList from "../profile-collection/CollectionList";

const LIMIT = 10;

const CollectionSearchResultDisplay = (props) => {
  const { searchText } = props;
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNextPage = useCallback(async () => {
    if (!hasMore || !searchText) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedCollections = await searchCollections(searchText, nextPage * LIMIT, LIMIT);
      const updatedCollections = [...collections, ...fetchedCollections] 
      const updatedHasMore = fetchedCollections && fetchedCollections.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setCollections(updatedCollections);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [searchText, hasMore, pages, collections]);

  const loadInitialPage = useCallback(async () => {
    if (!searchText) {
      return;
    }
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedCollections = await searchCollections(searchText, nextPage * LIMIT, LIMIT);
      const updatedHasMore = fetchedCollections && fetchedCollections.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setCollections(fetchedCollections);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [searchText])

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [props.searchText]);

  return (
    <>
      <IonLoading isOpen={loading} />
      <CollectionList 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        collections={collections} 
        emptyMessage="No matching collections found. Try other keywords!"
      />
    </>
  )
}

export default CollectionSearchResultDisplay;
