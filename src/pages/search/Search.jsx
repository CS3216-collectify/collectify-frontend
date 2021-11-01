import { IonGrid, IonRow } from "@ionic/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import CollectionSearchResults from "../../components/search/CollectionSearchResults";
import ItemSearchResults from "../../components/search/ItemSearchResults";
import SearchBox from "../../components/search/SearchBox";
import UserSearchResults from "../../components/search/UserSearchResults";
import Toggle from "../../components/toggle/Toggle";
import "./Search.scss";

const ITEMS_MODE = 0;
const COLLECTIONS_MODE = 1;
const USERS_MODE = 2;

const SEARCH_MODES = [ITEMS_MODE, COLLECTIONS_MODE, USERS_MODE];
const SEARCH_MODE_TOGGLE_OPTIONS = [
  {
    value: ITEMS_MODE,
    label: "Items",
  },
  {
    value: COLLECTIONS_MODE,
    label: "Collections",
  },
  {
    value: USERS_MODE,
    label: "Users",
  },
];

const SearchResults = (props) => {
  const { mode, searchText } = props;

  if (!searchText) {
    return (
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-margin-top">Search for items, collections, or users!</IonRow>
      </IonGrid>
    );
  }

  return (
    <div className="ion-padding">
      {mode === USERS_MODE && <UserSearchResults searchText={searchText} />}
      {mode === COLLECTIONS_MODE && <CollectionSearchResults searchText={searchText} />}
      {mode === ITEMS_MODE && <ItemSearchResults searchText={searchText} />}
    </div>
  );
};

const Search = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { onFocus: focusHandler, onCancel, inactive } = props;
  const [mode, setMode] = useState(ITEMS_MODE);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (location.state && location.state.category) {
      onCancel();
    }
  }, [history, location, onCancel]);

  const searchHandler = (text) => {
    if (text === searchText) {
      return;
    }
    setSearchText(text);
  };

  const modeChangeHandler = (val) => {
    const newMode = parseInt(val);
    if (!SEARCH_MODES.includes(newMode) || mode === newMode) {
      return;
    }
    setMode(newMode);
    if (!inactive) document.getElementById("search-toggle").scrollIntoView({ behavior: "smooth" });
  };

  const initializeSearchState = () => {
    setSearchText("");
    setMode(ITEMS_MODE);
  };

  const cancelHandler = () => {
    initializeSearchState();
    onCancel();
  };

  return (
    <>
      {!inactive ? (
        <>
          <SearchBox onSubmit={searchHandler} onCancel={cancelHandler} onFocus={focusHandler} showCancel={!inactive}></SearchBox>
          <div id="search-toggle">
            <Toggle value={mode} options={SEARCH_MODE_TOGGLE_OPTIONS} onChange={modeChangeHandler} />
          </div>

          {searchText && <IonRow className="ion-justify-content-center ion-margin-top">Showing results for "{searchText}"</IonRow>}
          <SearchResults mode={mode} searchText={searchText} />
        </>
      ) : (
        <>
          <SearchBox onSubmit={searchHandler} onCancel={cancelHandler} onFocus={focusHandler} showCancel={!inactive}></SearchBox>
        </>
      )}
    </>
  );
};

export default Search;
