import React from "react";
import { css, styled } from "styled-components";
import CartIcon from "../components/CartIcon";
import Button from "./Button";
import {Link} from "react-router-dom"
import {useCartContext} from "../context/CartContext"
const ProductWrapper = styled.div``;
const Box = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 200px;
  box-shadow: 3px 3px 14px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  text-align: center;
  display: flex;
  img {
    max-width: 100%;
    width: 100%;
    max-height: 140px;
  }
`;
const ProductName = styled(Link)`
    font-weight: 500;
    color: inherit;
    text-decoration: none;
`
const ProductDetails = styled.div`
    margin-top: 20px;
    line-height: 5px;
`;

const CartBtn = styled.button`
    padding: 10px 25px;
    border: none;
    color: #fff;
    border-radius: 5px;
    background: purple;
`
const Price = styled.p`
    font-size: 1.2rem;
    font-weight: 800;
`

const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 0;
`

const ProductBox = ({ _id, name, description, price, images }) => {
    const { addProduct } = useCartContext();
  return (
    <ProductWrapper>
      <Box to={`/product/${_id}`}>
        <img
          src={images[0]}
          alt=""
        />
      </Box>
      <ProductDetails>
        <ProductName to={`/product/${_id}`}>{name}</ProductName>
        <PriceContainer>
          <Price>${price}</Price>
          <Button primary="primary" onClick={() => addProduct(_id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </Button>
        </PriceContainer>
      </ProductDetails>
    </ProductWrapper>
  );
};

export default ProductBox;
