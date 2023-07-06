import React from "react";
import SearchInput from "./components/SearchInput/SearchInput";
import SortMenu from "./components/SortMenu/SortMenu";
import BreedData from "./components/BreedData/BreedData";
import { useDispatch } from "react-redux";
import { performSearch } from "./actions/searchActions";
import "./styles.css";

const App = () => {
  const dispatch = useDispatch();
  dispatch(performSearch(""));
  return (
    <div className="App">
      <div className="header-section">
        <SearchInput />
        <SortMenu />
      </div>
      <BreedData />
    </div>
  );
};

export default App;
