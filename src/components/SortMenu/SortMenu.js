import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sorting } from "../../actions/searchActions";
import constants from "../../constants";
import "./SortMenu.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import sortingIcon from "../../assets/images/sort.svg";
import sortIngAscending from "../../assets/images/sort-ascending.svg";
import sortIngdescending from "../../assets/images/sort-descending.svg";


const SortMenu = (props) => {
  const dispatch = useDispatch();

  const options = [
    {
      label: constants.HEIGHT_LOW_TO_HIGH,
      value: constants.HEIGHT_ASC,
      image: sortIngAscending
    },
    {
      label: constants.HEIGHT_HIGH_TO_LOW,
      value: constants.HEIGHT_DES,
      image: sortIngdescending
    },
    {
      label: constants.NAME_A_TO_Z,
      value: constants.NAME_ASC,
      image: sortIngAscending
    },
    {
      label: constants.NAME_Z_TO_A,
      value: constants.NAME_DES,
      image: sortIngdescending
    },
    {
      label: constants.LIFESPAN_HIGH_TO_LOW,
      value: constants.LIFESPAN,
      image: sortIngdescending
    }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSortOption, SetselectedSortOption] = useState("Name A to Z");
  const [open, setOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const breeds = useSelector((state) => state.breeds);

  const handleMenuItemClick = (index) => {
    SetselectedSortOption(options[index].label);
    sort(options[index].value);
    setOpen(!open);
    setAnchorEl(null);
  };
  const handleClose = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);

  };

  const sort = (sortBy) => {
    switch (sortBy) {
      case constants.HEIGHT_ASC: {
        dispatch(sorting(breeds, constants.MAX_HEIGHT, constants.ASCENDING));
        break;
      }
      case constants.HEIGHT_DES: {
        dispatch(sorting(breeds, constants.MAX_HEIGHT, constants.DESCENDING));
        break;
      }
      case constants.NAME_ASC: {
        dispatch(sorting(breeds, constants.NAME, constants.ASCENDING));
        break;
      }
      case constants.NAME_DES: {
        dispatch(sorting(breeds, constants.NAME, constants.DESCENDING));
        break;
      }
      case constants.LIFESPAN: {
        dispatch(sorting(breeds, constants.NAME, constants.DESCENDING));
        break;
      }
      default: {
        break;
      }
    }
  };
  const resetSorting = (reload) => {
    if (reload && selectedSortOption !== constants.NAME_A_TO_Z) {
      SetselectedSortOption(constants.NAME_A_TO_Z);
    }
  };
  return (
    <>
      {loading && resetSorting(loading)}
      <div className="sort-button-container">
        <div

          aria-controls={open ? "sort-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}

        >
          <img  data-testid="sort-button" id="sort-button" onClick={handleClose} className="sort-button" src={sortingIcon} alt="Sort Button" />
        </div>
        <span className="selected-sort">{selectedSortOption}</span>
      </div>
      <Menu
        id="sort-menu"
        className="menu-container"
        aria-labelledby="sort-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(index)}
          >
            <img className="menu-icon" src={option.image} alt="React Logo" />
            <div className="menu-text"> {option.label}</div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default SortMenu;
