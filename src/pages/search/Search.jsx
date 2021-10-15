import { useState } from "react";
import CollectionSearchResults from "../../components/search/CollectionSearchResults";
import ItemSearchResults from "../../components/search/ItemSearchResults";
import SearchBox from "../../components/search/SearchBox";
import UserSearchResults from "../../components/search/UserSearchResults";

const ITEMS_MODE = 0;
const COLLECTIONS_MODE = 1;
const USERS_MODE = 2;

const SEARCH_MODES = [ITEMS_MODE, COLLECTIONS_MODE, USERS_MODE];

const SearchResults = (props) => {
  const { mode, searchText } = props;
  return (
    <>
      {mode === USERS_MODE &&
        <UserSearchResults searchText={searchText} />
      }
      {mode === COLLECTIONS_MODE &&
        <CollectionSearchResults searchText={searchText} />
      }
      {mode === ITEMS_MODE &&
        <ItemSearchResults searchText={searchText} />
      }
    </>
  )
}

const Search = (props) => {
  const [mode, setMode] = useState(USERS_MODE);
  const [searchText, setSearchText] = useState("");

  const searchHandler = (text) => {
    setSearchText(text);
  };

  const modeChangeHandler = (newMode) => {
    if (!SEARCH_MODES.includes(newMode) || mode === newMode) {
      return;
    }
    setMode(newMode);
  };

  return (
    <>
      <SearchBox onSubmit={searchHandler}>
        <SearchResults mode={mode} searchText={searchText} />
      </SearchBox>
    </>
  );
};

export default Search;
