import { searchBreeds } from "../api";
import constants from "../constants";
import Breed from "../model/breed";

export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

export const searchRequest = () => ({
  type: SEARCH_REQUEST
});

export const success = (results) => ({
  type: SEARCH_SUCCESS,
  payload: results
});

export const searchFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: error
});

export const performSearch = (query) => {
  return async (dispatch) => {
    dispatch(searchRequest());
    try {
      const results = await searchBreeds(query);
      dispatch(
        sorting(
          results.map((result) => new Breed(result)),
          constants.NAME,
          constants.ASCENDING
        )
      );
    } catch (error) {
      dispatch(searchFailure(error.message));
    }
  };
};

export const sorting = (breeds, attribute, order) => {
  return async (dispatch) => {
    dispatch(
      success([
        ...breeds.sort((a, b) => {
          if (order === constants.ASCENDING) {
            if (a[attribute] < b[attribute]) {
              return -1;
            }
            if (a[attribute] > b[attribute]) {
              return 1;
            }
            return 0;
          } else if (order === constants.DESCENDING) {
            if (a[attribute] < b[attribute]) {
              return 1;
            }
            if (a[attribute] > b[attribute]) {
              return -1;
            }
            return 0;
          }
          return 0;
        })
      ])
    );
  };
};
