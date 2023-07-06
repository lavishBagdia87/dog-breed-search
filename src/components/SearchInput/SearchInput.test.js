import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import SearchInput from "./SearchInput";
import { performSearch } from "../../actions/searchActions";
import debounce from "lodash/debounce";
import '@testing-library/jest-dom';

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("lodash/debounce", () => jest.fn((fn) => fn));

jest.mock("../../actions/searchActions", () => ({
  performSearch: jest.fn(),
}));

describe("SearchInput", () => {
  const mockDispatch = jest.fn();
  const mockDebouncedSearch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    debounce.mockReturnValue(mockDebouncedSearch);
  });

  afterEach(() => {
    useDispatch.mockClear();
    debounce.mockClear();
    mockDispatch.mockClear();
    mockDebouncedSearch.mockClear();
    performSearch.mockClear();
  });

  test("renders the search input field", () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const inputField = getByPlaceholderText("Search...");
    expect(inputField).toBeInTheDocument();
  });

  test("dispatches search action on input change", async() => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const inputField = getByPlaceholderText("Search...");
    fireEvent.change(inputField, { target: { value: "dog" } });
    await waitFor(()=>{
    expect(mockDebouncedSearch).toHaveBeenCalledTimes(1);
    },{timeout:1200})

  });
});
