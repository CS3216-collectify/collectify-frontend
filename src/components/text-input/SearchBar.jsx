import { IonSearchbar } from "@ionic/react";

const SEARCH_BAR_NAME = "discover-search-bar"

const SearchBar = (props) => {
  const {
    showCancel = false,
    onSubmit,
    onCancel: cancelHandler,
    onFocus: focusHandler,
  } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    const searchBar = e.target.children[SEARCH_BAR_NAME];
    const searchText = searchBar.value.trim();
    if (searchText) {
      onSubmit(searchText);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <IonSearchbar
        name={SEARCH_BAR_NAME}
        onIonFocus={focusHandler}
        onIonCancel={cancelHandler}
        showClearButton="always"
        showCancelButton={showCancel ? "always" : "never"}
        enterkeyhint="search"
      />
    </form>
  );
};

export default SearchBar;
