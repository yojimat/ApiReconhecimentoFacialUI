import React from "react";
import { Spinner } from "reactstrap";
import "./FaceRecognition.css";

const FaceRecognition = ({
  boxes,
  imageUrl,
  isLoadingImageApi,
  errorPostImagemApi
}) => {
  let box = [];
  for (let i = 0; i < boxes.length; i++) {
    box.push(
      <div
        className="bounding-box"
        style={{
          top: boxes[i].topRow,
          right: boxes[i].rightCol,
          bottom: boxes[i].bottomRow,
          left: boxes[i].leftCol
        }}
        key={i}
      />
    );
  }
  return isLoadingImageApi === true ? (
    <React.Fragment>
      <h1 className="white">Aguarde um momento, verificando foto...</h1>
      <Spinner color="white" />
    </React.Fragment>
  ) : errorPostImagemApi === true ? (
    <React.Fragment>
      <h1 className="white">Url inválido, por favor tente novamente.</h1>
    </React.Fragment>
  ) : (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt="foto"
          width="500px"
          height="auto"
          className="white"
        />
        {box}
      </div>
    </div>
  );
};

export default FaceRecognition;
