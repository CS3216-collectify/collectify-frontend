import { IonButton, IonIcon, IonRow } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import useToastContext from "../../hooks/useToastContext";
import { getCollections } from "../../services/collections";
import SelectCollectionList from "./SelectCollectionList";
import "./SelectCollections.scss";

const LIMIT = 6;

const SelectCollections = (props) => {
  const history = useHistory();
  const location = useLocation();
  const setToast = useToastContext();
  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

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
      setToast({ message: "Unable to load collections. Please try again later.", color: "danger" });
    }
  }, [collections, hasMore, pages, profileUserId, setToast]);

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
      setToast({ message: "Unable to load collections. Please try again later.", color: "danger" });
    }
  }, [profileUserId, setToast]);

  useEffect(() => {
    if (location.pathname === "/add") {
      loadInitialCollections();
    }
  }, [props.profileUserId, location, loadInitialCollections]);

  const fetchNextPage = () => {
    loadUserCollections();
  };

  return (
    <>
      <IonRow>
        <IonButton
          className="add-new-collection-button"
          fill="outline"
          onClick={() => history.push({ pathname: "/add-collections", state: { redirectToAdd: true } })}
        >
          <IonIcon className="add-icon" icon={addOutline} />
          New Collection
        </IonButton>
      </IonRow>
      <SelectCollectionList onScrollEnd={fetchNextPage} listEnded={!hasMore} collections={collections} emptyMessage="Start adding new collections!" />
    </>
  );
};

export default SelectCollections;
