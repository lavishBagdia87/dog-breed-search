import { applyMiddleware} from "redux";
import thunk from "redux-thunk";
import searchReducer from "./reducers/searchReducer";
import store from "./store";

describe("Redux Store", () => {
  test("is created with the correct reducer and middleware", () => {
    const middleware = [thunk];

    const testStore = store;

    // Check if the middleware is correctly applied
    const middlewareResult = testStore.dispatch({ type: "TEST_ACTION" });

    // Assert that the middleware function is executed and returns a Object
    expect(typeof middlewareResult).toBe("object");

    // Check if the reducer is correctly set
    const initialState = testStore.getState();
    expect(initialState).toEqual(searchReducer(undefined, {}));

    // Check if the store is created with the middleware and reducer
    expect(testStore).toBeDefined();
  });
});