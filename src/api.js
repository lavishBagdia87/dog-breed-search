import axios from "axios";

import Constants from "./constants";

export const searchBreeds = async (query) => {
  try {
    const response = await axios.get(
      `${Constants.API_URL}${Constants.BREED_SEARCH_URL}${query}`
    );
    return response.data;
  } catch (error) {
    throw new Error("An error occurred during the search.");
  }
};
export const getBreedImage = async (imageId) => {
  try {
    if(imageId !==undefined){
      const response = await axios.get(
        `${Constants.API_URL}${Constants.IMAGE_SUBURL}${imageId}`
      );
      return response.data.url;
    }


  } catch (error) {}
};
