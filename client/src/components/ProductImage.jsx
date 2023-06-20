import React, { useState } from "react";
import { styled } from "styled-components";

const BigImageWrapper = styled.div`
  text-align: center;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;
const Image = styled.img`
  width: 100%;
  max-height: 100%;
  /* border: 1px solid; */
`;
const ImageButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-grow: 0;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 12rem;
  ${props => props.active ? 'border-color: red' : 'border-color: transparent'}
  /* border: 1px solid; */
`;

const ProductImage = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0] || "");
  return (
    <>
      <BigImageWrapper>
        <BigImage src={images[0]} />
      </BigImageWrapper>
        <ImageButtons>
            {images?.length > 0 &&
            images?.map((image, index) => (
                <ImageButtons
                onClick={(e) => setActiveImage(image)}
                active={image === activeImage}
                key={index}
                >
                <Image src={images[index]} alt="" />
                </ImageButtons>
            ))}
        </ImageButtons>
    </>
  );
};

export default ProductImage;
