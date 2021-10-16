import { IonCol, IonContent, IonGrid, IonIcon, IonLoading, IonRow } from "@ionic/react";
import { useState } from "react";
import SearchBar from "../text-input/SearchBar";

const SearchBox = (props) => {
  const {
    children,
    onSubmit,
    onCancel: cancelHandler,
    onFocus: focusHandler,
    showCancel,
  } = props;
  const [searchText, setSearchText] = useState("");

  const submitHandler = () => {
    if (searchText) {
      onSubmit(searchText);
    }
  };

  const changeHandler = (text) => {
    setSearchText(text);
  }

  return (
    <IonGrid>
      <SearchBar
        value={searchText}
        onChange={changeHandler}
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        onFocus={focusHandler}
        showCancel={showCancel}
      />
      {children}
    </IonGrid>
  );
};

export default SearchBox;
