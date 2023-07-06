import React from "react";
import { useSelector } from "react-redux";
import { render, waitFor,screen } from "@testing-library/react";
import BreedData from "./BreedData";
import BreedRow from "../BreedRow/BreedRow";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../BreedRow/BreedRow", () => jest.fn());

describe("BreedData", () => {
  beforeEach(() => {
    useSelector.mockClear();
    BreedRow.mockClear();
  });

  test("should render loading message when loading is true", () => {
    useSelector.mockReturnValueOnce([]);
    useSelector.mockReturnValueOnce(true); // Simulate loading state

    render(<BreedData />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render error message when error exists", async() => {
    useSelector.mockClear();
    useSelector.mockReturnValueOnce([]);
    useSelector.mockReturnValueOnce(false); // Simulate not loading state
    useSelector.mockReturnValueOnce("Error message"); // Simulate error state


    await waitFor(()=>{
     render(<BreedData />);
    }).then(()=>{
      expect(screen.getByText("Error message")).toBeInTheDocument();
    })

  });


  test("should render 'No Records found' message when not loading and breeds array is empty", async() => {
    useSelector.mockClear();
    useSelector.mockReturnValueOnce([]);
    useSelector.mockReturnValueOnce(false);
    useSelector.mockReturnValueOnce(null);

    await waitFor(()=>{
      render(<BreedData />);
    }).then(()=>{
      expect(screen.getByText("No Records Found.")).toBeInTheDocument()
    })
  });
});