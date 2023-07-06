import React from "react";
import { render, screen } from "@testing-library/react";
import BreedRow from "./BreedRow";
import "@testing-library/jest-dom";
describe("BreedRow", () => {
test("renders breed information and image with loader", async () => {
  const breedData = {
    name: "Example Breed",
    breedGroup: "Example Group",
    lifeSpan: "10 - 12 years",
    height: "12 - 15 inches",
    temperament: "Friendly, Active",
    origin: "Example Origin",
    imageId: "123"
  };

  render(<BreedRow data={breedData} />);

  const nameElement = screen.getByText("Example Breed");
  const breedGroupElement = screen.getByText("Example Group");
  const lifeSpanElement = screen.getByText("10 - 12 years");
  const heightElement = screen.getByText("12 - 15 inches in");
  const temperamentElement = screen.getByText("Friendly, Active");
  const originElement = screen.getByText("Example Origin");

  expect(nameElement).toBeInTheDocument();
  expect(breedGroupElement).toBeInTheDocument();
  expect(lifeSpanElement).toBeInTheDocument();
  expect(heightElement).toBeInTheDocument();
  expect(temperamentElement).toBeInTheDocument();
  expect(originElement).toBeInTheDocument();
});
});