import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import useToastContext from "../../hooks/useToastContext";
import { searchCollections } from "../../services/search";
import CollectionList from "../profile-collection/CollectionList";

const LIMIT = 8;

const CollectionSearchResultDisplay = (props) => {
  const { searchText } = props;
  const setToast = useToastContext();
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
      setToast({ message: "Unable to load search results. Please try again later.", color: "danger" });
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
      setToast({ message: "Unable to load search results. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [searchText])

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [loadInitialPage, props.searchText]);

  return (
    <>
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
