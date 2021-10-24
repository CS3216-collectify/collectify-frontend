import { IonGrid } from "@ionic/react";
import SearchBar from "../text-input/SearchBar";

const SearchBox = (props) => {
  const {
    children,
    onSubmit: submitHandler,
    onCancel: cancelHandler,
    onFocus: focusHandler,
    showCancel,
  } = props;

  return (
    <>
      <SearchBar
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        onFocus={focusHandler}
        showCancel={showCancel}
      />
      {children}
    </>
  );
};

export default SearchBox;
