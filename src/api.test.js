import axios from "axios";
import Constants from "./constants";
import { searchBreeds, getBreedImage } from "./api.js";

describe("searchBreeds", () => {
  test("should return response data on successful search", async () => {
    const responseData = [
      {
        weight: {
          imperial: "6 - 13",
          metric: "3 - 6"
        },
        height: {
          imperial: "9 - 11.5",
          metric: "23 - 29"
        },
        id: 1,
        name: "Affenpinscher",
        bred_for: "Small rodent hunting, lapdog",
        breed_group: "Toy",
        life_span: "10 - 12 years",
        temperament:
          "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        origin: "Germany, France",
        reference_image_id: "BJa4kxc4X"
      }
    ];

    const mockGet = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: responseData });

    const query = "yourQuery";
    const result = await searchBreeds(query);

    expect(result).toEqual(responseData);
    expect(mockGet).toHaveBeenCalledWith(
      `${Constants.API_URL}${Constants.BREED_SEARCH_URL}${query}`
    );

    // Restore the original axios.get function
    mockGet.mockRestore();
  });

  test("should throw an error on search failure", async () => {
    const errorMessage = "An error occurred during the search.";
    const mockGet = jest
      .spyOn(axios, "get")
      .mockRejectedValueOnce(new Error(errorMessage));

    const query = "yourQuery";
    await expect(searchBreeds(query)).rejects.toThrow(errorMessage);
    expect(mockGet).toHaveBeenCalledWith(
      `${Constants.API_URL}${Constants.BREED_SEARCH_URL}${query}`
    );

    // Restore the original axios.get function
    mockGet.mockRestore();
  });
});

describe("getBreedImage", () => {
  test("should return image URL on successful request", async () => {
    const imageId = "yourImageId";
    const imageUrl = "yourImageUrl";
    const responseData = { url: imageUrl };
    const mockGet = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: responseData });

    const result = await getBreedImage(imageId);

    expect(result).toEqual(imageUrl);
    expect(mockGet).toHaveBeenCalledWith(
      `${Constants.API_URL}${Constants.IMAGE_SUBURL}${imageId}`
    );

    // Restore the original axios.get function
    mockGet.mockRestore();
  });

  test("should return undefined when image request fails", async () => {
    const imageId = "yourImageId";
    const mockGet = jest
      .spyOn(axios, "get")
      .mockRejectedValueOnce(new Error("Image not found"));

    const result = await getBreedImage(imageId);

    expect(result).toBeUndefined();
    expect(mockGet).toHaveBeenCalledWith(
      `${Constants.API_URL}${Constants.IMAGE_SUBURL}${imageId}`
    );

    // Restore the original axios.get function
    mockGet.mockRestore();
  });
});
