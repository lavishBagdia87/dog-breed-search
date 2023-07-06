import React, { useState } from "react";
import loading from "../../assets/images/cuteDog.gif";

const ImageWithLoader = ({ src }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      {loaded ? null : (
        <img className="loading-image" src={loading} alt="loading" />
      )}
      <img
        className="breed-image"
        style={loaded ? {display:"inherit"} : { display: "none" }}
        src={src}
        onLoad={() => setLoaded(true)}
        alt="icon"
      />
    </div>
  );
};
export default ImageWithLoader;
