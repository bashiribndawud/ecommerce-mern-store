import React from 'react'
import { css, styled } from "styled-components";
import ProductBox from "../components/ProductBox"

const MainDiv = styled.div`
    padding: 1.5rem 7%;
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 920px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  gap: 1rem;
`;
const Arrials = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
`
const NewProduct = ({product}) => {
  return (
    <MainDiv>
      <Arrials>New Arrivals</Arrials>
      <ProductGrid>
        {product?.length > 0 && product.map((prod) => <ProductBox {...prod} />)}
      </ProductGrid>
    </MainDiv>
  );
}

export default NewProduct