import React from "react";
import "@testing-library/jest-dom";
import { render, screen,fireEvent } from "@testing-library/react";
import ImageWithLoader from "./ImageWithLoader";

describe("ImageLoader", () => {
test("renders loading image initially", () => {
  render(<ImageWithLoader src="example.jpg" />);
  const loadingImage = screen.getByAltText("loading");
  expect(loadingImage).toBeInTheDocument();
});

test("should set loaded state to true on image load", () => {
  const src = "test-image.jpg";
  const { getByAltText } = render(<ImageWithLoader src={src} />);

  const loadingImage = getByAltText("loading");
  const breedImage = getByAltText("icon");

  expect(loadingImage).toBeInTheDocument();
  expect(breedImage).not.toBeVisible();

  fireEvent.load(breedImage);

  expect(loadingImage).not.toBeInTheDocument();
  expect(breedImage).toBeVisible();
});
})