import { useState } from "react";
import SearchBar from "../text-input/SearchBar";

const Search = (props) => {
  const { onScrollEnd: nextPageHandler } = props;
  const [searchText, setSearchText] = useState("");

  const submitHandler = () => {
    console.log(searchText);
    setSearchText("");
  }

  return (
    <SearchBar value={searchText} onChange={setSearchText} onSubmit={submitHandler} />
  )
}

export default Search;
