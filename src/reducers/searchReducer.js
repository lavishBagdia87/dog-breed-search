import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from "../actions/searchActions";
const initialState = {
  breeds: [],
  loading: false,
  error: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        breeds: action.payload,
        loading: false,
        error: null
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        breeds: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
