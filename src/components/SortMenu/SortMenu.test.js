import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import SortMenu from "./SortMenu";
import { sorting } from "../../actions/searchActions";
import constants from "../../constants";
import '@testing-library/jest-dom';

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../actions/searchActions", () => ({
  sorting: jest.fn(),
}));

describe("SortMenu", () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    mockDispatch.mockClear();
    sorting.mockClear();
  });

  const mockState = {
    loading: false,
    breeds: [],
  };

  test("renders the sort button", () => {
    const { getByTestId } = render(<SortMenu />);
    const sortButton = getByTestId("sort-button");
    expect(sortButton).toBeInTheDocument();
  });

  test("opens the menu on sort button click", () => {
    const { getByTestId, getByRole } = render(<SortMenu />);
    const sortButton = getByTestId("sort-button");
    fireEvent.click(sortButton);
    const menu = getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  test("calls the sorting action on menu item click", () => {
    const { getByTestId, getByText } = render(<SortMenu />);
    const sortButton = getByTestId("sort-button");
    fireEvent.click(sortButton);
    const menuItem = getByText(constants.HEIGHT_LOW_TO_HIGH);
    fireEvent.click(menuItem);
    expect(sorting).toHaveBeenCalledWith(
      mockState.breeds,
      constants.MAX_HEIGHT,
      constants.ASCENDING
    );
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test("displays the selected sort option", () => {
    const { getByText } = render(<SortMenu />);
    const selectedSortOption = getByText(constants.NAME_A_TO_Z);
    expect(selectedSortOption).toBeInTheDocument();
  });

  test("closes the menu after selecting an option", () => {
    const { getByTestId, getByText, queryByRole } = render(<SortMenu />);
    const sortButton =getByTestId("sort-button");
    fireEvent.click(sortButton);
    const menuItem = getByText(constants.HEIGHT_LOW_TO_HIGH);
    fireEvent.click(menuItem);
    const menu = queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

});