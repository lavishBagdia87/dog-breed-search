import Breed from "./breed"
import '@testing-library/jest-dom';

describe("Breed", () => {
  it("should initialize with correct properties", () => {
    const breedData = {
      id: 1,
      reference_image_id: "image-1",
      name: "Bulldog",
      breed_group: "Non-Sporting",
      life_span: "10 - 12 years",
      height: { imperial: "12 - 16 inches" },
      temperament: "Friendly, Docile, Willful",
    };

    const breed = new Breed(breedData);

    expect(breed.id).toEqual(1);
    expect(breed.imageId).toEqual("image-1");
    expect(breed.name).toEqual("Bulldog");
    expect(breed.breedGroup).toEqual("Non-Sporting");
    expect(breed.lifeSpan).toEqual("10 - 12 years");
    expect(breed.maxLife).toEqual("12");
    expect(breed.height).toEqual("12 - 16 inches");
    expect(breed.maxHeight).toEqual("16 inches");
    expect(breed.temperament).toEqual("Friendly, Docile, Willful");
  });

  it("should handle missing properties", () => {
    const breedData = {};

    const breed = new Breed(breedData);

    expect(breed.id).toBeUndefined();
    expect(breed.imageId).toBeUndefined();
    expect(breed.name).toBeUndefined();
    expect(breed.breedGroup).toBeUndefined();
    expect(breed.lifeSpan).toBeUndefined();
    expect(breed.maxLife).toBeUndefined();
    expect(breed.height).toBeUndefined();
    expect(breed.maxHeight).toBeUndefined();
    expect(breed.temperament).toBeUndefined();
  });
});