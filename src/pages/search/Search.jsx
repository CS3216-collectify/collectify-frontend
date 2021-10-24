import { useState } from "react";
import { IonGrid, IonRow } from "@ionic/react";

import CollectionSearchResults from "../../components/search/CollectionSearchResults";
import ItemSearchResults from "../../components/search/ItemSearchResults";
import SearchBox from "../../components/search/SearchBox";
import UserSearchResults from "../../components/search/UserSearchResults";
import Toggle from "../../components/toggle/Toggle";
import Text from "../../components/text/Text";
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
  const { onFocus: focusHandler, onCancel, inactive } = props;
  const [mode, setMode] = useState(ITEMS_MODE);
  const [searchText, setSearchText] = useState("");

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
      <SearchBox onSubmit={searchHandler} onCancel={cancelHandler} onFocus={focusHandler} showCancel={!inactive}>
        {!inactive && (
          <>
            <Toggle value={mode} options={SEARCH_MODE_TOGGLE_OPTIONS} onChange={modeChangeHandler} />
            {searchText && <IonRow className="ion-justify-content-center ion-margin-top">Showing results for "{searchText}"</IonRow>}
            <SearchResults mode={mode} searchText={searchText} />
          </>
        )}
      </SearchBox>
    </>
  );
};

export default Search;
