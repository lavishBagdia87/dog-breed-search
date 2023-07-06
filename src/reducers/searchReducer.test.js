import searchReducer from "./searchReducer";
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from "../actions/searchActions";

describe("searchReducer", () => {
  test("should handle SEARCH_REQUEST", () => {
    const initialState = {
      breeds: [],
      loading: false,
      error: null
    };

    const action = { type: SEARCH_REQUEST };

    const expectedState = {
      breeds: [],
      loading: true,
      error: null
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test("should handle SEARCH_SUCCESS", () => {
    const initialState = {
      breeds: [],
      loading: true,
      error: null
    };

    const breedsData = [{ name: "Breed1" }, { name: "Breed2" }];

    const action = { type: SEARCH_SUCCESS, payload: breedsData };

    const expectedState = {
      breeds: breedsData,
      loading: false,
      error: null
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test("should handle SEARCH_FAILURE", () => {
    const initialState = {
      breeds: [{ name: "Breed1" }, { name: "Breed2" }],
      loading: true,
      error: null
    };

    const error = "An error occurred.";

    const action = { type: SEARCH_FAILURE, payload: error };

    const expectedState = {
      breeds: [],
      loading: false,
      error: error
    };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test("should return current state for unknown action", () => {
    const initialState = {
      breeds: [{ name: "Breed1" }, { name: "Breed2" }],
      loading: false,
      error: null
    };

    const action = { type: "UNKNOWN_ACTION" };

    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
