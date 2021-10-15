import { useState } from "react";
import SearchBox from "../../components/search/SearchBox";
import UserList from "../../components/user-list/UserList";

const ITEMS_MODE = 0;
const COLLECTIONS_MODE = 1;
const USERS_MODE = 2;

const SEARCH_MODES = [ITEMS_MODE, COLLECTIONS_MODE, USERS_MODE];

const itemsModeHandler = (text) => {
  console.log(text);
  return null;
};

const collectionsModeHandler = (text) => {
  console.log(text);
  return null;
};

const usersModeHandler = (text) => {
  console.log(text);
  return null;
};

const getComponentHandlerByMode = (mode) => {
  const handlers = {
    [USERS_MODE]: usersModeHandler,
    [ITEMS_MODE]: itemsModeHandler,
    [COLLECTIONS_MODE]: collectionsModeHandler,
  };
  return handlers[mode];
};

const getInitialComponents = () => {
  return {
    USERS_MODE: null,
    ITEMS_MODE: null,
    COLLECTIONS_MODE: null,
  };
};

const Search = (props) => {
  const [mode, setMode] = useState(ITEMS_MODE);
  const [resultComponents, setResultComponents] = useState(getInitialComponents());
  const [submittedSearchText, setSubmittedSearchText] = useState("");

  const componentUpdateHelper = (mode, text) => {
    const handler = getComponentHandlerByMode(mode);
    const component = handler(text);
    const updatedResultComponents = {...resultComponents, [mode]: component};
    setResultComponents(updatedResultComponents);
  }

  const submitHandler = (text) => {
    // handle search
    console.log(mode);
    setSubmittedSearchText(text);
    componentUpdateHelper(mode, text);
  };

  const modeChangeHandler = (newMode) => {
    if (newMode < 0 || newMode > 2 || newMode === mode) {
      return;
    } 
    // can be further optimized? (e.g. caching props?)
    setMode(newMode);
    componentUpdateHelper(newMode, submittedSearchText);
  };

  // how search result should be displayed
  const resultComponent = resultComponents[mode]; // or loading component when loading

  return (
    <>
      <SearchBox onSubmit={submitHandler} resultComponent={resultComponent} />
    </>
  );
};

export default Search;
