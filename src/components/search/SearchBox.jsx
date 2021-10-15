import { IonContent } from "@ionic/react";
import { useState } from "react";
import SearchBar from "../text-input/SearchBar";

const SearchBox = (props) => {
  const {
    resultComponent,
    onSubmit,
  } = props;
  const [prevSearch, setPrevSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const submitHandler = () => {
    if (searchText && searchText !== prevSearch) {
      setPrevSearch(searchText);
      onSubmit(searchText);
    }
  };

  return (
    <>
      <SearchBar
        value={searchText}
        onChange={setSearchText}
        onSubmit={submitHandler}
      />
      <IonContent>
        {resultComponent}
      </IonContent>
    </>
  );
};

export default SearchBox;
