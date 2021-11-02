import { IonButton, IonGrid, IonSelect, IonSelectOption, IonToggle } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import useToastContext from "../../hooks/useToastContext";
import { getCategories } from "../../services/categories";
import { trackDiscoverFilterEvent, trackDiscoverTradableEvent } from "../../services/react-ga";
import { getDiscoverItems } from "../../services/search";
import ItemGrid from "../collection-items/ItemGrid";
import Text from "../text/Text";
import "./DiscoverItems.scss";
const LIMIT = 18;

const DiscoverItems = (props) => {
  const setToast = useToastContext();
  const location = useLocation();
  const history = useHistory();

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [viewTradable, setViewTradable] = useState(false);

  // useEffect(() => {
  //   if (location.state && location.state.category) {
  //     setSelectedCategory(location.state.category);
  //     history.replace({ ...history.location, state: {} });
  //   }
  // }, [history, location, selectedCategory]);

  const loadItems = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getDiscoverItems(nextPage * LIMIT, LIMIT, selectedCategory, viewTradable);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    }
  }, [hasMore, items, pages, selectedCategory, setToast, viewTradable]);

  const loadInitialItems = useCallback(async () => {
    const nextPage = 0;
    try {
      const retrievedItems = await getDiscoverItems(nextPage * LIMIT, LIMIT, selectedCategory, viewTradable);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems(retrievedItems);
      setPages(nextPage);
    } catch (e) {
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    }
  }, [selectedCategory, setToast, viewTradable]);

  const fetchNextPage = () => {
    loadItems();
  };

  useEffect(() => {
    const loadCategoryOptions = async () => {
      // setLoading(true);
      try {
        const options = await getCategories();
        setCategoryOptions(options);
      } catch (e) {
        console.log(e);
      } finally {
        // setLoading(false);
      }
    };

    loadCategoryOptions();
  }, []);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const changeCategory = (val) => {
    trackDiscoverFilterEvent();
    if (val === null) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(Number(val));
  }

  return (
    <>
      <div className="discover-filter-tradable--container ion-padding">
        <div className="discover-filter--container">
          <Text size="s">Filter by category</Text>

          <IonSelect
            value={selectedCategory}
            placeholder="Select category"
            onIonChange={(e) => changeCategory(e.detail.value)}
            interface="popover"
          >
            <IonSelectOption value={null}>All</IonSelectOption>

            {categoryOptions.map((opt, idx) => (
              <IonSelectOption key={idx} value={opt.categoryId}>
                {opt.name}
              </IonSelectOption>
            ))}
            {/* <IonButton>clear</IonButton> */}
          </IonSelect>
        </div>

        <div className="discover-tradable--container">
          <Text size="s">Tradable</Text>
          <IonToggle
            color="primary"
            checked={viewTradable}
            onIonChange={(e) => {
              trackDiscoverTradableEvent();
              setViewTradable(e.detail.checked);
            }}
          />
        </div>
      </div>

      {items.length === 0 && (
        <IonGrid className="ion-text-center ion-padding">
          <Text size="xl">No items found</Text>
        </IonGrid>
      )}

      <ItemGrid onScrollEnd={fetchNextPage} items={items} scrollEnded={!hasMore} discover={true} />
    </>
  );
};

export default DiscoverItems;
