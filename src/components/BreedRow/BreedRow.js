import React, { useState } from "react";
import { getBreedImage } from "../../api";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import loading from "../../assets/images/cuteDog.gif";
import "./BreedRow.css";

const BreedRow = (props) => {
  const [imageURL, setImageURl] = useState(null);

  const getImage = async (imageId) => {
    try {
      const url = await getBreedImage(imageId);
      setImageURl(url);
    } catch (error) {}
  };
  if(!imageURL && props.data.imageId){
    getImage(props.data.imageId);
  }

  return (
    <div className="row-container">
      <div className="image-container">
        {props.data.imageId && imageURL ? (
          <ImageWithLoader src={imageURL} />
        ) : (
          <img className="loading-image" src={loading} alt="loading" />
        )}
      </div>
      <div className="data-container">
        {props.data.name && (
          <span className="data-point">
            <span className="head ">Name : </span>
            <span>{props.data.name}</span>
          </span>
        )}
        {props.data.breedGroup && (
          <span className="data-point">
            <span className="head ">Breed Group : </span>
            <span>{props.data.breedGroup}</span>
          </span>
        )}
        {props.data.lifeSpan && (
          <span className="data-point">
            <span className="head ">Lifespan : </span>
            <span>{props.data.lifeSpan}</span>
          </span>
        )}
        {props.data.height && (
          <span className="data-point">
            <span className="head ">Height : </span>
            <span>{props.data.height} in</span>
          </span>
        )}
        {props.data.temperament && (
          <span className="data-point">
            <span className="head ">Temperament : </span>
            <span>{props.data.temperament}</span>
          </span>
        )}
        {props.data.origin && (
          <span className="data-point">
            <span className="head ">Origin : </span>
            <span>{props.data.origin}</span>
          </span>
        )}
      </div>
    </div>
  );
};
export default BreedRow;
