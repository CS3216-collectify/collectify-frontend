import { IonSearchbar } from "@ionic/react";

const SearchBar = (props) => {
  const { value, onChange, onSubmit } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit();
  }

  const changeHandler = (e) => {
    onChange(e.detail.value);
  }

  const clearHandler = (e) => {
    onChange("");
  }

  return (
    <form onSubmit={submitHandler}>
      <IonSearchbar
        value={value}
        onIonChange={changeHandler}
        onIonCancel={clearHandler}
        showCancelButton={true}
        enterkeyhint="search"
      />
    </form>
  );
};

export default SearchBar;
