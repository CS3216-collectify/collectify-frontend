import { IonSearchbar } from "@ionic/react";

const SearchBar = (props) => {
  const {
    showCancel = false,
    onSubmit,
    onCancel: cancelHandler,
    onFocus: focusHandler,
  } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    const searchText = document.getElementById("my-search-bar").value.trim();
    console.log("search bar value is:", searchText);
    if (searchText) {
      onSubmit(searchText);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <IonSearchbar
        id="my-search-bar"
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
