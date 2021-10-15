import { IonLoading } from "@ionic/react";
import { useState } from "react";
import SearchBox from "../../components/search/SearchBox";
import UserList from "../../components/user-list/UserList";

const ITEMS_MODE = 0;
const COLLECTIONS_MODE = 1;
const USERS_MODE = 2;

const SEARCH_MODES = [ITEMS_MODE, COLLECTIONS_MODE, USERS_MODE];

const Search = (props) => {
  const [mode, setMode] = useState(ITEMS_MODE);
  const [resultComponents, setResultComponents] = useState({});
  const [submittedSearchText, setSubmittedSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const itemsComponentHandler = (text) => {
    // TODO: fetch items
    // TODO: return component to render
    console.log(text);
    return null;
  };

  const collectionsComponentHandler = (text) => {
    // TODO: fetch collections
    // TODO: return component to render
    console.log(text);
    return null;
  };

  const usersComponentHandler = (text) => {
    // TODO: fetch users
    // TODO: return component to render
    console.log(text);
    return null;
  };
  
  const componentHandlers = {
    [USERS_MODE]: usersComponentHandler,
    [ITEMS_MODE]: itemsComponentHandler,
    [COLLECTIONS_MODE]: collectionsComponentHandler,
  };

  const searchHandler = (mode, text) => {
    if (!componentHandlers.hasOwnProperty(mode)) {
      return;
    }
    return componentHandlers[mode](text);
  };

  const submitHandler = (text) => {
    if (text === submittedSearchText) {
      return;
    }
    // handle search
    console.log(mode);
    setSubmittedSearchText(text);
    const component = searchHandler(mode, text);
    const updatedResultComponents = {[mode]: component};
    setResultComponents(updatedResultComponents);
  };

  const modeChangeHandler = (newMode) => {
    if (!SEARCH_MODES.includes(newMode) || mode === newMode) {
      return;
    }
    if (!resultComponents.hasOwnProperty(newMode)) {
      const component = searchHandler(newMode, submittedSearchText);
      const updatedResultComponents = {...resultComponents, [newMode]: component};
      setResultComponents(updatedResultComponents);
    }
    setMode(newMode);
  };

  // how search result should be displayed
  const resultComponent = loading ? <IonLoading isOpen={loading} /> : resultComponents[mode];

  return (
    <>
      <SearchBox onSubmit={submitHandler} resultComponent={resultComponent} />
    </>
  );
};

export default Search;
