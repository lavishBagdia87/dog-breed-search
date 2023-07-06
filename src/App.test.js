import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);

describe("App", () => {
  test("should render the App component", () => {
    const initialState = { breeds: [], loading: false, error: null };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });
});
