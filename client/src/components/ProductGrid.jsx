import React from "react";
import { styled } from "styled-components";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  gap: 1.2rem;
`;

const ProductGrid = ({ children }) => {
  return <StyledGrid>
    {children}
  </StyledGrid>;
};

export default ProductGrid;
