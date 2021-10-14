import { IonSearchbar } from "@ionic/react";

const SearchBar = (props) => {
  const { searchText, onChange: textChangeHandler } = props;

  return (
    <IonSearchbar
      value={searchText}
      onIonChange={(e) => textChangeHandler(e.detail.value)}
      onIonCancel={() => textChangeHandler("")}
      showCancelButton={true}
      enterkeyhint="search"
    />
  );
};

export default SearchBar;
