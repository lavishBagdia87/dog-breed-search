export default class Breed {
  constructor(breedData) {
    this.id = breedData?.id;
    this.imageId = breedData.reference_image_id;
    this.name = breedData?.name;
    this.breedGroup = breedData?.breed_group;
    this.lifeSpan = breedData?.life_span;
    this.maxLife =
      breedData.life_span &&
      breedData.life_span?.split(" - ")[1]?.split(" ")[0];
    this.height = breedData?.height?.imperial;
    this.maxHeight =
      breedData.height && breedData?.height?.imperial?.split(" - ")[1];
    this.temperament = breedData.temperament;
  }
}
