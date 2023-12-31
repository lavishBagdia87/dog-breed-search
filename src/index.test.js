import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

describe("Root Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});