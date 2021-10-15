import { useState } from "react";
import SearchBox from "../../components/search/SearchBox";
import UserSearchResultDisplay from "../../components/search/UserSearchResultDisplay";

const ITEMS_MODE = 0;
const COLLECTIONS_MODE = 1;
const USERS_MODE = 2;

const SEARCH_MODES = [ITEMS_MODE, COLLECTIONS_MODE, USERS_MODE];

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
        {mode === USERS_MODE &&
          <UserSearchResultDisplay searchText={searchText} />
        }
        {mode === COLLECTIONS_MODE &&
          null // TODO: collections React component
        }
        {mode === ITEMS_MODE &&
          null // TODO: items React component
        }
      </SearchBox>
    </>
  );
};

export default Search;
