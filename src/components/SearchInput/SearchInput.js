import React, { useState } from "react";
import "./SeachInput.css";
import { useDispatch } from "react-redux";
import { performSearch } from "../../actions/searchActions";
import debounce from "lodash/debounce";
import searchIcon from "../../assets/images/search-icon.svg";
const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = debounce((query) => {
    dispatch(performSearch(query));
  }, 1000);
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };
  return (
    <div className="search-input-container">
      <img src={searchIcon} className="search-icon" alt="React Logo" />
      <input
        type="text"
        className="input-field"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
