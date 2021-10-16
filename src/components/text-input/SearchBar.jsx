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

  return (
    <form onSubmit={submitHandler}>
      <IonSearchbar
        value={value}
        onIonChange={changeHandler}
        showCancelButton={true}
        enterkeyhint="search"
        // onIonCancel
        // onIonFocus
        // onIonBlur
      />
    </form>
  );
};

export default SearchBar;
