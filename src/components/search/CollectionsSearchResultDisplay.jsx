import { useEffect, useState } from "react"
import { searchCollections } from "../../services/search";
import CollectionList from "../profile-collection/CollectionList";

const LIMIT = 10;

const CollectionSearchResultDisplay = (props) => {
  const { searchText } = props;
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [collections, setCollections] = useState([]);

  const loadNextPage = async () => {
    if (!hasMore || !searchText) {
      console.log("reached");
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedCollections = await searchCollections(searchText, nextPage * LIMIT, LIMIT);
      const updatedCollections = [...collections, ...fetchedCollections] 
      const updatedHasMore = !(fetchedCollections && fetchedCollections.length < LIMIT) || !fetchedCollections;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setCollections(updatedCollections);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  };

  const loadInitialPage = async () => {
    try {
      console.log(searchText);
      const nextPage = 0;
      const fetchedCollections = await searchCollections(searchText, nextPage * LIMIT, LIMIT);
      const updatedHasMore = !(fetchedCollections && fetchedCollections.length < LIMIT) || !fetchedCollections;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setCollections(fetchedCollections);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  };

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [props.searchText]);

  return (
    <CollectionList 
      scrollEnded={!hasMore} 
      onScrollEnd={loadNextPage} 
      collections={collections} 
    />
  )
}

export default CollectionSearchResultDisplay;
