// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import {
//   SEARCH_REQUEST,
//   SEARCH_SUCCESS,
//   SEARCH_FAILURE,
//   searchRequest,
//   success,
//   searchFailure,
//   performSearch,
//   sorting
// } from './searchActions';

// // Mock the API module
// jest.mock('../api', () => ({
//   searchBreeds: jest.fn()
// }));

// // Create a mock store
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('Redux Actions', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({});
//   });

//   describe('searchRequest', () => {
//     test('should create an action to indicate a search request', () => {
//       const expectedAction = {
//         type: SEARCH_REQUEST
//       };
//       expect(searchRequest()).toEqual(expectedAction);
//     });
//   });

//   describe('success', () => {
//     test('should create an action with search results', () => {
//       const results = [{ name: 'Breed 1' }, { name: 'Breed 2' }];
//       const expectedAction = {
//         type: SEARCH_SUCCESS,
//         payload: results
//       };
//       expect(success(results)).toEqual(expectedAction);
//     });
//   });

//   describe('searchFailure', () => {
//     test('should create an action with the error message', () => {
//       const error = 'Search failed';
//       const expectedAction = {
//         type: SEARCH_FAILURE,
//         payload: error
//       };
//       expect(searchFailure(error)).toEqual(expectedAction);
//     });
//   });

//   describe('performSearch', () => {
//     test('should dispatch the searchRequest action and perform a search', async () => {
//       const query = 'Breed';
//       const results = [{ name: 'Breed 1' }, { name: 'Breed 2' }];
//       const expectedActions = [
//         { type: SEARCH_REQUEST },
//         { type: SEARCH_SUCCESS, payload: results }
//       ];
//       const { performSearch } = require('./searchActions');

//       // Mock the searchBreeds function
//       const { searchBreeds } = require('../api');
//       searchBreeds.mockResolvedValue(results);

//       await store.dispatch(performSearch(query));
//       expect(store.getActions()).toEqual(expectedActions);
//       expect(searchBreeds).toHaveBeenCalledWith(query);
//     });

//     test('should dispatch the searchRequest action and handle search failure', async () => {
//       const query = 'Breed';
//       const error = 'Search failed';
//       const expectedActions = [
//         { type: SEARCH_REQUEST },
//         { type: SEARCH_FAILURE, payload: error }
//       ];
//       const { performSearch } = require('./searchActions');

//       // Mock the searchBreeds function to throw an error
//       const { searchBreeds } = require('../api');
//       searchBreeds.mockRejectedValue(new Error(error));

//       await store.dispatch(performSearch(query));
//       expect(store.getActions()).toEqual(expectedActions);
//       expect(searchBreeds).toHaveBeenCalledWith(query);
//     });
//   });

//   describe('sorting', () => {
//     test('should dispatch the success action with sorted breeds in ascending order', async () => {
//       const breeds = [{ name: 'Breed 2' }, { name: 'Breed 1' }];
//       const attribute = 'name';
//       const order = 'Ascending';
//       const expectedActions = [
//         {
//           type: SEARCH_SUCCESS,
//           payload: [{ name: 'Breed 1' }, { name: 'Breed 2' }]
//         }
//       ];
//       const { sorting } = require('./searchActions');

//       await store.dispatch(sorting(breeds, attribute, order));
//       expect(store.getActions()).toEqual(expectedActions);
//     });

//     test('should dispatch the success action with sorted breeds in descending order', async () => {
//       const breeds = [{ name: 'Breed 1' }, { name: 'Zreed 2' }];
//       const attribute = 'name';
//       const order = 'descending';
//       const expectedActions = [
//         {
//           type: SEARCH_SUCCESS,
//           payload: [{ name: 'Zreed 2' }, { name: 'Breed 1' }]
//         }
//       ];
//       const { sorting } = require('./searchActions');

//       await store.dispatch(sorting(breeds, attribute, order));
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  searchRequest,
  success,
  searchFailure,
  performSearch,
  sorting,
} from "./searchActions";
import { searchBreeds } from "../api";
import constants from "../constants";
import Breed from "../model/breed";
import '@testing-library/jest-dom';

jest.mock("../api", () => ({
  searchBreeds: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);

describe("searchActions", () => {
  it("creates searchRequest action", () => {
    const expectedAction = { type: SEARCH_REQUEST };
    expect(searchRequest()).toEqual(expectedAction);
  });

  it("creates success action", () => {
    const results = [new Breed({ name: "Breed 1" }), new Breed({ name: "Breed 2" })];
    const expectedAction = { type: SEARCH_SUCCESS, payload: results };
    expect(success(results)).toEqual(expectedAction);
  });

  it("creates searchFailure action", () => {
    const error = "Search failed";
    const expectedAction = { type: SEARCH_FAILURE, payload: error };
    expect(searchFailure(error)).toEqual(expectedAction);
  });

  describe("performSearch", () => {
    const query = "dog";
    const results = [{ name: "Breed 1" }, { name: "Breed 2" }];

    it("dispatches searchRequest and sorting actions on successful search", async () => {
      searchBreeds.mockResolvedValue(results);
      const expectedActions = [
        { type: SEARCH_REQUEST },
        {
          type: SEARCH_SUCCESS,
          payload: results.map((result) => new Breed(result)),
        },
      ];

      const store = mockStore({});
      await store.dispatch(performSearch(query));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches searchRequest and searchFailure actions on failed search", async () => {
      const error = new Error("Search failed");
      searchBreeds.mockRejectedValue(error);
      const expectedActions = [
        { type: SEARCH_REQUEST },
        { type: SEARCH_FAILURE, payload: error.message },
      ];

      const store = mockStore({});
      await store.dispatch(performSearch(query));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("sorting", () => {
    const breeds = [
      new Breed({ name: "Breed 2", height: 20 }),
      new Breed({ name: "Breed 1", height: 10 }),
    ];

    it("dispatches success action with sorted breeds in ascending order", async () => {
      const expectedActions = [
        {
          type: SEARCH_SUCCESS,
          payload: [
            new Breed({ name: "Breed 1", height: 10 }),
            new Breed({ name: "Breed 2", height: 20 }),
          ],
        },
      ];

      const store = mockStore({});
      await store.dispatch(sorting(breeds, constants.NAME, constants.ASCENDING));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches success action with sorted breeds in descending order", async () => {
      const expectedActions = [
        {
          type: SEARCH_SUCCESS,
          payload: [
            new Breed({ name: "Breed 2", height: 20 }),
            new Breed({ name: "Breed 1", height: 10 }),
          ],
        },
      ];

      const store = mockStore({});
      await store.dispatch(sorting(breeds, constants.NAME, constants.DESCENDING));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});