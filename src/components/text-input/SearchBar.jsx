import { IonSearchbar } from "@ionic/react";

const SearchBar = (props) => {
  const {
    showCancel = false,
    value,
    onChange,
    onSubmit,
    onCancel: cancelHandler,
    onFocus: focusHandler,
  } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const changeHandler = (e) => {
    onChange(e.detail.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <IonSearchbar
        value={value}
        onIonChange={changeHandler}
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
