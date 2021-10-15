import { IonLoading } from "@ionic/react";
import { useState } from "react";
import SearchBox from "../../components/search/SearchBox";
import UserList from "../../components/user-list/UserList";
import { searchUsers } from "../../services/search";

const ITEMS_MODE = 0;
const COLLECTIONS_MODE = 1;
const USERS_MODE = 2;

const SEARCH_MODES = [ITEMS_MODE, COLLECTIONS_MODE, USERS_MODE];

const getDefaultResultProps = () => {
  return {
    [ITEMS_MODE]: {
      pages: -1,
      hasMore: true,
      limit: 18,
    },
    [USERS_MODE]: {
      pages: -1,
      hasMore: true,
      limit: 20,
    },
    [COLLECTIONS_MODE]: {
      pages: -1,
      hasMore: true,
      limit: 8,
    },
  };
}

const Search = (props) => {
  // const [mode, setMode] = useState(ITEMS_MODE);
  const [mode, setMode] = useState(USERS_MODE);
  const [resultComponents, setResultComponents] = useState({});
  const [submittedSearchText, setSubmittedSearchText] = useState("");
  const [resultProps, setResultProps] = useState(getDefaultResultProps());
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

  const usersComponentHandler = async (text) => {
    console.log(text);
    setLoading(true);
    const { pages, hasMore, limit } = resultProps[USERS_MODE];
    if (!hasMore) {
      return;
    }
    const nextPage = pages + 1;
    try {
      const users = await searchUsers(text, nextPage * limit, limit);
      console.log(users);
      const updatedHasMore = !(users && users.length < limit) || !users;
      setResultProps({
        ...resultProps, 
        [USERS_MODE]: {
          ...resultProps[USERS_MODE], 
          pages: nextPage, 
          hasMore: updatedHasMore
        }
      });
      return <UserList />;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

    return null;
  };
  
  const componentHandlers = {
    [USERS_MODE]: usersComponentHandler,
    [ITEMS_MODE]: itemsComponentHandler,
    [COLLECTIONS_MODE]: collectionsComponentHandler,
  };

  const searchHandler = async (mode, text) => {
    if (!componentHandlers.hasOwnProperty(mode)) {
      return;
    }
    const component = await componentHandlers[mode](text);
    let updatedResultComponents = {...resultComponents, [mode]: component};
    setResultComponents(updatedResultComponents);
  };

  const submitHandler = (text) => {
    if (text === submittedSearchText) {
      return;
    }
    // handle search
    console.log(mode);
    setSubmittedSearchText(text);
    searchHandler(mode, text);
  };

  const modeChangeHandler = (newMode) => {
    if (!SEARCH_MODES.includes(newMode) || mode === newMode) {
      return;
    }
    if (!resultComponents.hasOwnProperty(newMode)) {
      setResultComponents({});
      searchHandler(newMode, submittedSearchText);
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
