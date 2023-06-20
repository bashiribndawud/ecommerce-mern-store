import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { styled } from "styled-components";
import axios from "axios";
import Button from "../components/Button";
import ProductImage from "../components/ProductImage";
import {useCartContext} from "../context/CartContext"

const Center = styled.div`
  margin-top: 3rem;
  padding: 2rem 7%;
`;

const Title = styled.h2`
  font-weight: 700;
  color: gray;
  font-size: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 2fr 1fr;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 3fr 2fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1.2fr .9fr;
  }
  gap: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
`

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const {addProduct} = useCartContext();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  const getProduct = async () => {
    const { data, status } = await axios.get("/product/one", {
      params: { id },
    });
    if (status === 200) {
      setProduct(data);
    }
  };
  useEffect(() => {
    getProduct();
  }, [id]);
  return (
    <div>
      <Header />
      <Center>
        <Title> Product Description</Title>
        <ProductGrid>
          <Box>
            {/* <ProductImage images={product?.images} /> */}
          </Box>
          <div>
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <PriceRow>
              <Price>${product?.price}</Price>
              <Button onClick={() => addProduct(product._id)}>
                Add to cart{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Button>
            </PriceRow>
          </div>
        </ProductGrid>
      </Center>
    </div>
  );
};

export default ProductDetails;
