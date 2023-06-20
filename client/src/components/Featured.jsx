import React from "react";
import { styled } from "styled-components";
import Hero from "../assets/hero.jpg";
import Button from "./Button";
import { useCartContext } from "../context/CartContext";

const FeaturedDiv = styled.div`
  padding: 6rem 7%;
  background-color: #222;
  color: #fff;
  height: auto;
`;
const Title = styled.h2`
  margin: 0;
  font-weight: bold;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    div:nth-child(1) {
      order: 0;
    }
  }
  div:nth-child(1) {
    order: 2;
  }
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    width: 100%;
    height: auto;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const FeaturedImage = styled.img`
    height: 18rem;
    border-radius: 5px;
    margin-top: 1rem;
    object-fit: cover;
`

const Featured = ({product}) => {
  const { addProduct } = useCartContext();
  function addFeaturedToCart() {
    addProduct(product._id)
  }
  return (
    <FeaturedDiv>
      <Wrapper>
        <Column>
          <div>
            <Title>{product.name}</Title>
            <Desc>
              {product.description}
            </Desc>
            <ButtonWrapper>
              <Button size="l" white primary>
                Read more
              </Button>
              <Button size="l" onClick={addFeaturedToCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                Add to Cart
              </Button>
            </ButtonWrapper>
          </div>
        </Column>
        <div>
          <FeaturedImage
            src={Hero}
            alt=""
            style={{ height: "18rem", marginTop: "1rem", objectFit: "cover" }}
          />
        </div>
      </Wrapper>
    </FeaturedDiv>
  );
};

export default Featured;
