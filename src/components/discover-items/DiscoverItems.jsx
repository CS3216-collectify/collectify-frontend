import { IonGrid, IonSelect, IonSelectOption, IonToggle } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import useToastContext from "../../hooks/useToastContext";
import { getFilterCategories } from "../../services/categories";
import { trackDiscoverTradableEvent } from "../../services/react-ga";
import { getDiscoverItems } from "../../services/search";
import ItemGrid from "../collection-items/ItemGrid";
import Text from "../text/Text";
import "./DiscoverItems.scss";
const LIMIT = 12;

const CATEGORY_COMPARATOR = (curr, compar) => {
  return curr && compar 
    ? curr.categoryId === compar.categoryId 
    : curr === compar;
}

const DiscoverItems = (props) => {
  const { catFilter: categoryFilter, setCatFilter: setCategoryFilter } = props;
  const setToast = useToastContext();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [viewTradable, setViewTradable] = useState(false);

  const loadItems = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getDiscoverItems(nextPage * LIMIT, LIMIT, categoryFilter, viewTradable);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    }
  }, [hasMore, items, pages, categoryFilter, setToast, viewTradable]);

  const loadInitialItems = useCallback(async () => {
    const nextPage = 0;
    try {
      const retrievedItems = await getDiscoverItems(nextPage * LIMIT, LIMIT, categoryFilter, viewTradable);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems(retrievedItems);
      setPages(nextPage);
    } catch (e) {
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    }
  }, [categoryFilter, setToast, viewTradable]);

  const fetchNextPage = () => {
    loadItems();
  };

  useEffect(() => {
    const loadCategoryOptions = async () => {
      // setLoading(true);
      try {
        const options = await getFilterCategories();
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
            // Ref: https://github.com/ionic-team/ionic-framework/issues/19324#issuecomment-711472305
            compareWith={CATEGORY_COMPARATOR}
            value={{ categoryId: categoryFilter }}
            placeholder="Select category"
            onIonChange={(e) => setCategoryFilter(e.detail.value.categoryId)}
            interface="popover"
          >
            <IonSelectOption value={{ categoryId: null }}>All</IonSelectOption>
            {categoryOptions.map((opt, idx) => (
              <IonSelectOption key={idx} value={opt} disabled={opt.isEmpty}>
                {opt.name}
              </IonSelectOption>
            ))}
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
