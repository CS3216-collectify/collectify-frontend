import { useEffect, useState, useCallback } from "react";
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle } from "@ionic/react";

import "./DiscoverItems.scss";
import ItemGrid from "../collection-items/ItemGrid";
import { getDiscoverItems } from "../../services/search";
import { getCategories } from "../../services/categories";
import Text from "../text/Text";
import useToastContext from "../../hooks/useToastContext";

const LIMIT = 18;

const DiscoverItems = (props) => {
  const setToast = useToastContext();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [viewTradable, setViewTradable] = useState(false);

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

  return (
    <>
      <div className="discover-filter-tradable--container ion-padding">
        <div className="discover-filter--container">
          <Text size="s">Filter by category</Text>

          <IonSelect
            value={selectedCategory}
            placeholder="Select category"
            onIonChange={(e) => {
              setSelectedCategory(e.detail.value);
            }}
          >
            <IonSelectOption value={null}>All</IonSelectOption>

            {categoryOptions.map((opt, idx) => (
              <IonSelectOption key={idx} value={opt.id}>
                {opt.name}
              </IonSelectOption>
            ))}
            <IonButton>clear</IonButton>
          </IonSelect>
        </div>

        <div className="discover-tradable--container">
          <Text size="s">Tradable items only</Text>
          <IonToggle color="primary" checked={viewTradable} onIonChange={(e) => setViewTradable(e.detail.checked)} />
        </div>
      </div>

      <ItemGrid onScrollEnd={fetchNextPage} items={items} scrollEnded={!hasMore} />
    </>
  );
};

export default DiscoverItems;
